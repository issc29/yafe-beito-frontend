# Contributing to Yafe Be'ito Frontend

Thank you for your interest in contributing to the Yafe Be'ito educational platform! This document provides guidelines for contributing to the project.

## 🎯 Project Mission

Yafe Be'ito is dedicated to preserving and sharing the teachings of Hakham Dr. José Faur through a modern, accessible digital platform. All contributions should align with this educational mission.

## 🚀 Getting Started

### Prerequisites

- Node.js 22.14.0+ (use nvm for version management)
- Git
- Basic knowledge of React, Gatsby, and modern JavaScript
- Familiarity with Tailwind CSS

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/yafe-beito-frontend.git
   cd yafe-beito-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file and configure:
   ```bash
   cp .env.example .env.development
   ```
   
   Contact the maintainers for the required API keys and configuration values.

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

### Branch Naming Convention

Use descriptive branch names with the following format:
- `feature/description-of-feature`
- `bugfix/description-of-bug`
- `docs/description-of-documentation`
- `refactor/description-of-refactor`

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow existing code conventions
   - Write meaningful commit messages
   - Test your changes thoroughly

3. **Run quality checks**
   ```bash
   npm run lint        # Check code style
   npm run format      # Format code
   npm test           # Run tests
   npm run build      # Test production build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add description of your feature"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Convention

Follow conventional commit format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 🧩 Code Guidelines

### React Components

- Use functional components with hooks
- Follow existing naming conventions
- Keep components focused and reusable
- Use TypeScript-style prop validation where applicable

```javascript
// Good component structure
const ComponentName = ({ prop1, prop2 }) => {
  // Hooks at the top
  const [state, setState] = useState(initialValue);
  
  // Event handlers
  const handleClick = () => {
    // Implementation
  };
  
  // Render
  return (
    <div className="tailwind-classes">
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow existing color scheme and spacing
- Ensure responsive design (mobile-first approach)
- Test on multiple screen sizes

```javascript
// Good Tailwind usage
<div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6">
  {/* Content */}
</div>
```

### File Organization

- Place components in appropriate directories
- Use descriptive file names
- Keep related files together
- Follow existing directory structure

```
src/
├── components/
│   ├── navigation/     # Navigation-specific components
│   ├── audio/         # Audio-related components
│   └── search/        # Search-related components
├── pages/             # Gatsby pages
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── utils/             # Configuration utilities
```

## 🎵 Audio Player Development

When working on audio player features:

### Testing Audio Functionality

- Test with various audio formats and lengths
- Verify cookie persistence across browser sessions
- Test on mobile devices and different browsers
- Ensure accessibility compliance

### Audio Player Guidelines

- Maintain session persistence via cookies
- Ensure mobile responsiveness
- Test skip forward/backward functionality
- Verify volume controls work correctly

## 🔍 Search Feature Development

When working on search functionality:

### Algolia Integration

- Test search queries thoroughly
- Verify hierarchical category filtering
- Ensure mobile responsive design
- Test sorting functionality

### Search Guidelines

- Maintain search performance
- Ensure accurate categorization
- Test faceted navigation
- Verify pagination works correctly

## 🧪 Testing

### Running Tests

```bash
npm test              # Run all tests
npm test -- --watch   # Run tests in watch mode
npm test -- --coverage # Run tests with coverage
```

### Writing Tests

- Write tests for new components
- Test user interactions
- Mock external dependencies (Algolia, Sanity)
- Test responsive behavior

```javascript
// Example test structure
import { render, screen, fireEvent } from '@testing-library/react';
import ComponentName from '../ComponentName';

describe('ComponentName', () => {
  test('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
  
  test('handles user interaction', () => {
    render(<ComponentName />);
    fireEvent.click(screen.getByRole('button'));
    // Assert expected behavior
  });
});
```

## 📊 Content Management

### Sanity CMS

When working with content:

- Understand the existing schema structure
- Test GraphQL queries in Gatsby's GraphiQL interface
- Ensure content changes don't break existing functionality
- Document any schema changes

### GraphQL Development

- Use descriptive query names
- Optimize queries for performance
- Test queries with various data scenarios
- Document custom resolvers

## 🚀 Deployment

### Pre-deployment Checklist

- [ ] All tests pass
- [ ] Code is properly formatted
- [ ] No console errors or warnings
- [ ] Mobile responsiveness verified
- [ ] Audio player functionality tested
- [ ] Search functionality verified
- [ ] Environment variables configured

### Netlify Deployment

The project automatically deploys to Netlify on merge to main branch:

- Build command: `gatsby build`
- Publish directory: `public/`
- Environment variables configured in Netlify dashboard

## 🐛 Bug Reports

When reporting bugs:

1. **Use the issue template**
2. **Provide detailed reproduction steps**
3. **Include browser and device information**
4. **Add screenshots or videos if helpful**
5. **Check for existing similar issues**

### Bug Report Template

```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
Add screenshots if applicable.

**Environment**
- Browser: [e.g., Chrome 91]
- Device: [e.g., iPhone 12, Desktop]
- OS: [e.g., iOS 14, Windows 10]
```

## 💡 Feature Requests

When suggesting features:

1. **Check existing issues and discussions**
2. **Explain the use case and benefit**
3. **Consider the educational mission**
4. **Provide mockups or examples if helpful**

## 📝 Documentation

### Documentation Standards

- Use clear, concise language
- Include code examples
- Keep documentation up-to-date
- Follow existing formatting conventions

### Areas Needing Documentation

- Component API documentation
- GraphQL schema documentation
- Deployment procedures
- Troubleshooting guides

## 🤝 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain the educational mission

### Getting Help

- Check existing documentation
- Search through issues
- Ask questions in discussions
- Contact maintainers if needed

## 🔄 Review Process

### Pull Request Guidelines

- Provide clear description of changes
- Reference related issues
- Include screenshots for UI changes
- Ensure all checks pass
- Request review from maintainers

### Review Criteria

- Code quality and style
- Test coverage
- Documentation updates
- Performance impact
- Accessibility compliance

## 📞 Contact

For questions or support:

- Create an issue for bugs or feature requests
- Use discussions for general questions
- Contact maintainers for sensitive issues

Thank you for contributing to the preservation and sharing of Hakham Dr. José Faur's teachings!
