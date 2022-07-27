import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../../lib/helpers";
import Container from "../../components/container";
import GraphQLErrorList from "../../components/graphql-error-list";
import ProjectPreviewGrid from "../../components/project-preview-grid";
import SEO from "../../components/seo";
import Layout from "../../containers/layout";
import bgImage from '../../images/about_bg.jpg'
import { PortableText } from "@portabletext/react";

export const query = graphql`
query  {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      aboutHakham {
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

const AboutPage = props => {
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
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <div className="flex-col p-4 text-justify">
          <h1 className="text-center text-dark-blue text-4xl pb-4">About Hakham Dr. José Faur</h1>
          <div className="text-lg">
            <PortableText value={data.site.aboutHakham}/>
          </div>
        </div>

      </Container>
    </Layout>
  );
};

export default AboutPage;
