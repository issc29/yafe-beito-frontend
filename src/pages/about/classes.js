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
import bgImage from '../../images/donate_bg.jpg'
import { PortableText } from "@portabletext/react";
import { PortableTextCustomizations } from "../../components/portable-text-customizations";

export const query = graphql`
query  {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      aboutClasses {
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
      <SEO title="About Class Library" description={site.description} keywords={site.keywords} />
      <Container>
        <div className="flex-col p-4 text-justify bg-white/90">
          <h1 className="text-center text-dark-blue text-4xl pb-4">About Class Library</h1>
          <div className="text-lg">
            <PortableText value={data.site.aboutClasses} components={PortableTextCustomizations}/>
          </div>
        </div>

      </Container>
    </Layout>
  );
};

export default AboutPage;
