import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Layout from "../components/layout";
import bgImage from '../images/contact_bg.jpg'
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayerCustom from "../components/audioPlayerCustom";
import { useCookies } from 'react-cookie';
import ClassSearch from "../components/ClassSearch";


export const query = graphql`
{
  tracks: allSanityAudioTracks {
    edges {
      node {
        artist
        dateGiven
        description
        id
        tapeSide
        tapeNumber
        title
        link
        language
        allTags {
          id
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

`;

const ClassesPage = props => {
  const [cookies, setCookie, removeCookie] = useCookies(['yafe-beito']);
  const { data, errors } = props;
  const [audioSrc, setAudioSrc] = useState({id: ""})
  const [audioTime, setAudioTime] = useState(0)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    var audioData = ("audioData" in cookies) ? cookies.audioData : "{}"
    setAudioSrc(audioData)
  }, [])


  useEffect(() => {
    setCookie('audioData', audioSrc)
  }, [audioSrc])

  useEffect(() => {
    setCookie('time',Math.floor(audioTime))
    var modifiedAudioSrc = {
      ...audioSrc,
      linkWithTime: audioSrc.link + "#t=" + audioTime
    }
    setCookie('audioData', modifiedAudioSrc)
  }, [audioTime])



  if (errors) {
    return (
      <Layout bgImage={bgImage}>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const allTracks = (data || {}).tracks;

  if (!allTracks) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const player = React.useRef(null);

  return (
    <Layout bgImage={bgImage} hideFooter={true} bgFixed={true}>
      <Container>
        <div className="flex-col">
          <div className="sm:mx-10 p-3 bg-white/75">
            <h1 className="text-center text-dark-blue text-4xl">Class Library</h1>
            <ClassSearch setAudioSrc={setAudioSrc} setPlay={setPlay} />
            <AudioPlayerCustom Track={audioSrc} setAudioTime={setAudioTime} play={play} setPlay={setPlay}/>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default ClassesPage;
