import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import Gallery from "../components/gallery";
import FeaturedClasses from "../components/featured-classes";
import FeaturedNews from "../components/featured-news";
import siteNameIllustration from '../images/site_name_illustration.png'
import bgImage from '../images/contact_bg.jpg'

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    projects: allSanitySampleProject(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          mainImage {
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
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

const IndexPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout bgImage={bgImage}>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
    <Layout bgImage={bgImage}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <div className="flex-col">
          <div className="sm:mx-10 p-10 bg-white/60">
            <h1 hidden>Welcome to {site.title}</h1>
            <img src={siteNameIllustration} className="block w-80 place-content-center m-auto" />
            <h2 className="text-center text-3xl text-white">Hakham Dr. José Faur Studies </h2>
        <Gallery />
        <FeaturedClasses />
        <FeaturedNews />
        </div>
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;
