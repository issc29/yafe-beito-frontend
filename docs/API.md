# API Documentation

## Overview

This document describes the APIs and data interfaces used in the Yafe Be'ito Frontend application, including GraphQL queries, Algolia search configuration, and serverless function endpoints.

## GraphQL API (Sanity CMS)

### Base Configuration

```javascript
// client-config.js
module.exports = {
  sanity: {
    projectId: process.env.GATSBY_SANITY_PROJECT_ID,
    dataset: process.env.GATSBY_SANITY_DATASET || 'production'
  }
}
```

### Custom Schema Extensions

#### Category Type Definition

```graphql
type Category {
  level0: [String!]
  level1: [String!]
  level2: [String!]
  level3: [String!]
}
```

#### Extended Audio Track Type

```graphql
type SanityAudioTracks {
  # Standard Sanity fields
  _id: String!
  id: String!
  title: String
  artist: String
  description: String
  dateGiven: Date
  tapeNumber: Int
  tapeSide: String
  link: String
  language: String
  tags: [SanityTag]
  
  # Custom resolved fields
  allTags: [SanityTag]
  tagsByCategory: Category
}
```

### GraphQL Queries

#### Homepage Query

```graphql
query IndexPageQuery {
  site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
    title
    description
    keywords
  }
  projects: allSanitySampleProject(
    limit: 6
    sort: {publishedAt: DESC}
    filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
  ) {
    edges {
      node {
        id
        mainImage {
          crop { _key _type top bottom left right }
          hotspot { _key _type x y height width }
          asset { _id }
          alt
        }
        title
        _rawExcerpt
        slug { current }
      }
    }
  }
}
```

#### Audio Tracks Query

