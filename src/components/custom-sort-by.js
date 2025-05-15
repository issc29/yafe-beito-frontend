import React, { useState } from "react";
import 'react-h5-audio-player/lib/styles.css';
import { useInstantSearch, SortBy } from 'react-instantsearch-hooks-web';


const CustomSortBy = props => {
  const algoliaIndex = (process.env.GATSBY_ALGOLIA_INDEX) ?  process.env.GATSBY_ALGOLIA_INDEX : `Tracks_DEV`
  const [sort, setSort] = useState("classNumber")
  const [descendingSort, setDescendingSort] = useState(true)
  const { indexUiState, setIndexUiState } = useInstantSearch();

  function handleClickSortOrder(e){
    e.preventDefault();
    setDescendingSort(!descendingSort)

    /*setIndexUiState((prevIndexUiState) => ({
      ...prevIndexUiState,
      sortBy: '',
  }));*/
    
  }

  
  return (
    <div className="w-full sm:w-auto">
       <SortBy
       classNames={{
        root: 'hover:bg-white/50 hover:text-dark-blue bg-dark-blue text-white no-underline text-xl rounded-md w-full sm:w-auto inline-block',
        select: 'hover:bg-white/50 hover:text-dark-blue bg-dark-blue text-white no-underline text-xl rounded-md w-full sm:w-auto'
      }}
        items={[
          { label: 'Relevance', value: algoliaIndex },
          { label: 'Class # (ascending)', value: algoliaIndex + '_classnum_asc' },
          { label: 'Class # (descending)', value: algoliaIndex + '_classnum_dsc'  },
          { label: 'Title (A->Z)', value: algoliaIndex + '_title_asc'  },
          { label: 'Title (Z->A)', value: algoliaIndex + '_title_dsc'  },
          { label: 'Most Recent', value: algoliaIndex + '_date_dsc'  },
          { label: 'Least Recent', value: algoliaIndex + '_date_asc'  },
        ]}
      />
    </div>
  )
}

export default CustomSortBy;