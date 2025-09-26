# Deployment Guide

This document provides detailed instructions for deploying the Yafe Be'ito frontend application.

## 🌐 Deployment Overview

The Yafe Be'ito frontend is deployed using Netlify with the following architecture:

- **Static Site Generation**: Gatsby builds static files
- **Serverless Functions**: Netlify Functions for contact form processing
- **CDN**: Global content delivery via Netlify's CDN
- **Continuous Deployment**: Automatic deployment on git push

## 🚀 Netlify Deployment

### Initial Setup

1. **Connect Repository to Netlify**
   - Log in to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select the `yafe-beito-frontend` repository

2. **Configure Build Settings**
   ```
   Build command: gatsby build
   Publish directory: public/
   ```

3. **Set Environment Variables**
   
   In Netlify dashboard → Site settings → Environment variables:
   
   ```bash
   # Sanity CMS
   GATSBY_SANITY_PROJECT_ID=your_sanity_project_id
   GATSBY_SANITY_DATASET=production
   SANITY_READ_TOKEN=your_sanity_read_token
   
   # Algolia Search
   GATSBY_ALGOLIA_APP_ID=your_algolia_app_id
   GATSBY_ALGOLIA_SEARCH_KEY=your_algolia_search_key
   ALGOLIA_ADMIN_KEY=your_algolia_admin_key
   GATSBY_ALGOLIA_INDEX=Tracks_PROD
   
   # AWS (for contact forms)
   SITE_AWS_ACCESS_KEY=your_aws_access_key
   SITE_AWS_SECRET=your_aws_secret_key
   SITE_CAPTCHA_SECRET=your_recaptcha_secret
   
   # Build Environment
   NODE_ENV=production
   ```

### Build Configuration

The build process includes:

1. **Dependency Installation**: `npm install`
2. **Gatsby Build**: Static site generation
3. **Algolia Sync**: Search index updates
4. **Asset Optimization**: Image and file optimization

### Serverless Functions

Contact form processing is handled by Netlify Functions:

```javascript
// functions/send-email/send-email.js
exports.handler = async (event, context) => {
  // AWS SES integration for email sending
};
```

Functions are automatically deployed with the site.

## 🔧 Environment Configuration

### Production Environment Variables

#### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GATSBY_SANITY_PROJECT_ID` | Sanity project identifier | `abc123def` |
| `GATSBY_SANITY_DATASET` | Sanity dataset name | `production` |
| `SANITY_READ_TOKEN` | Sanity API read token | `sk...` |
| `GATSBY_ALGOLIA_APP_ID` | Algolia application ID | `ABC123DEF` |
| `GATSBY_ALGOLIA_SEARCH_KEY` | Algolia search-only key | `abc123...` |
| `ALGOLIA_ADMIN_KEY` | Algolia admin key | `def456...` |
| `GATSBY_ALGOLIA_INDEX` | Algolia index name | `Tracks_PROD` |
| `SITE_AWS_ACCESS_KEY` | AWS access key | `AKIA...` |
| `SITE_AWS_SECRET` | AWS secret key | `abc123...` |
| `SITE_CAPTCHA_SECRET` | reCAPTCHA secret key | `6Lc...` |

#### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Build environment | `production` |
| `CI` | Continuous integration flag | `false` |

### Environment Files

For local development, create environment files:

```bash
# .env.development
GATSBY_SANITY_PROJECT_ID=your_dev_project_id
GATSBY_ALGOLIA_INDEX=Tracks_DEV
# ... other development variables

# .env.production
GATSBY_SANITY_PROJECT_ID=your_prod_project_id
GATSBY_ALGOLIA_INDEX=Tracks_PROD
# ... other production variables

# .env.ci
# CI-specific overrides
```

## 🔍 Search Index Management

### Algolia Configuration

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

### Index Synchronization

Search indices are automatically synchronized during the build process:

1. **Data Extraction**: GraphQL queries extract audio track data
2. **Data Transformation**: Convert to Algolia record format
3. **Index Update**: Push records to Algolia
4. **Settings Sync**: Configure search settings and replicas

### Manual Index Management

To manually update search indices:

```bash
# Install Algolia CLI
npm install -g algoliasearch-cli

# Configure credentials
algolia configure

# Update index
algolia import your_index_name -s path/to/data.json
```

## 📊 Content Management

### Sanity CMS Setup

1. **Project Configuration**
   - Ensure Sanity project is properly configured
   - Verify dataset permissions
   - Check API token permissions

2. **Content Schema**
   - Audio tracks with metadata
   - Hierarchical tag system
   - Site settings and configuration

3. **GraphQL Integration**
   - Custom resolvers for tag hierarchies
   - Optimized queries for performance

### Content Deployment

Content changes in Sanity CMS trigger automatic rebuilds:

1. **Webhook Configuration**: Set up Sanity webhook to trigger Netlify builds
2. **Build Triggers**: Content changes automatically rebuild the site
3. **Cache Invalidation**: CDN cache is automatically invalidated

## 🚀 Continuous Deployment

### Git Workflow