```graphql
query AudioTracksQuery {
  tracks: allSanityAudioTracks {
    edges {
      node {
        artist
        dateGiven
        description
        id
        tapeSide
        tapeNumber
        title
        link
        language
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

### Custom Resolvers

#### allTags Resolver

Recursively collects all parent tags for an audio track:

```javascript
allTags: {
  type: '[SanityTag]',
  resolve: async (source, args, context, info) => {
    const mapParentTags = (ref) => {
      var tags = []
      const tagNode = context.nodeModel.getNodeById({id: ref })
      tags.push({name: tagNode.name, id: tagNode.id})
      if("parentTag" in tagNode && tagNode.parentTag !== null) {
        tags.push(...mapParentTags(tagNode.parentTag._ref))
      }
      return tags
    }
    
    const ref = source.tags[0]._ref
    var tags = []
    for (const tag of source.tags) {
      tags.push(...mapParentTags(tag._ref))
    }
    
    // Remove duplicates
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
```

#### tagsByCategory Resolver

Organizes tags into hierarchical levels for search indexing:

```javascript
tagsByCategory: {
  type: 'Category',
  resolve: async (source, args, context, info) => {
    const mapParentTags = (ref) => {
      var tags = []
      const tagNode = context.nodeModel.getNodeById({id: ref })
      tags.push(tagNode.name)
      if("parentTag" in tagNode && tagNode.parentTag !== null) {
        tags.push(...mapParentTags(tagNode.parentTag._ref))
      }
      return tags
    }
    
    var tags = []
    for (const tag of source.tags) {
      var tagsPerSource = []
      const parentTags = mapParentTags(tag._ref)
      for (let i = parentTags.length - 1; i >= 0; i--) {
        if(i == parentTags.length - 1) {
          tagsPerSource.push(parentTags[i])
        } else {
          tagsPerSource.push(`${tagsPerSource[tagsPerSource.length - 1]} > ${parentTags[i]}`)
        }
      }
      tags.push(tagsPerSource)
    }

    var tagsPerLevel = {"level0": [], "level1": [], "level2": [], "level3": []}
    for (const tag of tags) {
      for(let i = 0; i < tag.length; i++) {
        tagsPerLevel[`level${i}`].push(tag[i])
      }
    }
    
    return tagsPerLevel
  }
}
```

## Algolia Search API

### Configuration

```javascript
// Search client initialization
const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID, 
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);
```

### Index Structure

#### Primary Index

```javascript
const indexName = process.env.GATSBY_ALGOLIA_INDEX || 'Tracks_DEV';
```

#### Replica Indices

```javascript
const replicas = {
  CLASS_ASC: `${indexName}_classnum_asc`,
  CLASS_DSC: `${indexName}_classnum_dsc`,
  DATE_ASC: `${indexName}_date_asc`,
  DATE_DSC: `${indexName}_date_dsc`,
  TITLE_ASC: `${indexName}_title_asc`,
  TITLE_DSC: `${indexName}_title_dsc`
};
```

### Record Structure

Each audio track is indexed as:

```javascript
{
  objectID: "unique-track-id",
  title: "Track Title",
  artist: "Speaker Name",
  dateGiven: "2023-01-01T00:00:00.000Z",
  tapeNumber: 123,
  tapeside: "A",
  language: "English",
  description: "Track description",
  _tags: ["tag1", "tag2", "tag3"],
  categories: {
    level0: ["Tora"],
    level1: ["Tora > Bereshit"],
    level2: ["Tora > Bereshit > Chapter 1"],
    level3: ["Tora > Bereshit > Chapter 1 > Verse 1"]
  },
  link: "https://audio-url.com/track.mp3",
  tapeID: "sanity-document-id"
}
```

### Index Settings

#### Primary Index Settings

```javascript
{
  replicas: Object.values(replicas),
  attributesForFaceting: [
    'categories.level0', 
    'categories.level1', 
    'categories.level2', 
    'categories.level3'
  ]
}
```

#### Replica Index Settings

**Class Number Ascending:**
```javascript
{
  ranking: [
    "asc(tapeNumber)",
    "typo", "geo", "words", "filters", "proximity", "attribute", "exact"
  ]
}
```

**Date Descending:**
```javascript
{
  ranking: [
    "desc(dateGiven)",
    "typo", "geo", "words", "filters", "proximity", "attribute", "exact"
  ]
}
```

**Title Ascending:**
```javascript
{
  ranking: [
    "asc(title)",
    "typo", "geo", "words", "filters", "proximity", "attribute", "exact"
  ]
}
```

### Search Query Examples

#### Basic Text Search

```javascript
// Performed automatically by SearchBox component
searchClient.search([{
  indexName: 'Tracks_DEV',
  query: 'torah commentary',
  params: {
    hitsPerPage: 20,
    page: 0
  }
}]);
```

#### Hierarchical Filtering

```javascript
// Applied via HierarchicalMenu component
searchClient.search([{
  indexName: 'Tracks_DEV',
  query: '',
  params: {
    facetFilters: [
      'categories.level0:Tora',
      'categories.level1:Tora > Bereshit'
    ]
  }
}]);
```

#### Sorted Results

```javascript
// Using replica index for sorting
searchClient.search([{
  indexName: 'Tracks_DEV_date_dsc',
  query: 'passover',
  params: {
    hitsPerPage: 20
  }
}]);
```

## Serverless Functions API

### Contact Form Endpoint

**Endpoint:** `/.netlify/functions/send-email`

**Method:** POST

**Request Body:**
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  subject: "Question about classes",
  message: "I have a question about...",
  captcha: "recaptcha-response-token"
}
```

**Response (Success):**
```javascript
{
  statusCode: 200,
  body: "Message sent"
}
```

**Response (Error):**
```javascript
{
  statusCode: 500,
  body: "Message unsuccessfully sent, error: [error details]"
}
```

### Function Implementation

```javascript
exports.handler = async event => {
  const { 
    SITE_AWS_ACCESS_KEY, 
    SITE_AWS_SECRET, 
    SITE_AWS_REGION, 
    SITE_VERIFIED_EMAIL, 
    SITE_CAPTCHA_SECRET 
  } = process.env;

  let requestParams = JSON.parse(event.body);
  let { name, email, subject, message, captcha } = requestParams;

  // reCAPTCHA verification
  let verifyResult = await axios({
    method: 'post',
    url: 'https://www.google.com/recaptcha/api/siteverify',
    params: {
      secret: SITE_CAPTCHA_SECRET,
      response: captcha
    }
  });

  if (!verifyResult.data.success) {
    return {
      statusCode: 400,
      body: "reCaptcha check failed. Most likely SPAM."
    };
  }

  // AWS SES email sending
  AWS.config.update({
    accessKeyId: SITE_AWS_ACCESS_KEY,
    secretAccessKey: SITE_AWS_SECRET,
    region: SITE_AWS_REGION
  });

  const ses = new AWS.SES({ apiVersion: "2010-12-01" });
  const params = {
    Destination: { ToAddresses: [SITE_VERIFIED_EMAIL] },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<html><body>
            From: ${name}<br />
            Email: ${email}<br />
            Message: ${message}
          </body></html>`
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: `Yafe Beito: ${subject}`
      }
    },
    ReplyToAddresses: [email],
    Source: SITE_VERIFIED_EMAIL
  };

  return ses.sendEmail(params).promise();
};
```

## Helper Functions API

### Data Processing Utilities

#### mapEdgesToNodes

Converts GraphQL edge/node structure to simple array:

```javascript
export function mapEdgesToNodes(data) {
  if (!data.edges) return [];
  return data.edges.map(edge => edge.node);
}
```

#### filterOutDocsWithoutSlugs

Filters content that lacks URL slugs:

```javascript
export function filterOutDocsWithoutSlugs({ slug }) {
  return (slug || {}).current;
}
```

#### filterOutDocsPublishedInTheFuture

Excludes content with future publication dates:

```javascript
export function filterOutDocsPublishedInTheFuture({ publishedAt }) {
  return !isFuture(publishedAt);
}
```

#### buildImageObj

Constructs Sanity image objects:

```javascript
export function buildImageObj(source) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id }
  };

  if (source.crop) imageObj.crop = source.crop;
  if (source.hotspot) imageObj.hotspot = source.hotspot;

  return imageObj;
}
```

#### sortHierarchicalMenu

Custom sorting for Jewish studies categories:

```javascript
export const sortHierarchicalMenu = (a, b) => {
  var aValue = a.name.toLocaleLowerCase();
  var bValue = b.name.toLocaleLowerCase();

  var menu = [
    "tora", "ketubim", "nebi'im", "talmud", "harambam", 
    "tefilla", "personalities", "law", "holidays", 
    "hebrew grammar / diqduq", "jewish history", 
    "jewish thought", "yehuda halevi / kuzari",
    "matte dan", "sephardic history", "misc", "other"
  ];

  if (menu.includes(aValue)) {
    var aLocation = menu.indexOf(aValue);
    return (menu.includes(bValue, aLocation)) ? -1 : 1;
  }

  return -1;
};
```

## Environment Variables

### Required Variables

```bash
# Sanity CMS
GATSBY_SANITY_PROJECT_ID=your_project_id
GATSBY_SANITY_DATASET=production

