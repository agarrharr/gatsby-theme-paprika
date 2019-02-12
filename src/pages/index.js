import React from 'react';
import { graphql } from 'gatsby';

export default ({ data }) =>
  data.allRecipesJson.edges.map(({ node }) => (
    <div key={node.id}>{node.name}</div>
  ));

export const query = graphql`
  query indexQuery {
    allRecipesJson {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
