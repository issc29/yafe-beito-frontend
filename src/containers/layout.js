import { graphql, useStaticQuery } from "gatsby";
import React, { useState } from "react";
import Layout from "../components/layout";

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title,
      logo {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          _id
        }
        alt
      }
    }
  }
`;

function LayoutContainer(props) {
  const data = useStaticQuery(query);
  
  if (!data.site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data'
    );
  }
  
  return (
    <Layout
      {...props}
      logo={data.site.logo}
    />
  );
}

export default LayoutContainer;
