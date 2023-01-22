import React, { useState } from "react";
import { PlayIcon } from "@heroicons/react/outline";
import 'react-h5-audio-player/lib/styles.css';
import { useInstantSearch } from 'react-instantsearch-hooks-web';


const ClassContainer = props => {
 
  const hitData = (props.hit || {})
  const tags = (hitData._tags || [])
  const categoriesHierarchy = (hitData.categories || [])
  const algoliaIndex = props.algoliaIndex
  const [shareButtonText, setShareButtonText] = useState("Share Class")

  return (
    <div className="bg-dark-blue text-white my-4 flex py-2">
      <div className="flex-none w-20">
        <PlayIcon 
          className="h-20 w-20 text-white hover:text-gray-400" 
          onClick={() => {
            props.setPlay(true)
            props.setAudioSrc(hitData)
            }} >
        </PlayIcon>
      </div>
      <div className="flex-1 flex flex-col">
        <div className=" flex">
          <div className="text-2xl">{hitData.title}</div>
          <div className="flex-1" >
            <button 
              className="float-right bg-gray-500 hover:bg-gray-400 px-2.5 rounded-lg mx-2" 
              onClick={() => {
                const link = window.location.href.split('?')[0] + `?${algoliaIndex}%5Bquery%5D=${hitData.tapeID}`
                navigator.clipboard.writeText(link);
                setShareButtonText("Link Copied!")
                setTimeout(() => {
                  setShareButtonText("Share Class")
                }, 1500);
              }} 
            >{shareButtonText}</button></div>
          </div>
        <div>{hitData.artist}</div>
        <div>{hitData.dateGiven}</div>
        <div>{
        generateCategoryButtons(categoriesHierarchy).map((button) => (
          button
        ))
        }</div>
        
      </div>
    </div>
  );
};

function generateCategoryButtons(categoriesHierarchy){
  const { indexUiState, setIndexUiState } = useInstantSearch();
  const levels = ["level0", "level1", "level2", "level3"]
  var buttons = []
  levels.map((level) => {

    const a = categoriesHierarchy[level].map((category) => (
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
    buttons.push(a)
    })
return buttons
  
}

function getCategoryHierarchy(category){
  return category.split(' > ')
}

function getMostSpecificCategory(category){
  const categoryArray = category.split(' > ')
  return categoryArray[categoryArray.length - 1]
}

export default ClassContainer;
