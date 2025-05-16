import { graphql, useStaticQuery } from "gatsby";

const query = graphql`
  query {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      gallery {
        images {
          crop {
            _key
            _type
            bottom
            left
            right
            top
          }
          hotspot {
            _key
            _type
            height
            x
            y
            width
          }
          asset {
            _id
            altText
          }
          alt
        }
      }
    }
  }
`;

export const useGallery = () => {
  const data = useStaticQuery(query);
  if (!data.site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data'
    );
  }
  return data.site.gallery;
};