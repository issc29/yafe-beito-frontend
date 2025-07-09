# Yafe Be'ito Frontend

A Gatsby-based React application for the **Yafe Be'ito: Hakham Dr. José Faur Studies Foundation**, providing a digital library and educational platform for Jewish studies and religious teachings.

## Overview

This website serves as a comprehensive digital archive and learning platform featuring:

- **Audio Class Library**: Searchable collection of recorded teachings and lectures
- **Advanced Search**: Algolia-powered search with hierarchical categorization
- **Responsive Design**: Mobile-first interface with accessible navigation
- **Content Management**: Sanity CMS integration for dynamic content
- **Community Features**: Contact forms, donation system, and social engagement

## Technology Stack

- **Frontend**: Gatsby (React-based static site generator)
- **Styling**: Tailwind CSS with custom design system
- **CMS**: Sanity headless CMS for content management
- **Search**: Algolia search with custom indexing and faceted navigation
- **Audio**: Custom HTML5 audio player with session persistence
- **Deployment**: Netlify with serverless functions
- **Email**: AWS SES for contact form processing

## Architecture

```
Frontend (Gatsby/React) → Content (Sanity CMS) → Search (Algolia) → Media (Audio Player)
                      ↓
            Deployment (Netlify) → Communication (AWS SES + Functions)
```

### Key Systems

1. **Navigation System** (`src/components/nav-bar.js`)
   - Responsive navigation with desktop/mobile variants
   - Dropdown menus for hierarchical content organization
   - Headless UI components for accessibility

2. **Audio Class Library** (`src/pages/classes.js`, `src/components/ClassSearch.js`)
   - Core feature: searchable audio track database
   - Custom audio player with cookie-based session persistence
   - Integration with Algolia for advanced search capabilities

3. **Search & Discovery** (`src/components/ClassSearch.js`, `src/utils/algolia-*`)
   - Algolia-powered search with hierarchical categories
   - Custom sorting options (by class number, date, title)
   - Real-time search with faceted navigation

4. **Content Management** (GraphQL queries throughout)
   - Sanity CMS for all content management
   - Custom GraphQL resolvers for audio track metadata
   - Build-time data processing in `gatsby-node.js`

## Project Structure

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
│       ├── algolia-queries.js  # Search index configuration
│       └── algolia-settings.js # Search service setup
├── functions/              # Netlify serverless functions
│   └── send-email/         # Contact form processing
├── tests/                  # Component tests
├── gatsby-config.js        # Main Gatsby configuration
├── gatsby-node.js          # Build-time data processing
└── package.json           # Dependencies and scripts
```

## Setup Instructions

### Prerequisites

- Node.js ^22.14.0
- npm or yarn package manager
- Access to Sanity CMS project
- Algolia search account
- AWS SES for email functionality (optional)

### Environment Configuration

1. Copy the environment template:
   ```bash
   cp .env.example .env.development
   ```

2. Configure the following environment variables:

   **Sanity CMS:**
   ```
   GATSBY_SANITY_PROJECT_ID=your_sanity_project_id
   GATSBY_SANITY_DATASET=production
   ```

   **Algolia Search:**
   ```
   GATSBY_ALGOLIA_APP_ID=your_algolia_app_id
   GATSBY_ALGOLIA_SEARCH_KEY=your_search_only_key
   ALGOLIA_ADMIN_KEY=your_admin_key
   ALGOLIA_INDEX=your_index_name
   ```

   **AWS SES (for contact forms):**
   ```
   SITE_AWS_ACCESS_KEY=your_aws_access_key
   SITE_AWS_SECRET=your_aws_secret_key
   SITE_AWS_REGION=your_aws_region
   SITE_VERIFIED_EMAIL=your_verified_email
   SITE_CAPTCHA_SECRET=your_recaptcha_secret
   ```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/issc29/yafe-beito-frontend.git
   cd yafe-beito-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:8000`

