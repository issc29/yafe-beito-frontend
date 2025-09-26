# Yafe Be'ito Frontend

A Gatsby-based educational platform for the **Hakham Dr. José Faur Studies Foundation**, dedicated to preserving and sharing Jewish teachings through a comprehensive digital library.

## 🎯 Overview

Yafe Be'ito (Hebrew: "beautiful in its time") serves as a digital repository for the teachings of Hakham Dr. José Faur. The platform provides:

- **Audio Class Library**: Searchable collection of recorded teachings with advanced categorization
- **Educational Content**: Biographical information and foundation details
- **Community Features**: Contact forms, donation system, and social media integration
- **Content Discovery**: Sophisticated search with hierarchical categories and filtering

## 🚀 Quick Start

### Prerequisites

- Node.js 22.14.0+ (managed via nvm)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/issc29/yafe-beito-frontend.git
   cd yafe-beito-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env.development` and `.env.production` files:
   
   ```bash
   # Sanity CMS Configuration
   GATSBY_SANITY_PROJECT_ID=your_sanity_project_id
   GATSBY_SANITY_DATASET=production
   SANITY_READ_TOKEN=your_sanity_read_token
   
   # Algolia Search Configuration
   GATSBY_ALGOLIA_APP_ID=your_algolia_app_id
   GATSBY_ALGOLIA_SEARCH_KEY=your_algolia_search_key
   ALGOLIA_ADMIN_KEY=your_algolia_admin_key
   GATSBY_ALGOLIA_INDEX=Tracks_DEV
   
   # AWS Configuration (for contact forms)
   SITE_AWS_ACCESS_KEY=your_aws_access_key
   SITE_AWS_SECRET=your_aws_secret_key
   SITE_CAPTCHA_SECRET=your_recaptcha_secret
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:8000`

## 🏗️ Architecture

### Technology Stack

- **Frontend**: Gatsby (React-based static site generator)
- **CMS**: Sanity for content management
- **Search**: Algolia with hierarchical categories
- **Styling**: Tailwind CSS with custom components
- **Audio**: Custom HTML5 audio player with persistence
- **Deployment**: Netlify with serverless functions
- **Email**: AWS SES for contact form processing

### System Architecture

```
Frontend (Gatsby/React) → Content (Sanity CMS) → Search (Algolia) → Media (Audio Player)
                      ↓
            Deployment (Netlify) → Communication (AWS SES + Functions)
```

### Directory Structure

```
yafe-beito-frontend/
├── src/
│   ├── components/           # React components
│   │   ├── navigation/      # Navigation-specific components
│   │   ├── nav-bar.js      # Primary navigation
│   │   ├── layout.js       # Global page wrapper
│   │   ├── ClassSearch.js  # Audio search interface
│   │   └── audioPlayerCustom.js # Custom audio player
│   ├── pages/              # Gatsby page components
│   │   ├── index.js        # Homepage
│   │   ├── classes.js      # Audio library (core feature)
│   │   ├── contact.js      # Contact form
│   │   └── about/          # Information pages
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── utils/              # Configuration utilities
├── functions/              # Netlify serverless functions
├── gatsby-config.js        # Main Gatsby configuration
├── gatsby-node.js          # Build-time data processing
└── package.json           # Dependencies and scripts
```

## 🎵 Audio Player System

The custom audio player provides persistent playback across sessions:

### Key Features

- **Session Persistence**: Playback position saved via cookies
- **Custom Controls**: 10-second skip forward/backward
- **Mobile Optimization**: Responsive design with touch-friendly controls
- **Time Tracking**: Automatic resume from last position
- **Fixed Position**: Always accessible at bottom of screen

### Implementation

```javascript
// Audio state management with cookies
const [audioSrc, setAudioSrc] = useState({id: ""})
const [audioTime, setAudioTime] = useState(0)

