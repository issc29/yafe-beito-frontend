import React, { useState } from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Layout from "../containers/layout";
import bgImage from '../images/about_bg.jpg'
import { PlayIcon } from "@heroicons/react/outline";
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayerCustom from "./audioPlayerCustom";
import ClassContainer from "../components/ClassContainer";
import Modal from 'react-modal';


import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, RefinementList, CurrentRefinements, HierarchicalMenu, ClearRefinements, Configure, ToggleRefinement, useInstantSearch } from 'react-instantsearch-hooks-web';


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
  const { data, errors } = props;
  const [audioSrc, setAudioSrc] = useState({id: ""})

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
    <Layout bgImage={bgImage} hideFooter={true}>
      <Container>
        <div className="flex-col">
          <h1 className="text-center text-dark-blue text-4xl">Classes</h1>
          <InstantSearch searchClient={searchClient} indexName="Tracks">
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
              <Hits 
                hitComponent={ ({ hit }) => <ClassContainer hit={hit} setAudioSrc={setAudioSrc} />} 
                classNames={{root:'flex-auto'}} 
              />
      
            </div>
          </InstantSearch>
          <AudioPlayerCustom Track={audioSrc}/>
        </div>
      </Container>
    </Layout>
  );
};

export default ClassesPage;
