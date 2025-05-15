import { Link } from "gatsby";
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import BlockContent from "./block-content";

const query = graphql`
query  {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      _rawLatestNews
      displayLatestNews
    }	
  }
`;

export default function FeaturedNews() {
  const data = useStaticQuery(query);
  
  if (!data.site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data'
    );
  }

  return (
    <div className={`text-center text-dark-blue  ${(data.site["displayLatestNews"]) ? '': 'hidden'}`}>
     <hr className="border-2 border-dark-blue mx-auto w-1/2 mb-4" />
      <div className="text-center text-5xl">Latest News</div>
      <BlockContent blocks={data.site["_rawLatestNews"]} />
    </div>
  );
}
