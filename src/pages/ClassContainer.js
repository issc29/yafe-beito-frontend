import React from "react";
import { PlayIcon } from "@heroicons/react/outline";
import 'react-h5-audio-player/lib/styles.css';

const ClassContainer = props => {
 
  const hitData = (props.hit || {})
  const tags = (hitData._tags || [])

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
        <div>{tags.map((tag) => (
          <button className="bg-gray-500 hover:bg-gray-400 px-2.5 rounded-lg mx-2">#{tag}</button>
        ))}</div>
        
      </div>
    </div>
  );
};

export default ClassContainer;
