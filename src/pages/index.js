import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from '@emotion/styled';

import Rating from '../components/rating';
import * as COLORS from '../colors';

const Input = styled.input`
  height: 24px;
  width: calc(100% - 12px);
  margin-bottom: 10px;
  padding: 6px;
  font-size: 1em;
  background-color: #eee;
  border: none;
  border-radius: 4px;
`;

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

class Index extends React.Component {
  state = {
    searchText: '',
  };

  handleSearchTextChange = searchText => {
    this.setState(state => ({
      ...state,
      searchText,
    }));
  };

  render() {
    const { searchText } = this.state;
    const { data } = this.props;

    const images = data.allFile.edges.reduce(
      (accum, { node }) => ({
        ...accum,
        [node.relativePath.split('.')[0]]: node,
      }),
      {}
    );

    const recipes = data.allRecipesJson.edges
      .map(({ node }) => node)
      .filter(
        recipe =>
          searchText === '' ||
          recipe.name.toUpperCase().includes(searchText.toUpperCase())
      );

    return (
      <RecipesContainer>
        <div>
          <Input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={e => this.handleSearchTextChange(e.target.value)}
          />
        </div>
        {recipes.length ? (
          recipes.map(recipe => (
            <Link key={recipe.uid} to={`/${recipe.fields.slug}`}>
              <RecipeRow>
                {images[recipe.uid] && images[recipe.uid].childImageSharp && (
                  <Img
                    fixed={images[recipe.uid].childImageSharp.fixed}
                    alt={recipe.name}
                    style={{ flexShrink: 0 }}
                  />
                )}
                <RecipeDetails>
                  <div>{recipe.name}</div>
                  <Rating rating={recipe.rating} />
                  <RecipeSource>{recipe.source}</RecipeSource>
                </RecipeDetails>
              </RecipeRow>
            </Link>
          ))
        ) : (
          <div>No recipes found</div>
        )}
      </RecipesContainer>
    );
  }
}

export default Index;

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
