import React, { useState } from "react";
import { PlayCircleIcon, ShareIcon } from '@heroicons/react/24/outline';
import 'react-h5-audio-player/lib/styles.css';
import { useInstantSearch } from 'react-instantsearch-hooks-web';
import ShareLinkModal from "./ShareLinkModal";

/**
 * SpecificClassDetailsCard Component
 * 
 * Individual audio class display card component that shows class metadata,
 * provides playback controls, category filtering, and sharing functionality.
 * Used within search results to display each audio track.
 * 
 * Features:
 * - Play button integration with custom audio player
 * - Class metadata display (tape number, title, artist, date)
 * - Dynamic category buttons for hierarchical filtering
 * - Share functionality with URL generation and clipboard copy
 * - Modal feedback for successful link copying
 * - Integration with Algolia InstantSearch for category filtering
 * 
 * @param {Object} props - Component props
 * @param {Object} props.hit - Algolia search result object containing class data
 * @param {string} props.hit.tapeNumber - Physical tape identifier for sorting
 * @param {string} props.hit.title - Class title
 * @param {string} props.hit.artist - Speaker/teacher name
 * @param {string} props.hit.dateGiven - Date when the class was recorded
 * @param {string} props.hit.tapeID - Unique identifier for search linking
 * @param {Object} props.hit.categories - Hierarchical category structure (level0-level3)
 * @param {Array} props.hit._tags - Array of associated tags
 * @param {Function} props.setAudioSrc - Callback to set current audio track for playback
 * @param {Function} props.setPlay - Callback to trigger audio playback
 * @param {string} props.algoliaIndex - Current Algolia index name for URL generation
 * 
 * @returns {JSX.Element} The class details card component
 */
const SpecificClassDetailsCard = props => {
 
  const hitData = (props.hit || {})
  const tags = (hitData._tags || [])
  const categoriesHierarchy = (hitData.categories || [])
  const algoliaIndex = props.algoliaIndex

  let [isOpen, setIsOpen] = useState(false)

  /**
   * Closes the share link copied modal
   */
  function closeCopiedModal() {
    setIsOpen(false)
  }

  /**
   * Opens the share link copied modal and auto-closes after 1.5 seconds
   */
  function openCopiedModal() {
    setIsOpen(true)
    setTimeout(() => {
      closeCopiedModal()
    }, 1500);
  }

  return (
    <div className="flex bg-dark-blue text-white my-4 py-2 rounded-md">
      <div className="flex-none w-20" title="Play">
        <PlayCircleIcon 
          className="h-20 w-20 text-white hover:text-gray-400" 
          onClick={() => {
            props.setPlay(true)
            props.setAudioSrc(hitData)
            }} >
        </PlayCircleIcon>
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
        <ShareLinkModal isOpen={isOpen} closeModal={closeCopiedModal}/>
      </div>


    </div>
  );
};

/**
 * Generates clickable category buttons for hierarchical filtering
 * Creates buttons for each category level that update the search state
 * when clicked to filter results by that category.
 * 
 * @param {Object} categoriesHierarchy - Category structure with level0-level3 arrays
 * @returns {Array} Array of React button elements for each category
 */
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

/**
 * Parses category hierarchy string into array for Algolia filtering
 * @param {string} category - Category string with ' > ' separators
 * @returns {Array} Array of category levels for hierarchical filtering
 */
function getCategoryHierarchy(category){
  return category.split(' > ')
}

/**
 * Extracts the most specific (deepest) category from hierarchy string
 * @param {string} category - Category string with ' > ' separators  
 * @returns {string} The most specific category name
 */
function getMostSpecificCategory(category){
  const categoryArray = category.split(' > ')
  return categoryArray[categoryArray.length - 1]
}

export default SpecificClassDetailsCard;
