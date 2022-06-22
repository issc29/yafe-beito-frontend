import React, { useState } from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Layout from "../containers/layout";
import bgImage from '../images/about_bg.jpg'
import { PlayIcon } from "@heroicons/react/outline";
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayerCustom from "./audioPlayerCustom";

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
        title
        link
        language
        allTags {
          id
          name
        }
      }
    }
  }
}

`;

const ClassesPage = props => {
  const { data, errors } = props;
  const [audioSrc, setAudioSrc] = useState({id: "av"})

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
    <Layout bgImage={bgImage} hideFooter={true}>
      <Container>
        <div className="flex-col">
          {allTracks.edges.map((track) => (
            <div className="bg-dark-blue text-white my-4 flex py-2">
              <div className="flex-none w-20">
                <PlayIcon className="h-20 w-20 text-white hover:text-gray-400" onClick={() => {setAudioSrc(track.node); }} >
                  </PlayIcon>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="text-2xl">{track.node.title}</div>
                <div>{track.node.artist}</div>
                <div>{track.node.dateGiven}</div>
                <div>{track.node.allTags.map((tag) => (
                  <button className="bg-gray-500 hover:bg-gray-400 px-2.5 rounded-lg mx-2">#{tag.name}</button>
                ))}</div>
                
              </div>
             </div>
        
            ))}
            <AudioPlayerCustom Track={audioSrc}/>
        </div>

      </Container>
    </Layout>
  );
};

export default ClassesPage;
