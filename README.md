# Yafe Be'ito Frontend

**Hakham Dr. José Faur Studies Foundation Digital Library**

A modern web application built with Gatsby and React that serves as a digital library and educational resource for preserving and sharing the teachings of Hakham Dr. José Faur. The platform provides access to hundreds of audio recordings of classes and lectures, along with biographical information and foundation resources.

## 🎯 Project Overview

Yafe Be'ito (Hebrew: "beautiful in its time") is a foundation created to spread the Torah teachings of Hakham Dr. José Faur. This frontend application provides:

- **Audio Class Library**: Searchable database of recorded teachings with advanced categorization
- **Educational Content**: Biographical information, foundation details, and related materials  
- **Community Engagement**: Contact forms, donation system, and social media integration
- **Content Discovery**: Sophisticated search with hierarchical categories and filtering powered by Algolia

### Primary Users
- **Students and Scholars**: Access audio recordings with advanced search capabilities
- **Community Members**: Learn about the foundation and Hakham Dr. José Faur
- **Content Administrators**: Manage educational content through Sanity CMS

## 🏗️ Architecture

```
Frontend (Gatsby/React) → Content (Sanity CMS) → Search (Algolia) → Media (Audio Player)
                      ↓
            Deployment (Netlify) → Communication (AWS SES + Functions)
```

### Tech Stack
- **Frontend**: Gatsby 5.x, React 18, TailwindCSS
- **Content Management**: Sanity CMS with GraphQL
- **Search**: Algolia with InstantSearch
- **Audio**: Custom React audio player with time tracking
- **Deployment**: Netlify with serverless functions
- **Email**: AWS SES for contact forms

## 🚀 Quick Start

### Prerequisites
- Node.js 22.14.0+ (specified in package.json engines)
- npm or yarn package manager
- Access to Sanity CMS project
- Algolia search account

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

3. **Environment Setup**
   
   Copy the example environment file and configure your variables:
   ```bash
   cp .env.example .env.development
   ```
   
   Required environment variables:
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
   
   # AWS SES (for contact forms)
   SITE_AWS_ACCESS_KEY=your_aws_access_key
   SITE_AWS_SECRET=your_aws_secret_key
   SITE_AWS_REGION=us-east-1
   SITE_VERIFIED_EMAIL=your_verified_email
   SITE_CAPTCHA_SECRET=your_recaptcha_secret
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The site will be available at `http://localhost:8000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production version
- `npm run clean-cache` - Clear Gatsby cache
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run Jest tests

## 📁 Project Structure

```
yafe-beito-frontend/
├── src/
│   ├── components/           # React components
│   │   ├── navigation/      # Navigation-specific components
│   │   ├── ClassSearch.js   # Audio search interface (core feature)
│   │   ├── audioPlayerCustom.js # Custom audio player
│   │   ├── SpecificClassDetailsCard.js # Individual class display
│   │   ├── nav-bar.js       # Primary navigation
│   │   ├── layout.js        # Global page wrapper
│   │   └── ...
│   ├── pages/               # Gatsby page components
│   │   ├── index.js         # Homepage
│   │   ├── classes.js       # Audio library (main feature)
│   │   ├── contact.js       # Contact form
│   │   ├── donate.js        # Donation page
│   │   └── about/           # Information pages
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   │   └── helpers.js       # Core helper functions
│   └── utils/               # Configuration utilities
│       ├── algolia-queries.js # Search index configuration
│       └── algolia-settings.js # Search service setup
├── functions/               # Netlify serverless functions
│   └── send-email/         # Contact form processing
├── __mocks__/              # Jest testing mocks
├── tests/                  # Component tests
├── gatsby-config.js        # Main Gatsby configuration
├── gatsby-node.js          # Build-time data processing
└── client-config.js        # Sanity client configuration
```

## 🔧 Key Features

### Audio Class Library
The core feature of the application, providing:
- Searchable database of audio recordings
- Hierarchical category system (Tora, Ketubim, etc.)
- Custom audio player with time tracking and session persistence
- Direct linking to specific timestamps in recordings

### Search & Discovery
Powered by Algolia InstantSearch:
- Real-time search across all audio content
- Faceted navigation with hierarchical categories
- Custom sorting options (by class number, date, etc.)
- Mobile-responsive search interface

### Content Management
Integration with Sanity CMS:
- Structured content for audio tracks, categories, and site information
- Custom GraphQL resolvers for complex tag relationships
- Build-time content processing and optimization

## 🔌 Integrations

### Sanity CMS
- **Project Configuration**: Defined in `client-config.js`
- **GraphQL Integration**: Custom resolvers in `gatsby-node.js`
- **Content Types**: Audio tracks, tags, site settings, and page content

### Algolia Search
- **Index Management**: Configured in `src/utils/algolia-queries.js`
- **Settings Sync**: Automated via `src/utils/algolia-settings.js`
- **Search Interface**: Implemented in `src/components/ClassSearch.js`

### AWS Services
- **SES Email**: Contact form processing via Netlify functions
- **Configuration**: Environment variables for AWS credentials

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Tests are located in the `tests/` directory and use Jest with React Testing Library.

## 🚢 Deployment

The application is configured for deployment on Netlify:

1. **Build Process**: Gatsby generates static files
2. **Algolia Sync**: Search indices are updated during build
3. **Serverless Functions**: Contact form processing via Netlify Functions
4. **Environment Variables**: Configure in Netlify dashboard

### Build Configuration
- **Build Command**: `npm run build`
- **Publish Directory**: `public/`
- **Functions Directory**: `functions/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and add tests if applicable
4. Run linting and tests: `npm run lint && npm test`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

### Code Style
- Use ESLint configuration provided in the project
- Format code with Prettier: `npm run format`
- Follow existing component patterns and naming conventions
- Add JSDoc comments for new components and functions

## 📚 Additional Resources

- [Gatsby Documentation](https://www.gatsbyjs.com/docs/)
- [Sanity CMS Documentation](https://www.sanity.io/docs)
- [Algolia InstantSearch Documentation](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)

## 📄 License

This project is private and proprietary to the Yafe Be'ito Foundation.

## 🙏 Acknowledgments

This project is dedicated to preserving and sharing the Torah teachings of Hakham Dr. José Faur, may his memory be a blessing.
