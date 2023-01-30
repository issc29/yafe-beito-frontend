import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import bgImage from '../images/donate_bg.jpg'
import { PortableText } from "@portabletext/react";

export const query = graphql`
query  {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      booksText {
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

const DonatePage = props => {
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
    <Layout bgImage={bgImage} bgResizable={true}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <div className="flex-col">
          <div className="mx-10 bg-white/75">
            <div className="p-4 text-justify">
              <h1 className="text-center text-dark-blue text-4xl pb-4">Donate</h1>
              <span className="text-lg">We appreciate your support! Soon you will be able to donate to us directly from this page. 
                For information about how you can support us please email: 
                YafeBeito@Gmail.com
                (All donations made are 501C3 tax deductible)
                </span>
              </div>
          </div>
        </div>

      </Container>
    </Layout>
  );
};

export default DonatePage;
