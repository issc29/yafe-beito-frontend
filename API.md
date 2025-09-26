# API Documentation

This document provides comprehensive documentation for the GraphQL API, custom resolvers, and external service integrations used in the Yafe Be'ito frontend application.

## 📊 GraphQL API

### Overview

The application uses Gatsby's GraphQL layer to query data from Sanity CMS with custom resolvers for enhanced functionality.

### Core Data Types

#### SanityAudioTracks

The primary content type representing audio recordings of teachings.

```graphql
type SanityAudioTracks {
  id: ID!
  _id: String!
  title: String!
  artist: String
  description: String
  dateGiven: Date
  language: String
  link: String!
  tapeNumber: Int
  tapeSide: String
  tags: [SanityTag!]!
  allTags: [SanityTag!]!          # Custom resolver
  tagsByCategory: Category!        # Custom resolver
}
```

#### SanityTag

Hierarchical tag system for categorizing audio content.

```graphql
type SanityTag {
  id: ID!
  name: String!
  parentTag: SanityTag
  childTags: [SanityTag!]!
}
```

#### Category

Custom type for hierarchical category structure.

```graphql
type Category {
  level0: [String!]!
  level1: [String!]!
  level2: [String!]!
  level3: [String!]!
}
```

### Custom Resolvers

#### allTags Resolver

Flattens the hierarchical tag structure to include all parent tags.

```javascript
SanityAudioTracks: {
  allTags: {
    type: '[SanityTag]',
    resolve: async(source, args, context, info) => {
      // Recursively find all parent tags
      const mapParentTags = (ref) => {
        var tags = []
        const tagNode = context.nodeModel.getNodeById({id: ref })
        tags.push({name: tagNode.name, id: tagNode.id})
        if("parentTag" in tagNode && tagNode.parentTag !== null) {
          tags.push(...mapParentTags(tagNode.parentTag._ref))
        }
        return tags
      }
      
      // Process all tags and remove duplicates
      var tags = []
      for (const tag of source.tags) {
        tags.push(...mapParentTags(tag._ref))
      }
      
      // Filter out duplicates
      const uniqueIds = [];
      const uniqueTags = tags.filter(element => {
        const isDuplicate = uniqueIds.includes(element.id);
        if (!isDuplicate) {
          uniqueIds.push(element.id);
          return true;
        }
        return false;
      });

      return uniqueTags
    }
  }
}
```

#### tagsByCategory Resolver

Organizes tags into hierarchical levels for Algolia search integration.

```javascript
SanityAudioTracks: {
  tagsByCategory: {
    type: 'Category',
    resolve: async(source, args, context, info) => {
      // Recursively find all parent tags
      const mapParentTags = (ref) => {
        var tags = []
        const tagNode = context.nodeModel.getNodeById({id: ref })
        tags.push(tagNode.name)
        if("parentTag" in tagNode && tagNode.parentTag !== null) {
          tags.push(...mapParentTags(tagNode.parentTag._ref))
        }
        return tags
      }
      
      // Build hierarchical category structure
      var tags = []
      for (const tag of source.tags) {
        var tagsPerSource = []
        const parentTags = mapParentTags(tag._ref)
        for (let i = parentTags.length - 1; i >=0; i--) {
          if(i == parentTags.length - 1) {
            tagsPerSource.push(parentTags[i])
          } else {
            tagsPerSource.push(`${tagsPerSource[tagsPerSource.length - 1]} > ${parentTags[i]}`)
          }
        }
        tags.push(tagsPerSource)
      }

      // Organize by levels
      var tagsPerLevel = {"level0": [], "level1": [], "level2": [], "level3": []}
      for (const tag of tags ) {
        for(let i = 0; i<tag.length; i++) {
          tagsPerLevel[`level${i}`].push(tag[i])
        }
      }
      
      return tagsPerLevel
    }
  }
}
```

### Common Queries

#### Get All Audio Tracks

```graphql
query GetAllAudioTracks {
  tracks: allSanityAudioTracks {
    edges {
      node {
        id
        _id
        title
        artist
        description
        dateGiven
        language
        link
        tapeNumber
        tapeSide
        allTags {
          id
          name
        }
        tagsByCategory {
          level0
          level1
          level2
          level3
        }
      }
    }
  }
}
```

