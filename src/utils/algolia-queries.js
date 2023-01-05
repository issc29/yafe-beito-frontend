
const indexName = (process.env.ALGOLIA_INDEX) ?  process.env.ALGOLIA_INDEX : `Tracks_DEV`
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
function trackToAlgoliaRecord({ node: { id, title, tapeside, link, language, description, dateGiven, artist, allTags, tagsByCategory, _id } }) {

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
      attributesForFaceting: [
        'categories.level0',
        'categories.level1',
        'categories.level2',
        'categories.level3',
    ] },
  },
]
module.exports = queries