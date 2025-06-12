

const {isFuture,parseISO} = require('date-fns')
const { syncAlgoliaSettings } = require('./src/utils/algolia-settings')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
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

// Shared helper function for recursively finding parent tags
const mapParentTags = (ref, context, includeId = false) => {
  var tags = []
  const tagNode = context.nodeModel.getNodeById({id: ref })
  if (includeId) {
    tags.push({name: tagNode.name, id: tagNode.id})
  } else {
    tags.push(tagNode.name)
  }
  if("parentTag" in tagNode && tagNode.parentTag !== null) {
    tags.push(...mapParentTags(tagNode.parentTag._ref, context, includeId))
  }
  return tags
}

exports.createResolvers = ({createResolvers}) => {
  createResolvers({
    SanityAudioTracks: {
      allTags: {
        type: '[SanityTag]',
        resolve: async(source, args, context, info) => {
          var tags = []
          for (const tag of source.tags) {
            tags.push(...mapParentTags(tag._ref, context, true))
          }

          const uniqueTagsMap = new Map();
          tags.forEach(tag => {
            uniqueTagsMap.set(tag.id, tag);
          });
          const uniqueTags = Array.from(uniqueTagsMap.values());

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
          var tags = []
          for (const tag of source.tags) {
            var tagsPerSource = []
            const parentTags = mapParentTags(tag._ref, context, false)
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
          
         return tagsPerLevel
        }
      }
    }
  })
}

exports.onPostBuild = async function() {
  await syncAlgoliaSettings()
}