#### Get Site Settings

```graphql
query GetSiteSettings {
  site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
    title
    description
    keywords
    logo {
      asset {
        _id
        url
      }
      alt
    }
  }
}
```

#### Get Featured Content

```graphql
query GetFeaturedContent {
  projects: allSanitySampleProject(
    limit: 6
    sort: {publishedAt: DESC}
    filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
  ) {
    edges {
      node {
        id
        title
        _rawExcerpt
        slug {
          current
        }
        mainImage {
          asset {
            _id
          }
          alt
        }
      }
    }
  }
}
```

## 🔍 Algolia Search API

### Index Configuration

The application uses multiple Algolia indices for different sorting options:

```javascript
const replicas = {
  CLASS_ASC: `${indexName}_classnum_asc`,
  CLASS_DSC: `${indexName}_classnum_dsc`,
  DATE_ASC: `${indexName}_date_asc`,
  DATE_DSC: `${indexName}_date_dsc`,
  TITLE_ASC: `${indexName}_title_asc`,
  TITLE_DSC: `${indexName}_title_dsc`,
}
```

### Record Structure

Audio tracks are transformed into Algolia records:

```javascript
function trackToAlgoliaRecord({ node: { 
  id, 
  title, 
  tapeside, 
  link, 
  language, 
  description, 
  dateGiven, 
  artist, 
  allTags, 
  tagsByCategory, 
  _id, 
  tapeNumber 
}}) {
  var tags = []
  for(const tag of allTags) {
    tags.push(tag.name)
  }

  return {
    objectID: id,
    title,
    tapeside,
    tapeNumber,
    language,
    description,
    dateGiven,
    artist,
    _tags: tags,
    categories: tagsByCategory,
    link,
    tapeID: _id
  }
}
```

### Search Configuration

```javascript
const queries = [
  {
    query: tracksQuery,
    transformer: ({ data }) => data.tracks.edges.map(trackToAlgoliaRecord),
    indexName,
    settings: { 
      replicas: Object.values(replicas),
      attributesForFaceting: [
        'categories.level0', 
        'categories.level1', 
        'categories.level2', 
        'categories.level3'
      ]
    },
  }
]
```

### Index Settings

Each replica index has specific ranking configurations:

```javascript
// Class number ascending
{
  indexName: replicas.CLASS_ASC,
  settings: {
    ranking: [
      "asc(tapeNumber)",
      "typo",
      "geo",
      "words",
      "filters",
      "proximity",
      "attribute",
      "exact"
    ]
  }
}

// Date descending
{
  indexName: replicas.DATE_DSC,
  settings: {
    ranking: [
      "desc(dateGiven)",
      "typo",
      "geo",
      "words",
      "filters",
      "proximity",
      "attribute",
      "exact"
    ]
  }
}
```

### Search Client Usage

```javascript
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID, 
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

// Usage in React components
<InstantSearch searchClient={searchClient} indexName={algoliaIndex}>
  <SearchBox />
  <HierarchicalMenu
    attributes={[
      'categories.level0',
      'categories.level1',
      'categories.level2',
      'categories.level3',
    ]}
  />
  <Hits hitComponent={HitComponent} />
</InstantSearch>
```

## 📧 Email API (Serverless Functions)

### Contact Form Processing

The contact form is processed via Netlify Functions using AWS SES:

```javascript
// functions/send-email/send-email.js
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  // Configure AWS SES
  const ses = new AWS.SES({
    accessKeyId: process.env.SITE_AWS_ACCESS_KEY,
    secretAccessKey: process.env.SITE_AWS_SECRET,
    region: 'us-east-1'
  });

  // Parse form data
  const { name, email, message } = JSON.parse(event.body);

  // Email parameters
  const params = {
    Destination: {
      ToAddresses: ['contact@yafebeito.com']
    },
    Message: {
      Body: {
        Text: {
          Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        }
      },
      Subject: {
        Data: 'Contact Form Submission'
      }
    },
    Source: 'noreply@yafebeito.com'
  };

  try {
    await ses.sendEmail(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
};
```

### Frontend Integration

