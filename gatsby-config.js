// Load variables from `.env` as soon as possible
if (process.env.CI) {
  require("dotenv").config({
    path: `.env.ci`,
  })
} else {
  require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
  })
}

const clientConfig = require('./client-config')
const token = process.env.SANITY_READ_TOKEN

const isProd = process.env.NODE_ENV === 'production'
const indexName = (process.env.GATSBY_ALGOLIA_INDEX) ?  process.env.GATSBY_ALGOLIA_INDEX : `Tracks_DEV`

module.exports = {
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-netlify',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token,
        watchMode: !isProd,
        overlayDrafts: !isProd && token
      }
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries"),
      },
    }
  ],
  siteMetadata: {
    title: `Hakham Dr. José Faur Studies Foundation | Yafe Be'ito`,
    description: `Yafe Be'ito is a foundation created to spread the Tora of Hakham Faur -   the time is Yafe-nice for his Tora to light up the world more than ever!\n\nThe word Yafe is also the acronym of Hakham Faur's name which he used this way in several places when signing his name:יוסף פאור הלוי.`,
    siteUrl: `https://yafebeito.com/`,
  },
}
