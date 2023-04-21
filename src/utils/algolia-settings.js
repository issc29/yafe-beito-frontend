const algoliasearch = require('algoliasearch');


exports.syncAlgoliaSettings= async function() {
  const ALGOLIA_APP_ID = process.env.GATSBY_ALGOLIA_APP_ID
  const ALGOLIA_API_KEY = process.env.ALGOLIA_ADMIN_KEY
  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
  const indexName = (process.env.ALGOLIA_INDEX) ?  process.env.ALGOLIA_INDEX : `Tracks_DEV`
  const replicas = {
    CLASS_ASC: `${indexName}_classnum_asc`,
    CLASS_DSC: `${indexName}_classnum_dsc`,
    DATE_ASC: `${indexName}_date_asc`,
    DATE_DSC: `${indexName}_date_dsc`,
    TITLE_ASC: `${indexName}_title_asc`,
    TITLE_DSC: `${indexName}_title_dsc`,
  }
  const indexSettingsTask = [
    {
      indexName,
      forwardToReplicas: true,
      settings: {
        replicas: Object.values(replicas),
        attributesForFaceting: [
          'categories.level0', 
          'categories.level1', 
          'categories.level2', 
          'categories.level3'
        ]
      }
    },
    {
      indexName: replicas.CLASS_ASC,
      settings: {
        ranking: [
          "asc(tapeNumber)",
          "typo",
          "geo",
          "words",
          "filters",
          "proximity",
          "attribute",
          "exact"
        ]
      }
    },
    {
      indexName: replicas.CLASS_DSC,
      settings: {
        ranking: [
          "desc(tapeNumber)",
          "typo",
          "geo",
          "words",
          "filters",
          "proximity",
          "attribute",
          "exact"
        ]
      }
    },
    {
      indexName: replicas.DATE_ASC,
      settings: {
        ranking: [
          "asc(dateGiven)",
          "typo",
          "geo",
          "words",
          "filters",
          "proximity",
          "attribute",
          "exact"
        ]
      }
    },
    {
      indexName: replicas.DATE_DSC,
      settings: {
        ranking: [
          "desc(dateGiven)",
          "typo",
          "geo",
          "words",
          "filters",
          "proximity",
          "attribute",
          "exact"
        ]
      }
    },
    {
      indexName: replicas.TITLE_ASC,
      settings: {
        ranking: [
          "asc(title)",
          "typo",
          "geo",
          "words",
          "filters",
          "proximity",
          "attribute",
          "exact"
        ]
      }
    },
    {
      indexName: replicas.TITLE_DSC,
      settings: {
        ranking: [
          "desc(title)",
          "typo",
          "geo",
          "words",
          "filters",
          "proximity",
          "attribute",
          "exact"
        ]
      }
    },
  ];

  for (const task of indexSettingsTask) {
    const { indexName, forwardToReplicas = false, settings } = task;
    await client
            .initIndex(indexName)
            .setSettings(settings, { forwardToReplicas }, (err, content) => {
              if (err) {
                console.log(
                  `X Could not sync settings with Algolia index ${indexName}`
                );
              } else
              console.log(
                `✔ Successfully synced settings with Algolia index ${indexName}`
              );
            })
  }
}