```bash
# Development workflow
git checkout -b feature/new-feature
# Make changes
git commit -m "feat: add new feature"
git push origin feature/new-feature
# Create pull request

# Production deployment
git checkout main
git merge feature/new-feature
git push origin main  # Triggers automatic deployment
```

### Build Process

1. **Trigger**: Git push to main branch
2. **Environment**: Netlify build environment
3. **Dependencies**: Install npm packages
4. **Build**: Run `gatsby build`
5. **Functions**: Deploy serverless functions
6. **Deploy**: Publish to CDN
7. **Notifications**: Build status notifications

### Build Optimization

- **Caching**: Netlify caches dependencies and build artifacts
- **Incremental Builds**: Only rebuild changed content
- **Asset Optimization**: Automatic image and file optimization
- **CDN**: Global content delivery network

## 🔒 Security Configuration

### Environment Security

- Store sensitive variables in Netlify environment settings
- Never commit secrets to version control
- Use read-only tokens where possible
- Regularly rotate API keys

### Content Security

- Configure Content Security Policy headers
- Enable HTTPS enforcement
- Set up proper CORS policies
- Implement rate limiting for contact forms

### Netlify Security Headers

```toml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

## 📈 Performance Optimization

### Build Performance

- **Parallel Processing**: Gatsby builds pages in parallel
- **Image Optimization**: Automatic image processing and optimization
- **Code Splitting**: Automatic code splitting for optimal loading
- **Prefetching**: Link prefetching for faster navigation

### Runtime Performance

- **Static Generation**: Pre-built static files
- **CDN Delivery**: Global content delivery
- **Lazy Loading**: Images and components load on demand
- **Service Worker**: Offline functionality and caching

### Monitoring

- **Netlify Analytics**: Built-in performance monitoring
- **Lighthouse Scores**: Regular performance audits
- **Core Web Vitals**: Monitor user experience metrics

## 🐛 Troubleshooting

### Common Build Issues

1. **Environment Variables Missing**
   ```
   Error: Missing required environment variable
   Solution: Check Netlify environment settings
   ```

2. **Sanity Connection Failed**
   ```
   Error: Cannot connect to Sanity
   Solution: Verify project ID and token
   ```

3. **Algolia Sync Failed**
   ```
   Error: Algolia index update failed
   Solution: Check API keys and index permissions
   ```

4. **Build Timeout**
   ```
   Error: Build exceeded time limit
   Solution: Optimize build process or contact support
   ```

### Debug Build Issues

1. **Check Build Logs**
   - Review Netlify build logs
   - Look for specific error messages
   - Check dependency installation

2. **Local Testing**
   ```bash
   npm run build  # Test production build locally
   npm run serve  # Serve built files
   ```

3. **Environment Verification**
   ```bash
   # Check environment variables
   echo $GATSBY_SANITY_PROJECT_ID
   echo $GATSBY_ALGOLIA_APP_ID
   ```

### Performance Issues

1. **Slow Build Times**
   - Check for large dependencies
   - Optimize GraphQL queries
   - Review image processing

2. **Runtime Performance**
   - Analyze bundle size
   - Check for memory leaks
   - Optimize component rendering

## 🔄 Rollback Procedures

### Netlify Rollback

1. **Via Dashboard**
   - Go to Netlify site dashboard
   - Navigate to "Deploys" tab
   - Click "Publish deploy" on previous version

2. **Via Git**
   ```bash
   git revert HEAD  # Revert last commit
   git push origin main  # Trigger new deployment
   ```

### Emergency Procedures

1. **Site Down**
   - Check Netlify status page
   - Verify DNS configuration
   - Contact Netlify support if needed

2. **Data Issues**
   - Check Sanity CMS status
   - Verify content integrity
   - Restore from backup if necessary

## 📞 Support and Monitoring

### Monitoring Tools

- **Netlify Analytics**: Site performance and usage
- **Uptime Monitoring**: External service monitoring
- **Error Tracking**: Application error monitoring
- **Performance Monitoring**: Core Web Vitals tracking

### Support Contacts

- **Netlify Support**: For hosting and deployment issues
- **Sanity Support**: For CMS-related problems
- **Algolia Support**: For search functionality issues
- **Development Team**: For application-specific problems

### Maintenance Schedule

- **Weekly**: Review build logs and performance metrics
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Performance optimization and security audit
- **Annually**: Infrastructure review and cost optimization

## 📋 Deployment Checklist

### Pre-deployment

- [ ] All tests pass locally
- [ ] Environment variables configured
- [ ] Content reviewed and approved
- [ ] Performance testing completed
- [ ] Security review completed

### Deployment

- [ ] Code merged to main branch
- [ ] Build completed successfully
- [ ] Functions deployed correctly
- [ ] Search indices updated
- [ ] CDN cache invalidated

### Post-deployment

- [ ] Site accessibility verified
- [ ] Audio player functionality tested
- [ ] Search functionality verified
- [ ] Contact form tested
- [ ] Mobile responsiveness checked
- [ ] Performance metrics reviewed

This deployment guide ensures reliable and secure deployment of the Yafe Be'ito frontend application.
