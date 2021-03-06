import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from '@emotion/styled';

import Layout from '../components/layout';
import Rating from '../components/rating';
import * as COLORS from '../colors';

const RecipeContainer = styled.div`
  font-family: sans-serif;
  a {
    color: ${COLORS.BLUE};
  }
`;

const Columns = styled.div`
  display: flex;
`;

const Column = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  padding: 20px;
  font-weight: 300;
  line-height: 1.5em;

  @media (max-width: 600px) {
    & {
      display: ${({ show }) => (show ? 'block' : 'none')};
    }
  }
`;

const ColumnTitle = styled.h3`
  display: block;

  @media (max-width: 600px) {
    & {
      display: none;
    }
  }
`;

const SubTitle = styled.h4`
  color: red;
  font-weight: 400;
`;

const Ingredient = styled.div`
  padding: 10px 0;
  color: ${({ done }) => (done ? COLORS.GREY : 'inherit')};
  text-decoration: ${({ done }) => (done ? 'line-through' : 'inherit')};
  cursor: pointer;
`;

const Direction = styled.div`
  margin: 0 -10px;
  padding: 10px 10px;
  background-color: ${({ active }) => (active ? COLORS.LIGHT_GREY : 'inherit')};
  border-radius: 5px;
  cursor: pointer;
`;

const RecipeHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
`;

const Tabs = styled.div`
  display: flex;
  width: 100%;
  background: ${COLORS.LIGHT_GREY};
  color: ${COLORS.GREY};

  @media (min-width: 601px) {
    & {
      display: none;
    }
  }
`;

const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  flex-grow: 1;
  flex-basis: 0;
  cursor: pointer;
  color: ${({ active }) => (active ? 'red' : 'inherit')};
  border-bottom: ${({ active }) => (active ? '1px solid red' : 'inherit')};
`;

const RecipeTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: normal;
`;

const RecipeDetails = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const RecipeServings = styled.div`
  font-weight: lighter;

  span {
    font-weight: 500;
  }
`;

const RecipeMetaData = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;

  & * {
    margin: 4px 0;
  }
`;

const RecipeCategories = styled.small`
  color: ${COLORS.GREY};
  font-weight: lighter;
`;

const getIngredientWithoutNumber = ingredient => {
  const firstPart = ingredient.split(' ')[0];
  return Number(firstPart[0])
    ? ingredient
        .split(' ')
        .splice(1)
        .join(' ')
    : ingredient;
};

const getIngredientNumber = ingredient => {
  const firstPart = ingredient.split(' ')[0];
  return Number(firstPart[0]) ? firstPart : '';
};

class Recipe extends React.Component {
  state = {
    showIngredients: true,
    directionStep: -1,
    completedIngredients: [],
  };

  handleSwitchTabs = showIngredients => {
    this.setState(state => ({
      ...state,
      showIngredients,
    }));
  };

  handleDirectionClick = i => {
    this.setState(state => ({
      ...state,
      directionStep: i,
    }));
  };

  handleIngredientClick = i => {
    this.setState(state => ({
      ...state,
      completedIngredients: this.state.completedIngredients.includes(i)
        ? this.state.completedIngredients.filter(ingredient => ingredient !== i)
        : [...this.state.completedIngredients, i],
    }));
  };

  render() {
    const recipe = this.props.data.recipesJson;
    const recipeImage = this.props.data.recipeImage;

    return (
      <Layout>
        <RecipeContainer>
          <RecipeHeader>
            <RecipeTitle>{recipe.name}</RecipeTitle>
            <RecipeDetails>
              {recipeImage && (
                <Img
                  fixed={recipeImage.childImageSharp.fixed}
                  alt={recipe.name}
                />
              )}
              <RecipeMetaData>
                <Rating rating={recipe.rating} />
                <RecipeCategories>
                  {recipe.categories.length ? (
                    recipe.categories.map((category, i) => (
                      <span key={category.uid}>
                        {category.name}
                        {i !== recipe.categories.length - 1 ? ', ' : null}
                      </span>
                    ))
                  ) : (
                    <span>Uncategorized</span>
                  )}
                </RecipeCategories>
                <a href={recipe.source_url}>
                  <span>{recipe.source}</span>
                </a>
              </RecipeMetaData>
            </RecipeDetails>
            {recipe.servings && (
              <RecipeServings>
                <span>Servings</span> {recipe.servings}
              </RecipeServings>
            )}
          </RecipeHeader>
          <Tabs>
            <Tab
              active={this.state.showIngredients}
              onClick={() => this.handleSwitchTabs(true)}
            >
              Ingredients
            </Tab>
            <Tab
              active={!this.state.showIngredients}
              onClick={() => this.handleSwitchTabs(false)}
            >
              Directions
            </Tab>
          </Tabs>
          <Columns>
            <Column show={this.state.showIngredients}>
              <ColumnTitle>Ingredients</ColumnTitle>
              {recipe.ingredients.split('\n').map((ingredient, i) => (
                <Ingredient
                  key={i}
                  done={this.state.completedIngredients.includes(i)}
                  onClick={() => this.handleIngredientClick(i)}
                >
                  <b>{getIngredientNumber(ingredient)}</b>{' '}
                  {getIngredientWithoutNumber(ingredient)}
                </Ingredient>
              ))}
              {recipe.nutritional_info && (
                <div>
                  <SubTitle>Nutrition</SubTitle>
                  {recipe.nutritional_info}
                </div>
              )}
            </Column>
            <Column show={!this.state.showIngredients}>
              <ColumnTitle>Directions</ColumnTitle>
              <div>
                {recipe.directions
                  .split('\n')
                  .filter(d => d !== '')
                  .map((direction, i) => (
                    <Direction
                      key={i}
                      active={this.state.directionStep === i}
                      onClick={() => this.handleDirectionClick(i)}
                    >
                      {direction}
                    </Direction>
                  ))}
              </div>
              {recipe.notes && (
                <div>
                  <SubTitle>Notes</SubTitle>
                  {recipe.notes}
                </div>
              )}
            </Column>
          </Columns>
        </RecipeContainer>
      </Layout>
    );
  }
}

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

export default Recipe;
