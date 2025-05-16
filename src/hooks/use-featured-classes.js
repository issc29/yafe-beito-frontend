import { graphql, useStaticQuery } from "gatsby";

const query = graphql`
  query {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      featuredClasses {
        title
        url
      }
    }
  }
`;

export const useFeaturedClasses = () => {
  const data = useStaticQuery(query);
  if (!data.site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data'
    );
  }
  return data.site.featuredClasses;
};