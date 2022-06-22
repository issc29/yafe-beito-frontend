import React from "react";
import 'react-h5-audio-player/lib/styles.css';
import { PlayIcon, PauseIcon } from "@heroicons/react/solid";
import ReactPlayer from 'react-player'


const AudioPlayerCustomOld = () => {

  const [timeLineValue, setTimeLineValue] = React.useState(50)
  const [backgroundSize, setBackgroundSize] = React.useState(0)
  const handlePause = () => {}
  const handlePlay = () => {}
  const isPlaying = true
  const episode = { episodeUrl:"example.com", trackName: "test Track", shortDescription:"Test Desc"  }
  const episodeUrl = "example.com" 

  const changeTimelinePosition = (event) => {
    const percentagePosition = (100*event.currentTime) / event.duration
    alert(`${percentagePosition}% 100%`)
    console.log(`${percentagePosition}% 100%`)
    setBackgroundSize(`${percentagePosition}% 100%`)
    setTimeLineValue(percentagePosition)
  }


  return (
    <>
    <ReactPlayer
        className='react-player'
        width='100%'
        height='100%'
      />
      <div
        className="fixed left-0 bottom-0 min-w-full z-10 bg-dark-blue" >
        <div className="relative h-full w-full flex">
          <div className="sm:w-1/3"></div>
          <div key={episode.trackId} className="flex flex-row md:p-4 p-1 ">
            
              {
                isPlaying === true && episodeUrl === episode.episodeUrl ?
                  <PlayIcon className="align-middle md:pl-3 pl-2 h-20 w-20 text-white"/>
                  :
                  <PauseIcon className="align-middle md:pl-3 pl-2 h-20 w-20 text-white"/>
              }

            
            {/*  */}
            <div className="text-gray-100 p-2 px-4 text-left">
              <p className="">{episode.trackName}</p>
              {/*<EpisodeDescription description={episode.shortDescription} characterCount={100} readMore={false} /> */}
            </div>
          </div>
          <div id="audioSliderWrapper">
            <input type="range" className="audioSlider" style={{backgroundSize: backgroundSize}} max="100"  onTimeUpdate={changeTimelinePosition}></input>
          </div>
          <input type="range" className="audioSlider2" max="100" ></input>
        </div>
      </div>

    </>
  );
};

export default AudioPlayerCustomOld;