// Persistent playback position
useEffect(() => {
  setCookie('time', Math.floor(audioTime))
  var modifiedAudioSrc = JSON.parse(JSON.stringify(audioSrc))
  modifiedAudioSrc.linkWithTime = modifiedAudioSrc.link + "#t=" + audioTime
  setCookie('audioData', modifiedAudioSrc)
}, [audioTime])
```

## 🔍 Search Functionality

Powered by Algolia with sophisticated categorization:

### Features

- **Hierarchical Categories**: 4-level tag system (level0-level3)
- **Real-time Search**: Instant results as you type
- **Faceted Navigation**: Filter by categories, dates, and metadata
- **Custom Sorting**: By class number, date, or title (ascending/descending)
- **Mobile-Responsive**: Collapsible category filters on mobile

### Search Index Configuration

```javascript
// Replica indices for different sort orders
const replicas = {
  CLASS_ASC: `${indexName}_classnum_asc`,
  CLASS_DSC: `${indexName}_classnum_dsc`,
  DATE_ASC: `${indexName}_date_asc`,
  DATE_DSC: `${indexName}_date_dsc`,
  TITLE_ASC: `${indexName}_title_asc`,
  TITLE_DSC: `${indexName}_title_dsc`,
}
```

## 🧩 Component Architecture

### Core Components

#### Navigation System (`src/components/nav-bar.js`)
- Responsive navigation with desktop/mobile variants
- Dropdown menus for "About" section
- Logo integration with Sanity CMS

#### Layout Component (`src/components/layout.js`)
- Global page wrapper with background image support
- Cookie provider for audio persistence
- Conditional footer rendering

#### Class Search (`src/components/ClassSearch.js`)
- Algolia InstantSearch integration
- Hierarchical menu with custom sorting
- Mobile-responsive category disclosure

#### Audio Player (`src/components/audioPlayerCustom.js`)
- Custom HTML5 audio controls
- Session persistence via cookies
- Mobile-optimized interface

### Page Components

- **Homepage** (`src/pages/index.js`): Featured content and site navigation
- **Classes** (`src/pages/classes.js`): Main audio library interface
- **Contact** (`src/pages/contact.js`): Contact form with reCAPTCHA
- **About Pages**: Information about Hakham and foundation

## 📊 Data Management

### Sanity CMS Integration

Content is managed through Sanity CMS with custom GraphQL resolvers:

```javascript
// Custom resolver for flattened tag hierarchy
SanityAudioTracks: {
  allTags: {
    type: '[SanityTag]',
    resolve: async(source, args, context, info) => {
      // Recursively find all parent tags
      const mapParentTags = (ref) => {
        // Implementation details...
      }
    }
  }
}
```

### GraphQL Queries

Audio tracks are queried with comprehensive metadata:

```graphql
{
  tracks: allSanityAudioTracks {
    edges {
      node {
        artist
        dateGiven
        description
        title
        link
        tapeNumber
        tapeSide
        allTags { name }
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

## 🚀 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run clean-cache  # Clear Gatsby cache
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run test         # Run Jest tests
```

### Development Workflow

1. **Feature Development**
   - Create feature branch: `git checkout -b feature/your-feature`
   - Make changes and test locally
   - Run linting and tests: `npm run lint && npm test`
   - Commit and push changes

2. **Testing**
   - Unit tests with Jest and React Testing Library
   - Manual testing of audio player functionality
   - Search functionality verification
   - Mobile responsiveness testing

3. **Code Quality**
   - ESLint for code linting
   - Prettier for code formatting
   - Tailwind CSS for consistent styling

### Environment Setup

The application supports multiple environments:

- **Development**: `.env.development`
- **Production**: `.env.production`
- **CI**: `.env.ci`

Environment variables are loaded automatically based on `NODE_ENV`.

## 🌐 Deployment

### Netlify Configuration

The application is deployed on Netlify with:

- **Build Command**: `gatsby build`
- **Publish Directory**: `public/`
- **Serverless Functions**: `functions/` directory
- **Environment Variables**: Configured in Netlify dashboard

### Serverless Functions

Contact form processing via AWS SES:

```javascript
// functions/send-email/send-email.js
exports.handler = async (event, context) => {
  // AWS SES email sending logic
}
```

### Build Process

1. **Gatsby Build**: Static site generation
2. **Algolia Sync**: Search index updates via `gatsby-plugin-algolia`
3. **Asset Optimization**: Image processing and optimization
4. **Deployment**: Automatic deployment on push to main branch

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Run quality checks**: `npm run lint && npm test`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Code Style

- Follow existing code conventions
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add tests for new functionality
- Update documentation as needed

## 📝 API Documentation

### GraphQL Schema

Custom resolvers extend the Sanity schema:

- `allTags`: Flattened tag hierarchy for audio tracks
- `tagsByCategory`: Hierarchical category structure (level0-level3)

### Algolia Integration

Search indices are automatically synced during build:

- **Main Index**: Primary search index
- **Replica Indices**: Sorted variants for different ordering options

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables are set correctly
   - Verify Sanity CMS connection
   - Ensure Algolia credentials are valid

2. **Audio Player Issues**
   - Check audio file URLs are accessible
   - Verify cookie settings in browser
   - Test on different devices/browsers

3. **Search Not Working**
   - Verify Algolia configuration
   - Check search index exists and is populated
   - Ensure API keys have correct permissions

### Getting Help

- Check the [Issues](https://github.com/issc29/yafe-beito-frontend/issues) page
- Review the [Contributing Guidelines](CONTRIBUTING.md)
- Contact the development team

## 📄 License

This project is maintained by the Hakham Dr. José Faur Studies Foundation.

## 🙏 Acknowledgments

- Hakham Dr. José Faur for his teachings and wisdom
- The Yafe Be'ito Foundation for preserving and sharing this knowledge
- Contributors and community members who help maintain this platform
