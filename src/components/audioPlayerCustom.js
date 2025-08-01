import React, { useEffect } from "react";
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { MdForward10 } from "@react-icons/all-files/md/MdForward10";
import { MdReplay10 } from "@react-icons/all-files/md/MdReplay10";
import { isMobile } from 'react-device-detect';

/**
 * AudioPlayerCustom Component
 * 
 * Custom audio player component that provides enhanced functionality for playing
 * audio classes with time tracking, session persistence, and mobile optimization.
 * 
 * Features:
 * - Fixed bottom position for persistent playback during navigation
 * - Time tracking with callback for session persistence via cookies
 * - Resume playback from specific timestamps via linkWithTime
 * - Custom 10-second forward/backward jump controls
 * - Mobile-responsive layout (hides volume controls on mobile)
 * - Auto-play trigger via props.play state
 * - Track metadata display (title, artist)
 * 
 * @param {Object} props - Component props
 * @param {Object} props.Track - Audio track object containing metadata and URLs
 * @param {string} props.Track.id - Unique identifier for the track
 * @param {string} props.Track.title - Display title of the audio class
 * @param {string} props.Track.artist - Artist/speaker name (typically Hakham Dr. José Faur)
 * @param {string} props.Track.link - Base audio file URL
 * @param {string} [props.Track.linkWithTime] - Audio URL with timestamp parameter for resuming playback
 * @param {boolean} props.play - Trigger to start playback when track changes
 * @param {Function} props.setPlay - Callback to reset play trigger state
 * @param {Function} props.setAudioTime - Callback to track current playback time for persistence
 * 
 * @returns {JSX.Element} The custom audio player component
 */
const AudioPlayerCustom = (props) => {
  const player = React.useRef()
  const trackId = props.Track.id || ""

  useEffect(() => {
    if(props.play) {
      player.current.audio.current.play()
      props.setPlay(false)
     }
  }, [props.Track])

  return (
    <>
      <div
        className="fixed left-0 bottom-0 min-w-full z-10 bg-dark-blue" >
        <div className="relative h-full w-full sm:flex text-center sm:text-left">
          <div key={props.Track.id} className="flex flex-col md:p-4 p-1 text-white sm:min-w-[150px] whitespace-nowrap overflow-hidden">
            <div>{props.Track.title}</div>
            <div className="text-xs">{props.Track.artist}</div>
          </div>

          <AudioPlayer
            autoPlay={false} 
            autoPlayAfterSrcChange={false}
            src={(props.Track.linkWithTime) ? props.Track.linkWithTime : props.Track.link}
            showJumpControls={true} 
            progressJumpSteps={{backward: 10000, forward: 10000 }}
            volume=".5"
            onListen={e => props.setAudioTime(e.target.currentTime)}
            showFilledVolume={true} 
            showDownloadProgress={false}
            customAdditionalControls={[]} 
            customControlsSection={[]}
            customVolumeControls={[]}
            customProgressBarSection={
              [
                RHAP_UI.MAIN_CONTROLS,
                RHAP_UI.CURRENT_TIME,
                RHAP_UI.PROGRESS_BAR,
                RHAP_UI.DURATION,
                ... (isMobile) ? [] : [RHAP_UI.VOLUME],
              ]
            }
            customIcons={{
              rewind: <MdReplay10/>,
              forward: <MdForward10/> 
            }}
            ref={player}
          />
        </div>
      </div>

    </>
  );
};

AudioPlayerCustom.defaultProps = {
  Track: {},
};


export default AudioPlayerCustom;
