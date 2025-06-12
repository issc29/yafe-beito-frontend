import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import { SEO } from "../components/seo"
import Layout from "../components/layout";
import bgImage from '../images/donate_bg.jpg'
import { PortableText } from "@portabletext/react";
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { PortableTextCustomizations } from "../components/portable-text-customizations";

export const query = graphql`
query  {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      _rawDonate
      donateLink
    }	
  }
`;

const DonatePage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout bgImage={bgImage}>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
    <Layout bgImage={bgImage}>
      <Container>
        <div className="flex-col">
          <div className="sm:mx-10 bg-white/90">
            <div className="p-4 text-justify">
              <h1 className="text-center text-dark-blue text-4xl pb-4">Help Support Yafe Be'ito's Mission</h1>
              <div className="flex justify-center">
                <button 
                    className="bg-dark-blue text-lg text-white hover:bg-white hover:text-dark-blue font-bold py-5 sm:py-2 px-4 w-full sm:w-3/4 h-auto sm:h-16 rounded-md my-4"
                    key="Donate"
                    onClick={() => {
                      window.open(data.site.donateLink, "_blank");
                    }}
                  >
                  <span className="inline">Donate <ArrowLongRightIcon className="inline h-6 w-6" /></span> 
                  </button>
                </div>
              <div className="text-lg"> 
                <PortableText value={data.site["_rawDonate"]} components={PortableTextCustomizations}/>
                
                </div>
              </div>
          </div>
        </div>

      </Container>
    </Layout>
  );
};

export default DonatePage;

export const Head = () => (
  <SEO />
)
