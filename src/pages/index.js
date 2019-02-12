import React from 'react';
import { graphql } from 'gatsby';

export default ({ data }) => (
  <div>
    <h1>Recipes ({data.allRecipesJson.edges.length})</h1>
    <ul>
      {data.allRecipesJson.edges.map(({ node }) => (
        <li key={node.id}>
          <a href={node.fields.slug}>{node.name}</a>
        </li>
      ))}
    </ul>
  </div>
);

export const query = graphql`
  query indexQuery {
    allRecipesJson {
      edges {
        node {
          id
          name
          fields {
            slug
          }
        }
      }
    }
  }
`;
