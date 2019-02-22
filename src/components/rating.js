import React from 'react';
import styled from '@emotion/styled';

const Star = styled.div`
  color: #fcb513;
`;

const Rating = ({ rating }) => (
  <Star itemProp="aggregateRating" className="rating" value={rating}>
    {'★'.repeat(rating)}
  </Star>
);

export default Rating;
