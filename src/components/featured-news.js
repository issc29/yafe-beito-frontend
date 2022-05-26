import { Link } from "gatsby";
import React from "react";
import { PortableText } from "@portabletext/react";
import { graphql, StaticQuery } from "gatsby";

const query = graphql`
query  {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      latestNews {
        children {
          text
          marks
          _key
          _type
        }
        _type
        _key
      }
      _rawLatestNews
    }	
  }
`;

export default function FeaturedNews() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data'
          );
        }

        return (
          <div className="text-center text-dark-blue">
           <hr className="border-2 border-dark-blue mx-auto w-1/2 mb-4" />
            <div className="text-center text-5xl">Latest News</div>
            <PortableText value={data.site["_rawLatestNews"]}/>
          </div>
        );
      }}
    />
  );
}
