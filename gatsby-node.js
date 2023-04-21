

const {isFuture,parseISO} = require('date-fns')
const { reporter } = require('gatsby/node_modules/gatsby-cli/lib/reporter/reporter')
const { syncAlgoliaSettings } = require('./src/utils/algolia-settings')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createProjectPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanitySampleProject(filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const projectEdges = (result.data.allSanitySampleProject || {}).edges || []

  projectEdges
    .filter(edge => !isFuture(parseISO(edge.node.publishedAt)))
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/project/${slug}/`

      createPage({
        path,
        component: require.resolve('./src/templates/project.js'),
        context: {id}
      })
    })
}

exports.createPages = async ({graphql, actions}) => {
  await createProjectPages(graphql, actions)
}

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

exports.createResolvers = ({createResolvers}) => {
  createResolvers({
    // `SanityBlogPost` being the type name you want to extend
    SanityAudioTracks: {
      // `happiness` being the field name you want to add
      allTags: {
        // type is the _GraphQL_ type name, so you can do `String!` for "non-null string", `Int` for integer, `SanityCategory` for a document or object of type  `SanityCategory`.
        type: '[SanityTag]',
        resolve: async(source, args, context, info) => {
        
          // Recursively find all parent tags
          const mapParentTags = (ref) => {
            var tags = []
            const tagNode = context.nodeModel.getNodeById({id: ref })
            tags.push({name:tagNode.name, id: tagNode.id})
            if("parentTag" in tagNode && tagNode.parentTag !== null) {
              tags.push(...mapParentTags(tagNode.parentTag._ref))
            }
            return tags
          }
          
          // For all tags find parent tags
          const ref = source.tags[0]._ref
          var tags = []
          for (const tag of source.tags) {
            tags.push(...mapParentTags(tag._ref))
          }

          
          // Filter out any duplicates
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
    // `SanityBlogPost` being the type name you want to extend
    SanityAudioTracks: {
      // `happiness` being the field name you want to add
      tagsByCategory: {
        // type is the _GraphQL_ type name, so you can do `String!` for "non-null string", `Int` for integer, `SanityCategory` for a document or object of type  `SanityCategory`.
        type: 'Category',
        resolve: async(source, args, context, info) => {
        
          
          // Recursively find all parent tags
          const mapParentTags = (ref) => {
            var tags = []
            const tagNode = context.nodeModel.getNodeById({id: ref })
            tags.push(tagNode.name)
            if("parentTag" in tagNode && tagNode.parentTag !== null) {
              tags.push(...mapParentTags(tagNode.parentTag._ref))
            }
            return tags
          }
          
          // For all tags find parent tags
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

exports.onPostBuild = async function() {
  await syncAlgoliaSettings()
}