## Development Workflow

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run clean-cache` - Clear Gatsby cache
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Key Development Areas

#### Audio Player System
The custom audio player (`src/components/audioPlayerCustom.js`) features:
- Session persistence via cookies
- Custom controls with 10-second skip functionality
- Mobile-responsive design
- Integration with search results

#### Search Implementation
The search system uses Algolia with custom configuration:
- Hierarchical categories (level0-level3) for Jewish studies topics
- Multiple sort indices (by class number, date, title)
- Real-time search with faceted navigation
- Custom category ordering for religious texts

#### GraphQL Customization
Custom resolvers in `gatsby-node.js` provide:
- Flattened tag relationships (`allTags` field)
- Hierarchical category structure (`tagsByCategory` field)
- Build-time data processing for search indexing

### Testing

The project uses Jest with React Testing Library:

```bash
npm test
```

Test files are located in the `tests/` directory and follow the pattern:
- Component tests: `tests/components/*.test.js`
- Mock configurations: `__mocks__/`

Example test structure:
```javascript
import { render, screen } from '@testing-library/react';
import Component from '../src/components/Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Deployment

The application is designed for Netlify deployment with:

1. **Build Configuration**: Automatic builds from the main branch
2. **Serverless Functions**: Contact form processing via `functions/send-email/`
3. **Environment Variables**: Configure in Netlify dashboard
4. **Algolia Integration**: Automatic index updates during build

### Build Process

1. Gatsby builds static site
2. Algolia indices are updated with latest content
3. Serverless functions are deployed
4. Static assets are deployed to CDN

## Key Components Documentation

### Navigation System
- `nav-bar.js`: Main navigation component with responsive design
- `navigation/DesktopNavigation.js`: Desktop navigation layout
- `navigation/MobileMenu.js`: Mobile navigation with collapsible menu
- `NavigationDropdown.js`: Dropdown menu implementation

### Audio Library
- `ClassSearch.js`: Main search interface with Algolia integration
- `SpecificClassDetailsCard.js`: Individual audio track display
- `audioPlayerCustom.js`: Custom HTML5 audio player
- `ShareLinkModal.js`: Share functionality for audio tracks

### Layout & Utilities
- `layout.js`: Global page wrapper with background handling
- `seo.js`: SEO meta tag management
- `helpers.js`: Utility functions for data processing
- `container.js`: Responsive container component

## Content Management

### Sanity CMS Integration
- Content types: Audio tracks, site settings, featured content
- Custom fields: Hierarchical tags, audio metadata, publication dates
- Real-time preview in development mode

### Audio Track Schema
Each audio track includes:
- Title, artist, description
- Date given, tape number, tape side
- Hierarchical tags for categorization
- Audio file URL
- Language designation

## Troubleshooting

### Common Issues

1. **Build Failures**: Check environment variables are properly set
2. **Search Not Working**: Verify Algolia credentials and index configuration
3. **Audio Player Issues**: Ensure audio URLs are accessible and CORS-enabled
4. **Styling Issues**: Run `npm run clean-cache` to clear Gatsby cache

### Development Tips

1. Use `gatsby clean` to resolve caching issues
2. Check browser console for JavaScript errors
3. Verify GraphQL queries in GraphiQL (`http://localhost:8000/___graphql`)
4. Test responsive design using browser dev tools

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and add tests
4. Run linting and tests: `npm run lint && npm test`
5. Commit your changes: `git commit -m "Add your feature"`
6. Push to the branch: `git push origin feature/your-feature`
7. Submit a pull request

### Code Style Guidelines

- Use functional components with hooks
- Follow existing naming conventions
- Add tests for new components
- Use TypeScript-style prop validation where applicable
- Follow accessibility best practices

## License

This project is private and proprietary to the Yafe Be'ito Foundation.

## Support

For technical support or questions about the codebase, please contact the development team or create an issue in the repository.
