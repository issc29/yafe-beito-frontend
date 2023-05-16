import React, { useState } from "react";
import { PlayIcon, ShareIcon } from "@heroicons/react/outline";
import 'react-h5-audio-player/lib/styles.css';
import { useInstantSearch } from 'react-instantsearch-hooks-web';
import CopiedModal from "./copied-modal";


const ClassContainer = props => {
 
  const hitData = (props.hit || {})
  const tags = (hitData._tags || [])
  const categoriesHierarchy = (hitData.categories || [])
  const algoliaIndex = props.algoliaIndex

  let [isOpen, setIsOpen] = useState(false)

  function closeCopiedModal() {
    setIsOpen(false)
  }

  function openCopiedModal() {
    setIsOpen(true)
    setTimeout(() => {
      closeCopiedModal()
    }, 1500);
  }

  return (
    <div className="flex bg-dark-blue text-white my-4 py-2 rounded-md">
      <div className="flex-none w-20" title="Play">
        <PlayIcon 
          className="h-20 w-20 text-white hover:text-gray-400" 
          onClick={() => {
            props.setPlay(true)
            props.setAudioSrc(hitData)
            }} >
        </PlayIcon>
      </div>
      <div className="flex-1 flex">
        <div className="grow flex flex-col ">
          <div className="flex-1 text-2xl">{hitData.tapeNumber}. {hitData.title}</div>
          <div>{hitData.artist}</div>
          <div>{hitData.dateGiven}</div>
          <div>{
            generateCategoryButtons(categoriesHierarchy).map((button) => (
            button
            ))
            }
          </div>
        </div>
        <div className="flex-1 w-20 mr-3" title="Share Class">
            <ShareIcon 
              className="h-7 w-7 text-white hover:text-gray-400 float-right" 
              onClick={() => {
                const link = window.location.href.split('?')[0] + `?${algoliaIndex}%5Bquery%5D=${hitData.tapeID}`
                navigator.clipboard.writeText(link);
                openCopiedModal()
                }} >
            </ShareIcon>
          </div>
        <CopiedModal isOpen={isOpen} closeModal={closeCopiedModal}/>
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
        className="bg-gray-500 hover:bg-gray-400 px-2.5 rounded-lg mx-2 m-1" 
        key={getMostSpecificCategory(category)}
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
