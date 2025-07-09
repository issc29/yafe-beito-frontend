# Architecture Documentation

## Overview

The Yafe Be'ito Frontend is a modern web application built with Gatsby, React, and a headless CMS architecture. This document provides detailed information about the system architecture, data flow, and key design decisions.

## System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Sanity CMS    │    │   Algolia       │    │   AWS SES       │
│   (Content)     │    │   (Search)      │    │   (Email)       │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          │ GraphQL              │ REST API             │ REST API
          │                      │                      │
┌─────────▼──────────────────────▼──────────────────────▼───────┐
│                 Gatsby Application                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │
│  │   Pages     │  │ Components  │  │  Serverless Funcs   │   │
│  │             │  │             │  │                     │   │
│  │ • index.js  │  │ • nav-bar   │  │ • send-email        │   │
│  │ • classes   │  │ • layout    │  │                     │   │
│  │ • contact   │  │ • search    │  │                     │   │
│  │ • about/*   │  │ • player    │  │                     │   │
│  └─────────────┘  └─────────────┘  └─────────────────────┘   │
└───────────────────────────────────────────────────────────────┘
                              │
                              │ Static Site Generation
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Netlify CDN                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐     │
│  │   Static    │  │   Assets    │  │   Lambda Functions  │     │
│  │   HTML/CSS  │  │   Images    │  │                     │     │
│  │   /JS       │  │   Audio     │  │   • Contact Form    │     │
│  └─────────────┘  └─────────────┘  └─────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

## Core Technologies

### Frontend Stack
- **Gatsby 5.14.1**: Static site generator with React
- **React 18**: UI library with hooks and functional components
- **Tailwind CSS 3.0**: Utility-first CSS framework
- **Headless UI**: Accessible UI components

### Backend Services
- **Sanity CMS**: Headless content management system
- **Algolia**: Search-as-a-service with faceted search
- **AWS SES**: Email service for contact forms
- **Netlify**: Hosting and serverless functions

### Development Tools
- **Jest**: Testing framework
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **PostCSS**: CSS processing

## Data Flow Architecture

### Content Management Flow

```
Sanity Studio → Sanity API → Gatsby GraphQL → Static Generation → CDN
```

1. **Content Creation**: Editors use Sanity Studio to create/edit content
2. **API Layer**: Sanity provides real-time API access to content
3. **Build Process**: Gatsby fetches content via GraphQL at build time
4. **Static Generation**: Pages are pre-rendered with content
5. **Deployment**: Static files deployed to Netlify CDN

### Search Flow

```
Audio Tracks → GraphQL Resolvers → Algolia Indexing → Search Interface
```

1. **Data Processing**: Custom GraphQL resolvers flatten tag hierarchies
2. **Index Creation**: Build process pushes data to Algolia indices
3. **Search Interface**: React components query Algolia in real-time
4. **Results Display**: Faceted search results with audio player integration

### Audio Player Flow

```
User Selection → Cookie Storage → Audio Player → Session Persistence
```

1. **Track Selection**: User clicks play on search result
2. **State Management**: Audio source and time stored in cookies
3. **Player Control**: Custom HTML5 player with skip controls
4. **Persistence**: Playback position maintained across sessions

## Component Architecture

### Layout System

```
Layout (Global Wrapper)
├── Header
│   └── NavBar
│       ├── Logo
│       ├── DesktopNavigation
│       └── MobileMenu
├── Main Content (Children)
└── Footer
```

**Key Features:**
- Responsive design with mobile-first approach
- Background image handling with CSS classes
- Cookie provider for session management
- Consistent header/footer across all pages

### Navigation System

The navigation system uses Headless UI for accessibility:

```javascript
// Navigation structure defined in nav-bar.js
const navigation = [
  { type: 'link', name: 'Home', href: '/' },
  { type: 'dropdown', name: 'About', options: aboutLinks },
  { type: 'link', name: 'Classes', href: '/classes' },
  { type: 'link', name: 'Donate', href: '/donate' },
  { type: 'link', name: 'Contact', href: '/contact' }
];
```

**Components:**
- `nav-bar.js`: Main navigation controller
- `DesktopNavigation.js`: Desktop layout with dropdowns
- `MobileMenu.js`: Collapsible mobile navigation
- `NavigationDropdown.js`: Accessible dropdown implementation

### Search Architecture

The search system integrates Algolia with custom React components:

```
ClassSearch (Main Interface)
├── SearchBox (Query Input)
├── CurrentRefinements (Active Filters)
├── HierarchicalMenu (Category Navigation)
├── CustomSortBy (Sort Options)
├── Hits (Results Display)
│   └── SpecificClassDetailsCard (Individual Result)
└── Pagination (Result Navigation)
```

**Key Features:**
- Real-time search with InstantSearch hooks
- Hierarchical category filtering (4 levels deep)
- Multiple sort indices (class number, date, title)
- Mobile-responsive design with collapsible filters

## GraphQL Schema Customization

### Custom Resolvers

The application extends Sanity's GraphQL schema with custom resolvers:

#### allTags Resolver
Flattens hierarchical tag relationships for easier querying:

```javascript
allTags: {
  type: '[SanityTag]',
  resolve: async (source, args, context, info) => {
    // Recursively collect all parent tags
    const mapParentTags = (ref) => {
      // Implementation details in gatsby-node.js
    };
    // Returns flattened array of all related tags
  }
}
```

#### tagsByCategory Resolver
Organizes tags into hierarchical levels for Algolia indexing:

```javascript
tagsByCategory: {
  type: 'Category',
  resolve: async (source, args, context, info) => {
    // Creates level0-level3 hierarchy
    // Returns: { level0: [...], level1: [...], level2: [...], level3: [...] }
  }
}
```

### Schema Types

```graphql
type Category {
  level0: [String!]
  level1: [String!]
  level2: [String!]
  level3: [String!]
}

type SanityAudioTracks {
  # Standard fields
  title: String
  artist: String
  dateGiven: Date
  tapeNumber: Int
  tapeSide: String
  link: String
  
  # Custom resolved fields
  allTags: [SanityTag]
  tagsByCategory: Category
}
```

## Search Implementation

### Algolia Configuration

The search system uses multiple indices for different sort orders:

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

### Index Structure

Each audio track is indexed with:

```javascript
{
  objectID: "unique-id",
  title: "Class Title",
  artist: "Speaker Name",
  dateGiven: "2023-01-01",
  tapeNumber: 123,
  categories: {
    level0: ["Tora"],
    level1: ["Tora > Bereshit"],
    level2: ["Tora > Bereshit > Chapter 1"],
    level3: ["Tora > Bereshit > Chapter 1 > Verse 1"]
  },
  link: "https://audio-url.com/track.mp3"
}
```

### Category Hierarchy

The search uses a predefined hierarchy for Jewish studies:

```javascript
const categoryOrder = [
  "tora", "ketubim", "nebi'im", "talmud", "harambam", 
  "tefilla", "personalities", "law", "holidays", 
  "hebrew grammar / diqduq", "jewish history", 
  "jewish thought", "yehuda halevi / kuzari",
  "matte dan", "sephardic history", "misc", "other"
];
```

## Audio Player System

### Architecture

```
AudioPlayerCustom
├── Track Information Display
├── HTML5 Audio Element
├── Custom Controls
│   ├── Play/Pause
│   ├── Progress Bar
│   ├── Time Display
│   ├── Volume Control
│   └── Skip Controls (±10s)
└── Cookie-based Persistence
```

### State Management

The audio player maintains state through:

1. **React State**: Current track, play status, time position
2. **Cookies**: Persistent storage across sessions
3. **URL Parameters**: Shareable links with timestamps

```javascript
// Cookie structure
{
  id: "track-id",
  title: "Track Title",
  artist: "Speaker",
  link: "audio-url",
  linkWithTime: "audio-url#t=120" // Resume at 2 minutes
}
```

### Mobile Optimization

- Responsive design with touch-friendly controls
- Reduced control set for mobile devices
- Fixed positioning for persistent playback

## Performance Optimizations

### Build-time Optimizations

1. **Static Generation**: All pages pre-rendered at build time
2. **Image Optimization**: Gatsby's image processing pipeline
3. **Code Splitting**: Automatic bundle splitting by route
4. **Prefetching**: Link prefetching for faster navigation

### Runtime Optimizations

1. **Lazy Loading**: Components loaded on demand
2. **Search Debouncing**: Reduced API calls during typing
3. **Cookie Caching**: Persistent state without server calls
4. **CDN Delivery**: Static assets served from global CDN

### Search Performance

1. **Index Replicas**: Pre-sorted indices for instant results
2. **Faceted Search**: Efficient filtering without full re-queries
3. **Client-side Caching**: Algolia's built-in result caching
4. **Progressive Enhancement**: Works without JavaScript

## Security Considerations

### Content Security

- **Sanity CMS**: Role-based access control
- **Environment Variables**: Sensitive keys stored securely
- **CORS Configuration**: Restricted API access

### Form Security

- **reCAPTCHA**: Bot protection on contact forms
- **Input Validation**: Server-side validation in functions
- **Rate Limiting**: Netlify's built-in protection

### Deployment Security

- **HTTPS**: Enforced SSL/TLS encryption
- **Headers**: Security headers via Netlify
- **Environment Isolation**: Separate staging/production configs

## Monitoring and Analytics

### Error Tracking

- **Build Monitoring**: Netlify build notifications
- **Runtime Errors**: Browser console monitoring
- **Function Logs**: Serverless function error tracking

### Performance Monitoring

- **Lighthouse**: Automated performance audits
- **Core Web Vitals**: User experience metrics
- **Bundle Analysis**: JavaScript bundle size tracking

## Deployment Architecture

### Build Process

1. **Source Code**: Git push triggers build
2. **Dependencies**: npm install with package-lock.json
3. **Environment**: Variables injected at build time
4. **Gatsby Build**: Static site generation
5. **Algolia Sync**: Search indices updated
6. **Function Deploy**: Serverless functions packaged
7. **CDN Deploy**: Static files distributed globally

### Environment Management

- **Development**: Local development with hot reload
- **Staging**: Preview deployments for testing
- **Production**: Main branch auto-deployment

### Rollback Strategy

- **Git-based**: Revert commits and redeploy
- **Netlify Rollback**: One-click previous deployment
- **Database**: Sanity content versioning

This architecture provides a scalable, maintainable foundation for the Yafe Be'ito educational platform while ensuring excellent performance and user experience.
