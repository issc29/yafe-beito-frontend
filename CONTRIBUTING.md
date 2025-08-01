# Contributing to Yafe Be'ito Frontend

Thank you for your interest in contributing to the Yafe Be'ito Frontend project! This guide will help you understand our development workflow, coding standards, and contribution process.

## 🚀 Getting Started

### Prerequisites
- Node.js 22.14.0+ (specified in package.json engines)
- npm package manager
- Git for version control
- Access to required services (Sanity CMS, Algolia, AWS SES)

### Development Setup
1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Set up environment variables (see README.md)
5. Start development server: `npm run dev`

## 📋 Development Workflow

### Branch Naming
Use descriptive branch names following this pattern:
```
feature/description-of-feature
bugfix/description-of-bug
docs/description-of-documentation
```

### Commit Messages
Write clear, descriptive commit messages:
```
feat: add audio player time tracking
fix: resolve mobile navigation issue
docs: update component documentation
refactor: simplify category filtering logic
```

## 🧪 Testing

### Running Tests
```bash
npm test              # Run all tests
npm test -- --watch  # Run tests in watch mode
```

### Writing Tests
- Place tests in the `tests/` directory
- Use Jest and React Testing Library
- Follow existing test patterns
- Test both happy path and edge cases

Example test structure:
```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';
import ComponentName from '../src/components/ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

## 🔧 Build Process

### Local Development
```bash
npm run dev              # Development server with hot reload
npm run clean-cache      # Clear Gatsby cache if needed
npm run lint             # Check code quality
npm run format           # Format code with Prettier
```

### Production Build
```bash
npm run build            # Build for production
gatsby serve             # Serve production build locally
```

## 📚 Architecture Guidelines

### Component Organization
```
src/components/
├── navigation/          # Navigation-specific components
├── ClassSearch.js       # Main search interface
├── audioPlayerCustom.js # Audio player component
├── layout.js           # Page layout wrapper
└── ...
```

### Data Flow
1. **Content**: Sanity CMS → GraphQL → Gatsby pages
2. **Search**: Algolia → InstantSearch → React components
3. **Audio**: Local state → Custom player → Cookie persistence

### Integration Patterns

#### Sanity CMS
- Use GraphQL queries in page components
- Leverage custom resolvers in `gatsby-node.js`
- Follow existing content modeling patterns

#### Algolia Search
- Configure indices in `src/utils/algolia-queries.js`
- Use InstantSearch hooks for search UI
- Maintain hierarchical category structure

#### Audio Player
- Integrate with existing player state management
- Support time tracking and session persistence
- Follow mobile-responsive patterns

## 🎨 Code Style

### JavaScript/React
- Use functional components with hooks
- Follow existing naming conventions
- Use JSDoc comments for functions and components
- Prefer const over let, avoid var
- Use destructuring for props and state

### CSS/Styling
- Use TailwindCSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use semantic color names from theme

### File Organization
- Keep components focused and single-purpose
- Use descriptive file and variable names
- Group related functionality together
- Separate concerns (UI, logic, data)

## 📖 Documentation Standards

### JSDoc Comments
Document all exported functions and components:

```javascript
/**
 * Component description
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Title to display
 * @param {Function} props.onClick - Click handler
 * @returns {JSX.Element} The component
 */
const MyComponent = ({ title, onClick }) => {
  // Component implementation
};
```

### README Updates
- Update README.md for significant changes
- Include setup instructions for new features
- Document new environment variables
- Add examples for complex functionality

## 🚀 Deployment

### Netlify Configuration
- **Build Command**: `npm run build`
- **Publish Directory**: `public/`
- **Functions Directory**: `functions/`

### Environment Variables
Ensure all required environment variables are configured in Netlify:
- Sanity CMS credentials
- Algolia search keys
- AWS SES configuration

## 📋 Pull Request Process

### Before Submitting
1. **Code Quality**
   ```bash
   npm run lint             # Fix linting issues
   npm run format           # Format code
   npm test                 # Ensure tests pass
   npm run build            # Verify build succeeds
   ```

2. **Documentation**
   - Update README.md if needed
   - Add JSDoc comments to new functions
   - Update CONTRIBUTING.md for new patterns

3. **Testing**
   - Add tests for new functionality
   - Verify existing tests still pass
   - Test on mobile devices

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new functionality
- [ ] Tested on mobile devices

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process
1. Automated checks must pass (linting, tests, build)
2. At least one code review required
3. Address all review feedback
4. Squash commits before merging

## 🐛 Bug Reports

### Before Reporting
- Check existing issues
- Reproduce the bug consistently
- Test in different browsers/devices

### Bug Report Template
```markdown
**Describe the bug**
Clear description of the issue

**To Reproduce**
Steps to reproduce the behavior

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
- Browser: [e.g. Chrome, Safari]
- Device: [e.g. iPhone, Desktop]
- Version: [e.g. 1.0.0]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of desired solution

**Describe alternatives you've considered**
Alternative solutions considered

**Additional context**
Any other context or screenshots
```

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain professional communication

### Getting Help
- Check documentation first
- Search existing issues
- Ask questions in discussions
- Provide context and examples

## 📚 Additional Resources

- [Gatsby Documentation](https://www.gatsbyjs.com/docs/)
- [React Documentation](https://reactjs.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Sanity CMS Documentation](https://www.sanity.io/docs)
- [Algolia InstantSearch Documentation](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/)

## 🙏 Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes for significant contributions
- Project documentation

Thank you for contributing to the preservation and sharing of Hakham Dr. José Faur's teachings!
