# Contributing to Yafe Be'ito Frontend

Thank you for your interest in contributing to the Yafe Be'ito Frontend project! This document provides guidelines and information for developers who want to contribute to the codebase.

## Development Setup

### Prerequisites

- Node.js ^22.14.0
- npm package manager
- Git
- Access to required services (Sanity CMS, Algolia, AWS SES)

### Initial Setup

1. **Clone and Install**
   ```bash
   git clone https://github.com/issc29/yafe-beito-frontend.git
   cd yafe-beito-frontend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env.development
   ```
   
   Fill in the required environment variables (see README.md for details).

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming Convention

Use descriptive branch names with the following format:
- Feature: `feature/description-of-feature`
- Bug fix: `bugfix/description-of-fix`
- Documentation: `docs/description-of-changes`

### Making Changes

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow the existing code style and patterns
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**
   ```bash
   npm test
   npm run lint
   npm run build
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add descriptive commit message"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Code Style Guidelines

### React Components

- Use functional components with hooks
- Follow existing naming conventions (PascalCase for components)
- Use destructuring for props
- Keep components focused and single-purpose

```javascript
import React from 'react';

const MyComponent = ({ title, children }) => {
  return (
    <div className="my-component">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default MyComponent;
```

### Styling

- Use Tailwind CSS classes for styling
- Follow the existing color scheme and design patterns
- Ensure responsive design (mobile-first approach)
- Use semantic HTML elements

### File Organization

- Components in `src/components/`
- Pages in `src/pages/`
- Utilities in `src/lib/` or `src/utils/`
- Tests in `tests/` directory
- Follow existing directory structure

## Testing Guidelines

### Writing Tests

- Use Jest and React Testing Library
- Test user interactions, not implementation details
- Follow the Arrange-Act-Assert pattern
- Mock external dependencies

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from '../src/components/MyComponent';

describe('MyComponent', () => {
  it('renders with correct title', () => {
    render(<MyComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const mockHandler = jest.fn();
    render(<MyComponent onClick={mockHandler} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockHandler).toHaveBeenCalled();
  });
});
```

### Test Coverage

- Aim for good test coverage of new components
- Test both happy path and error scenarios
- Include accessibility testing where relevant

## Architecture Guidelines

### Component Hierarchy

- Keep components small and focused
- Use composition over inheritance
- Pass data down through props
- Use React hooks for state management

### Data Flow

- GraphQL queries in page components
- Pass data to child components via props
- Use custom hooks for reusable logic
- Manage global state with React Context when needed

### Performance Considerations

- Use Gatsby's built-in optimizations
- Optimize images using gatsby-plugin-image
- Lazy load components when appropriate
- Minimize bundle size

## Specific Areas

### Audio Player Development

When working on the audio player system:
- Test across different browsers and devices
- Ensure accessibility compliance
- Handle network errors gracefully
- Maintain session persistence

### Search Functionality

When modifying search features:
- Test with various search queries
- Ensure faceted navigation works correctly
- Verify category hierarchies display properly
- Test mobile responsiveness

### Sanity CMS Integration

When working with CMS integration:
- Follow existing GraphQL query patterns
- Handle missing or malformed data
- Test with draft and published content
- Ensure proper error handling

## Pull Request Guidelines

### Before Submitting

- [ ] All tests pass (`npm test`)
- [ ] Code passes linting (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Changes are documented
- [ ] Responsive design tested
- [ ] Accessibility considerations addressed

### PR Description Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Cross-browser testing done

## Screenshots (if applicable)
Include screenshots for UI changes.

## Additional Notes
Any additional context or considerations.
```

### Review Process

1. Automated checks must pass
2. Code review by maintainer
3. Testing in staging environment
4. Approval and merge

## Common Issues and Solutions

### Build Issues

- **Gatsby cache problems**: Run `npm run clean-cache`
- **Environment variables**: Ensure all required vars are set
- **Node version**: Verify Node.js version matches requirements

### Development Issues

- **Hot reload not working**: Restart development server
- **GraphQL errors**: Check queries in GraphiQL explorer
- **Styling issues**: Clear browser cache and restart server

### Testing Issues

- **Tests failing**: Check for proper mocking of external dependencies
- **Snapshot mismatches**: Review and update snapshots if changes are intentional

## Resources

- [Gatsby Documentation](https://www.gatsbyjs.com/docs/)
- [React Documentation](https://reactjs.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Jest Testing Framework](https://jestjs.io/docs/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Getting Help

- Check existing issues and documentation first
- Create detailed issue reports with reproduction steps
- Include relevant code snippets and error messages
- Tag appropriate maintainers for urgent issues

## Code of Conduct

- Be respectful and professional in all interactions
- Focus on constructive feedback
- Help maintain a welcoming environment for all contributors
- Follow project guidelines and conventions

Thank you for contributing to the Yafe Be'ito Frontend project!
