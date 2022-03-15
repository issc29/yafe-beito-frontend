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
          <div className="text-center">
            <h1 className="text-center">Latest News</h1>
            <PortableText value={data.site.latestNews}/>
          </div>
        );
      }}
    />
  );
}