```javascript
// Contact form submission
async function sendEmail(values) {
  try {
    await axios.post('/.netlify/functions/send-email', {
      ...values
    });
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}
```

## 🖼️ Sanity Image API

### Image URL Generation

```javascript
import imageUrlBuilder from '@sanity/image-url';
import { clientConfig } from '../client-config';

const builder = imageUrlBuilder(clientConfig.sanity);

function urlFor(source) {
  return builder.image(source);
}

// Usage
const imageUrl = urlFor(image)
  .width(800)
  .height(600)
  .fit('crop')
  .url();
```

### Image Processing Options

```javascript
// Responsive image generation
const responsiveImage = urlFor(image)
  .width(400)
  .height(300)
  .fit('crop')
  .auto('format')
  .quality(80)
  .url();

// Thumbnail generation
const thumbnail = urlFor(image)
  .width(150)
  .height(150)
  .fit('crop')
  .url();
```

## 🔧 Utility Functions

### Helper Functions

```javascript
// Map GraphQL edges to nodes
export function mapEdgesToNodes(data) {
  if (!data.edges) return [];
  return data.edges.map(edge => edge.node);
}

// Filter out documents without slugs
export function filterOutDocsWithoutSlugs({ slug }) {
  return (slug || {}).current;
}

// Filter out future-dated content
export function filterOutDocsPublishedInTheFuture({ publishedAt }) {
  return !isFuture(parseISO(publishedAt));
}

// Build image objects for Sanity
export function buildImageObj(source = { asset: {} }) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id }
  };

  if (source.crop) imageObj.crop = source.crop;
  if (source.hotspot) imageObj.hotspot = source.hotspot;

  return imageObj;
}

// Get blog URL with date formatting
export function getBlogUrl(publishedAt, slug) {
  return `/blog/${format(parseISO(publishedAt), 'yyyy/MM')}/${slug.current || slug}/`;
}
```

### Search Utilities

```javascript
// Sort hierarchical menu items
export function sortHierarchicalMenu(a, b) {
  const order = ['tora', 'ketubim', 'mishna', 'talmud', 'midrash', 'halakha'];
  
  const aIndex = order.findIndex(item => 
    a.label.toLowerCase().includes(item)
  );
  const bIndex = order.findIndex(item => 
    b.label.toLowerCase().includes(item)
  );
  
  if (aIndex !== -1 && bIndex !== -1) {
    return aIndex - bIndex;
  }
  
  return a.label.localeCompare(b.label);
}

// Concatenate class names conditionally
export function concatClassNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
```

## 🔒 Authentication & Security

### API Key Management

```javascript
// Environment-based configuration
const clientConfig = {
  sanity: {
    projectId: process.env.GATSBY_SANITY_PROJECT_ID || '',
    dataset: process.env.GATSBY_SANITY_DATASET || 'production'
  }
};

// Token-based authentication
const token = process.env.SANITY_READ_TOKEN;
```

### reCAPTCHA Integration

```javascript
import ReCAPTCHA from 'react-google-recaptcha';

// Component usage
<ReCAPTCHA
  sitekey={process.env.GATSBY_RECAPTCHA_SITE_KEY}
  onChange={handleCaptchaChange}
/>
```

## 📊 Performance Considerations

### GraphQL Query Optimization

- Use specific field selection to minimize data transfer
- Implement pagination for large datasets
- Cache frequently accessed data
- Use fragments for reusable query parts

### Algolia Search Optimization

- Configure appropriate replica indices for sorting
- Use faceted search for better performance
- Implement search result caching
- Optimize index size and structure

### Image Optimization

- Use Sanity's image processing API
- Implement responsive images
- Use appropriate image formats (WebP, AVIF)
- Implement lazy loading

## 🐛 Error Handling

### GraphQL Error Handling

```javascript
// Error boundary component
class GraphQLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('GraphQL Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <GraphQLErrorList errors={this.props.errors} />;
    }

    return this.props.children;
  }
}
```

### API Error Responses

```javascript
// Standardized error responses
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  }
}
```

This API documentation provides comprehensive coverage of all data access patterns, custom resolvers, and external service integrations used in the Yafe Be'ito frontend application.
