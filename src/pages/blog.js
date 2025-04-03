import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import bgImage from '../images/about_bg.jpg'
import { PortableText } from "@portabletext/react";
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'

export const query = graphql`
query  {
  projects: allSanityBlogArticles(
    limit: 6
    sort: {publishedAt: DESC}
    filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
  ) {
    edges {
      node {
        id
        title
        slug {
          current
        }
        body {
          children {
            text
            marks
            _key
            _type
          }
          _type
          _key
        }
        _rawBody
      }
    }
  }
}
`;

const serializers = {
  types: {
    youtube: ({value}) => {
      const { url } = value
      const id = getYouTubeId(url)
      return (<YouTube videoId={id} className="m-auto" />)
    }
  }
}



const BlogPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout bgImage={bgImage}>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).projects;

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
          <div className="mx-10 bg-white/75">
            <h1 className="text-center text-dark-blue text-4xl">Blog</h1>
            {data.projects.edges.map((blog) => (
              <div className="text-center m-2 bg-dark-blue/20 border-dark-blue border-4">
                <h2 className="text-center text-2xl">{blog.node['title']}</h2>
                <PortableText value={blog.node['_rawBody']} components={serializers}/>
              </div>
              
            ))}
            
          </div>
        </div>

      </Container>
    </Layout>
  );
};

export default BlogPage;
