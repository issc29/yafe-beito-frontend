
const indexName = (process.env.GATSBY_ALGOLIA_INDEX) ?  process.env.GATSBY_ALGOLIA_INDEX : `Tracks_DEV`
const tracksQuery = `{
  tracks: allSanityAudioTracks {
    edges {
      node {
        artist
        dateGiven
        description
        id
        language
        title
        link
        _id
        tapeSide
        tapeNumber
        allTags {
          name
        }
        tagsByCategory {
          level0
          level1
          level2
          level3
        }
      }
    }
  }
}
`

const replicas = {
  CLASS_ASC: `${indexName}_classnum_asc`,
  CLASS_DSC: `${indexName}_classnum_dsc`,
  DATE_ASC: `${indexName}_date_asc`,
  DATE_DSC: `${indexName}_date_dsc`,
  TITLE_ASC: `${indexName}_title_asc`,
  TITLE_DSC: `${indexName}_title_dsc`,
}


function trackToAlgoliaRecord({ node: { id, title, tapeside, link, language, description, dateGiven, artist, allTags, tagsByCategory, _id, tapeNumber } }) {

    var tags = []
    for(const tag of allTags) {
        tags.push(tag.name)
    }

  return {
    objectID: id,
    title,
    tapeside,
    tapeNumber,
    language,
    description,
    dateGiven,
    artist,
    _tags: tags,
    categories: tagsByCategory,
    link,
    tapeID: _id
  }
}
const queries = [
  {
    query: tracksQuery,
    transformer: ({ data }) => data.tracks.edges.map(trackToAlgoliaRecord),
    indexName,
    settings: { 
      replicas: Object.values(replicas),
      attributesForFaceting: [
        'categories.level0', 
        'categories.level1', 
        'categories.level2', 
        'categories.level3'
      ]
    },
  },
  
]
module.exports = queries