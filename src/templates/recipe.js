import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

export default ({ data }) => {
  const recipe = data.recipesJson;
  const recipeImage = data.recipeImage;

  return (
    <div className="recipe" itemScope="" itemType="http://schema.org/Recipe">
      <div className="infobox">
        <div className="photobox">
          {recipeImage && (
            <Img fixed={recipeImage.childImageSharp.fixed} alt={recipe.name} />
          )}
        </div>
        <h1 itemProp="name" className="name">
          {recipe.name}
        </h1>
        <p itemProp="aggregateRating" className="rating" value={recipe.rating}>
          {'★'.repeat(recipe.rating)}
        </p>
        <p itemProp="recipeCategory" className="categories">
          {recipe.categories.map((category, i) => (
            <span key={category.uid}>
              {category.name}
              {i !== recipe.categories.length - 1 ? ', ' : null}
            </span>
          ))}
        </p>
        <p className="metadata">
          <b>Source: </b>
          <a itemProp="url" href={recipe.source_url}>
            <span itemProp="author">{recipe.source}</span>
          </a>
        </p>
        <div className="clear" />
      </div>
      <div className="columnbox">
        <div className="ingredientsbox">
          <h3 className="subhead">Ingredients</h3>
          <div className="ingredients text">
            {recipe.ingredients.split('\n').map((ingredient, i) => (
              <p key={i} className="line" itemProp="recipeIngredient">
                {ingredient}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="directionsbox">
        <h3 className="subhead">Directions</h3>
        <div itemProp="recipeInstructions" className="directions text">
          {recipe.directions.split('\n').map((direction, i) => (
            <p key={i} className="line">
              {direction}
            </p>
          ))}
        </div>
      </div>
    </div>
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
        fixed(width: 280, height: 280) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
