import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from '@emotion/styled';

import Rating from '../components/rating';
import * as COLORS from '../colors';

const RecipesContainer = styled.div`
  font-family: sans-serif;
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const RecipeRow = styled.div`
  display: flex;
  height: 70px;
  padding: 5px 0;
  border-bottom: 1px solid ${COLORS.GREY};
`;

const RecipeDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 10px;
`;

const RecipeSource = styled.small`
  color: ${COLORS.GREY};
  font-weight: lighter;
`;

export default ({ data }) => {
  const images = data.allFile.edges.reduce(
    (accum, { node }) => ({
      ...accum,
      [node.relativePath.split('.')[0]]: node,
    }),
    {}
  );

  return (
    <div>
      <RecipesContainer>
        {data.allRecipesJson.edges.map(({ node }) => (
          <Link key={node.uid} to={`/${node.fields.slug}`}>
            <RecipeRow>
              {images[node.uid].childImageSharp && (
                <Img
                  fixed={images[node.uid].childImageSharp.fixed}
                  alt={node.name}
                />
              )}
              <RecipeDetails>
                <div>{node.name}</div>
                <Rating rating={node.rating} />
                <RecipeSource>{node.source}</RecipeSource>
              </RecipeDetails>
            </RecipeRow>
          </Link>
        ))}
      </RecipesContainer>
    </div>
  );
};

export const query = graphql`
  query indexQuery {
    allRecipesJson {
      edges {
        node {
          uid
          name
          rating
          source
          fields {
            slug
          }
        }
      }
    }
    allFile {
      edges {
        node {
          relativePath
          childImageSharp {
            fixed(width: 70, height: 70) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;
