import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Layout from "../containers/layout";
import bgImage from '../images/contact_bg.jpg'
import { PlayIcon } from "@heroicons/react/outline";
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayerCustom from "./audioPlayerCustom";
import ClassContainer from "../components/ClassContainer";
import Modal from 'react-modal';
import { useCookies } from 'react-cookie';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, RefinementList, CurrentRefinements, HierarchicalMenu, ClearRefinements, Configure, ToggleRefinement, useInstantSearch, Pagination } from 'react-instantsearch-hooks-web';


const searchClient = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY);


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
  const algoliaIndex = (process.env.ALGOLIA_INDEX) ?  process.env.ALGOLIA_INDEX : `Tracks_DEV`

  useEffect(() => {
    var audioData = ("audioData" in cookies) ? cookies.audioData : "{}"
    setAudioSrc(audioData)
  }, [])


  useEffect(() => {
    setCookie('audioData', audioSrc)
  }, [audioSrc])

  useEffect(() => {
    setCookie('time',Math.floor(audioTime))
    var modifiedAudioSrc = JSON.parse(JSON.stringify(audioSrc))
    modifiedAudioSrc.linkWithTime = modifiedAudioSrc.link + "#t=" + audioTime
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

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

  const player = React.useRef(null);

  return (
    <Layout bgImage={bgImage} hideFooter={true} bgResizable={true}>
      <Container>
        <div className="flex-col">
          <div className="mx-10 p-3 bg-white/75">
            <h1 className="text-center text-dark-blue text-4xl">Classes</h1>
            <InstantSearch searchClient={searchClient} indexName={algoliaIndex} routing={true}>
              <button className="sm:hidden bg-dark-blue text-lg text-white hover:bg-white hover:text-dark-blue font-bold py-2 px-4 w-full h-10 rounded-md">Filters</button>
                {/*<Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel="Example Modal"
                >
                    <HierarchicalMenu
                    attributes={[
                      'categories.level0',
                      'categories.level1',
                      'categories.level2',
                      'categories.level3',
                    ]} 
                    classNames={{
                      root: 'sm:hidden flex-none min-w-[150px] pr-3 my-4',
                      count: 'bg-[#dfe2ee] rounded-lg py-0.5 px-1.5 ml-2',
                      list: 'ml-4 text-gray-700',
                      selectedItem: 'text-dark-blue'
                    }}
                  />
                </Modal>
                  */}
              
              
              
              <HierarchicalMenu
                  attributes={[
                    'categories.level0',
                    'categories.level1',
                    'categories.level2',
                    'categories.level3',
                  ]} 
                  classNames={{
                    root: 'sm:hidden flex-none min-w-[150px] pr-3 my-4',
                    count: 'bg-[#dfe2ee] rounded-lg py-0.5 px-1.5 ml-2',
                    list: 'ml-4 text-gray-700',
                    selectedItem: 'text-dark-blue'
                  }}
                />

              <SearchBox classNames={{
                root:'w-full relative whitespace-nowrap ', 
                input: 'w-full py-2 px-4 shadow rounded', 
                submitIcon:'fill-dark-blue w-3.5 h-3.5', 
                submit:'absolute m-3.5 right-0',
                resetIcon: 'fill-rose-500 w-3.5 h-3.5',
                reset: 'right-8 absolute m-3.5'}} 
                placeholder="Search Classes"
                />
              <CurrentRefinements 
                  classNames={{
                    root: 'flex min-h-[36px]',
                    item:'bg-dark-blue rounded-md pr-1.5 m-1.5 text-white flex px-1.5',
                    label: 'pr-1.5',
                    delete: 'pl-1.5'
                  }}
                  transformItems={(items) => {

                    return items.map((item) => {item.label="Category"; return item})
                    }}
                />
              <div className="flex">
                <HierarchicalMenu
                  attributes={[
                    'categories.level0',
                    'categories.level1',
                    'categories.level2',
                    'categories.level3',
                  ]} 
                  classNames={{
                    root: 'hidden sm:flex flex-none min-w-[150px] pr-3 my-4',
                    count: 'bg-[#dfe2ee] rounded-lg py-0.5 px-1.5 ml-2',
                    list: 'ml-4 text-gray-700',
                    selectedItem: 'text-dark-blue'
                  }}
                />
                <div>
                  <Hits 
                    hitComponent={ ({ hit }) => <ClassContainer hit={hit} setAudioSrc={setAudioSrc} algoliaIndex={algoliaIndex} setPlay={setPlay}/>} 
                    classNames={{root:'flex-auto'}} 
                  />
                  <Pagination 
                    classNames={{
                      root: 'text-dark-blue leading-none',
                      list: 'flex justify-center',
                      item: 'mx-0.5 py-1.5 rounded hover:bg-gray-400 hover:text-white' ,
                      selectedItem: 'bg-dark-blue text-white',
                      link: 'cursor-pointer py-1.5 px-3 ',
                    }}
                  />
                </div>
              </div>
            </InstantSearch>
            <AudioPlayerCustom Track={audioSrc} setAudioTime={setAudioTime} play={play} setPlay={setPlay}/>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default ClassesPage;
