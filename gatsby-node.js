
/**
 * Gatsby Node APIs Implementation
 * 
 * This file implements Gatsby's Node APIs to customize the build process.
 * Key functionality includes:
 * - Custom GraphQL schema extensions for audio track categorization
 * - Custom resolvers for hierarchical tag relationships
 * - Algolia search index synchronization during build
 * 
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const {isFuture,parseISO} = require('date-fns')
const { syncAlgoliaSettings } = require('./src/utils/algolia-settings')

/**
 * Gatsby Node API: onCreateNode
 * Called when a new node is created. Adds custom fields to nodes.
 */
exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions
  createNodeField({ node, name: `happiness`, value: `is sweet graphql queries` })
}

/*
exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Query: {
      allSanityAudioTracks: {
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({})
          console.log("a")
          console.log(entries)
          for(entry of entries) {
            entry.buyLink = "abc"
          }
          return entries
        }
    }
    
  }
}
  createResolvers(resolvers)
}

*/

/**
 * Gatsby Node API: createSchemaCustomization
 * Defines custom GraphQL schema types for hierarchical categories.
 * The Category type represents the hierarchical structure used for
 * organizing audio classes (e.g., Tora > Ketubim > specific books).
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Category {
      level0: [String!],
      level1: [String!],
      level2: [String!],
      level3: [String!],
    }
  `
  createTypes(typeDefs)
}

/**
 * Gatsby Node API: createResolvers
 * Creates custom GraphQL resolvers for complex data relationships.
 * 
 * This implementation adds two custom fields to SanityAudioTracks:
 * 1. allTags - Flattens hierarchical tag relationships into a single array
 * 2. tagsByCategory - Organizes tags into hierarchical levels for Algolia indexing
 */
exports.createResolvers = ({createResolvers}) => {
  createResolvers({
    SanityAudioTracks: {
      allTags: {
        type: '[SanityTag]',
        resolve: async(source, args, context, info) => {
        
          /**
           * Recursively traverses tag hierarchy to collect all parent tags
           * @param {string} ref - Reference ID to a tag node
           * @returns {Array} Array of tag objects with name and id
           */
          const mapParentTags = (ref) => {
            var tags = []
            const tagNode = context.nodeModel.getNodeById({id: ref })
            tags.push({name:tagNode.name, id: tagNode.id})
            if("parentTag" in tagNode && tagNode.parentTag !== null) {
              tags.push(...mapParentTags(tagNode.parentTag._ref))
            }
            return tags
          }
          
          const ref = source.tags[0]._ref
          var tags = []
          for (const tag of source.tags) {
            tags.push(...mapParentTags(tag._ref))
          }

          const uniqueIds = [];
          const uniqueTags = tags.filter(element => {
            const isDuplicate = uniqueIds.includes(element.id);
          
            if (!isDuplicate) {
              uniqueIds.push(element.id);
              return true;
            }
          
            return false;
          });

          return uniqueTags
        }
      }
    }
  })

  createResolvers({
    SanityAudioTracks: {
      tagsByCategory: {
        type: 'Category',
        resolve: async(source, args, context, info) => {
        
          /**
           * Recursively collects parent tag names in hierarchy
           * @param {string} ref - Reference ID to a tag node
           * @returns {Array} Array of tag names from root to current
           */
          const mapParentTags = (ref) => {
            var tags = []
            const tagNode = context.nodeModel.getNodeById({id: ref })
            tags.push(tagNode.name)
            if("parentTag" in tagNode && tagNode.parentTag !== null) {
              tags.push(...mapParentTags(tagNode.parentTag._ref))
            }
            return tags
          }
          
          const ref = source.tags[0]._ref
          var tags = []
          for (const tag of source.tags) {
            var tagsPerSource = []
            const parentTags = mapParentTags(tag._ref)
            
            for (let i = parentTags.length - 1; i >=0; i--) {
              if(i == parentTags.length - 1) {
                tagsPerSource.push(parentTags[i])
              }
              else {
                tagsPerSource.push(`${tagsPerSource[tagsPerSource.length - 1]} > ${parentTags[i]}`)
              }
            }
            tags.push(tagsPerSource)
          }

          var tagsPerLevel = {"level0": [], "level1": [], "level2": [], "level3": []}
          for (const tag of tags ) {
            for(let i = 0; i<tag.length; i++) {
              tagsPerLevel[`level${i}`].push(tag[i])
            }
          }
          console.log("TAGS")
          console.log(tagsPerLevel)
          
         return tagsPerLevel
        }
      }
    }
  })
}

/**
 * Gatsby Node API: onPostBuild
 * Called after the build is complete. Synchronizes Algolia search settings
 * and replica indices to ensure search functionality is properly configured.
 */
exports.onPostBuild = async function() {
  await syncAlgoliaSettings()
}