# Algolia Search
GATSBY_ALGOLIA_APP_ID=your_app_id
GATSBY_ALGOLIA_SEARCH_KEY=your_search_key
ALGOLIA_ADMIN_KEY=your_admin_key
ALGOLIA_INDEX=your_index_name

# AWS SES (for contact forms)
SITE_AWS_ACCESS_KEY=your_access_key
SITE_AWS_SECRET=your_secret_key
SITE_AWS_REGION=your_region
SITE_VERIFIED_EMAIL=your_verified_email

# reCAPTCHA
SITE_CAPTCHA_SECRET=your_recaptcha_secret
```

## Error Handling

### GraphQL Errors

```javascript
if (errors) {
  return (
    <Layout bgImage={bgImage}>
      <GraphQLErrorList errors={errors} />
    </Layout>
  );
}
```

### Search Errors

Algolia errors are handled by the InstantSearch components automatically, with fallback UI states.

### Function Errors

```javascript
.catch(error => {
  console.log(error);
  return {
    statusCode: 500,
    body: `Message unsuccessfully sent, error: ${error}`
  };
});
```

## Rate Limiting

- **Algolia**: Built-in rate limiting per plan
- **Netlify Functions**: 125,000 requests/month on free tier
- **AWS SES**: Based on sending limits and reputation

## Caching Strategy

- **GraphQL**: Build-time caching, no runtime queries
- **Algolia**: Client-side result caching
- **Static Assets**: CDN caching with long TTL
- **Functions**: No caching, real-time processing

This API documentation provides the foundation for understanding and extending the Yafe Be'ito Frontend application's data layer and external integrations.
