/**
 * Sanity Client Configuration
 * 
 * Configuration object for connecting to Sanity CMS.
 * Used by gatsby-source-sanity plugin to fetch content during build.
 * 
 * Environment Variables:
 * - GATSBY_SANITY_PROJECT_ID: Sanity project identifier
 * - GATSBY_SANITY_DATASET: Dataset name (typically 'production')
 */
module.exports = {
  sanity: {
    projectId: process.env.GATSBY_SANITY_PROJECT_ID || '',
    dataset: process.env.GATSBY_SANITY_DATASET || 'production'
  }
}
