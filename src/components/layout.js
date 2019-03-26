import React from 'react';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';

export default ({ children }) => (
  <div>
    <Global
      styles={css`
        body {
          margin: 0;
          box-sizing: border-box;
          font-family: sans-serif;
        }

        html {
          box-sizing: border-box;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
      `}
    />
    {children}
  </div>
);
