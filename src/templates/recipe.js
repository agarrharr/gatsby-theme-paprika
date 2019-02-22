import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from '@emotion/styled';

import Rating from '../components/rating';
import * as COLORS from '../colors';

const RecipeContainer = styled.div`
  font-family: sans-serif;
  a {
    color: ${COLORS.blue};
  }
`;

const RecipeHeader = styled.div`
  display: flex;
  width: 100%;
`;

const RecipeTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: normal;
`;

const RecipeDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;

const RecipeCategories = styled.small`
  color: ${COLORS.grey};
  font-weight: lighter;
`;

export default ({ data }) => {
  const recipe = data.recipesJson;
  const recipeImage = data.recipeImage;

  return (
    <RecipeContainer>
      <RecipeHeader>
        {recipeImage && (
          <Img fixed={recipeImage.childImageSharp.fixed} alt={recipe.name} />
        )}
        <RecipeDetails>
          <RecipeTitle>{recipe.name}</RecipeTitle>
          <Rating rating={recipe.rating} />
          <RecipeCategories>
            {recipe.categories.map((category, i) => (
              <span key={category.uid}>
                {category.name}
                {i !== recipe.categories.length - 1 ? ', ' : null}
              </span>
            ))}
          </RecipeCategories>
          <a href={recipe.source_url}>
            <span>{recipe.source}</span>
          </a>
        </RecipeDetails>
      </RecipeHeader>
      <div>
        <div>
          <h3>Ingredients</h3>
          <div>
            {recipe.ingredients.split('\n').map((ingredient, i) => (
              <p key={i}>{ingredient}</p>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h3>Directions</h3>
        <div>
          {recipe.directions.split('\n').map((direction, i) => (
            <p key={i}>{direction}</p>
          ))}
        </div>
      </div>
    </RecipeContainer>
  );
};

export const query = graphql`
  query RecipeQuery($id: String!, $imagePath: String!) {
    recipesJson(id: { eq: $id }) {
      id
      rating
      photo_hash
      on_favorites
      photo
      uid
      scale
      ingredients
      is_pinned
      source
      total_time
      hash
      description
      source_url
      difficulty
      in_trash
      directions
      categories {
        uid
        name
      }
      photo_url
      cook_time
      name
      created
      notes
      photo_large
      image_url
      prep_time
      servings
      nutritional_info
      fields {
        slug
      }
    }
    recipeImage: file(relativePath: { eq: $imagePath }) {
      childImageSharp {
        fixed(width: 140, height: 140) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
