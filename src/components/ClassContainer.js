import React from "react";
import { PlayIcon } from "@heroicons/react/outline";
import 'react-h5-audio-player/lib/styles.css';
import { useInstantSearch } from 'react-instantsearch-hooks-web';


const ClassContainer = props => {
 
  const hitData = (props.hit || {})
  const tags = (hitData._tags || [])
  const categoriesHierarchy = (hitData.categories || [])
  const { indexUiState, setIndexUiState } = useInstantSearch();

  return (
    <div className="bg-dark-blue text-white my-4 flex py-2">
      <div className="flex-none w-20">
        <PlayIcon 
          className="h-20 w-20 text-white hover:text-gray-400" 
          onClick={() => {props.setAudioSrc(hitData)}} >
        </PlayIcon>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="text-2xl">{hitData.title}</div>
        <div>{hitData.artist}</div>
        <div>{hitData.dateGiven}</div>
        <div>{Object.keys(categoriesHierarchy).map((level) => (
          categoriesHierarchy[level].map((category) => (
            <button 
              className="bg-gray-500 hover:bg-gray-400 px-2.5 rounded-lg mx-2" 
              onClick={() => {
                setIndexUiState((prevIndexUiState) => ({
                  ...prevIndexUiState,
                  hierarchicalMenu: {
                    "categories.level0": getCategoryHierarchy(category)
                  },
              }));
            }}
            >#{getMostSpecificCategory(category)}</button>
          ))
        ))
        }</div>
        
      </div>
    </div>
  );
};

function getCategoryHierarchy(category){
  return category.split(' > ')
}

function getMostSpecificCategory(category){
  const categoryArray = category.split(' > ')
  return categoryArray[categoryArray.length - 1]
}

export default ClassContainer;
