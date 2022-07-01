
const indexName = `Tracks`
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
        tapeSide
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
function trackToAlgoliaRecord({ node: { id, title, tapeside, link, language, description, dateGiven, artist, allTags, tagsByCategory } }) {

    var tags = []
    for(const tag of allTags) {
        tags.push(tag.name)
    }

  return {
    objectID: id,
    title,
    tapeside,
    language,
    description,
    dateGiven,
    artist,
    _tags: tags,
    categories: tagsByCategory,
    link
  }
}
const queries = [
  {
    query: tracksQuery,
    transformer: ({ data }) => data.tracks.edges.map(trackToAlgoliaRecord),
    indexName,
    settings: {  },
  },
]
module.exports = queries