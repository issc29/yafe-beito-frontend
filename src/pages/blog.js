import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import { SEO } from "../components/seo"
import Layout from "../components/layout";
import bgImage from '../images/about_bg.jpg'
import { PortableText } from "@portabletext/react";
import { PortableTextCustomizations } from "../components/portable-text-customizations";

export const query = graphql`
query  {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
    }	
  }
`;

const BlogPage = props => {
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
      <Container>
        <div className="flex-col p-4 text-justify bg-white/90">
          <h1 className="text-center text-dark-blue text-4xl pb-4">Blog</h1>
          <div className="text-lg">
            <p className="text-center text-gray-600">Blog content coming soon...</p>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default BlogPage;

export const Head = () => (
  <SEO />
)
