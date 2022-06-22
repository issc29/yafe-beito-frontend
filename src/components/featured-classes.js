import { Link } from "gatsby";
import React from "react";
import { graphql, StaticQuery } from "gatsby";

const query = graphql`
query  {
  site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
  featuredClasses {
        title
        url
      }
    }	
}
`;

export default function FeaturedClasses() {
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
          <div className="text-dark-blue my-10">
            <hr className="border-2 border-dark-blue mx-auto w-1/2 mb-4" />
            <div className="text-center text-5xl">FEATURED CLASSES:</div>
            <div className="text-center text-5xl">New ones every week!</div>
            <div className="flex justify-center space-x-6 mt-5">
            {data.site.featuredClasses.map((featuredClass) => (
                <button className="bg-dark-blue text-lg text-white hover:bg-white hover:text-dark-blue font-bold py-2 px-4 w-60 h-24 rounded-md">{featuredClass.title}</button>
            ))}
            </div>
          </div>
        );
      }}
    />
  );
}


