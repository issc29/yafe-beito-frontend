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
          <div>
            <h1 className="text-center">FEATURED CLASSES:</h1>
            <h2 className="text-center">New ones every week!</h2>
            <div className="flex justify-center space-x-6 ">
            {data.site.featuredClasses.map((featuredClass) => (
                <button className="bg-bronzetone hover:bg-dark-green-copper text-white font-bold py-2 px-4 w-60 h-24 rounded-[50px]">{featuredClass.title}</button>
            ))}
            </div>
          </div>
        );
      }}
    />
  );
}


