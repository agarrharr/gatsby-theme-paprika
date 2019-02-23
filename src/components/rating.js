import React from 'react';
import styled from '@emotion/styled';

import * as COLORS from '../colors';

const Yellow = styled.span`
  color: ${COLORS.YELLOW};
`;
const Grey = styled.span`
  color: ${COLORS.GREY2};
`;

const Rating = ({ rating }) => (
  <div>
    <Yellow value={rating}>{'★'.repeat(rating)}</Yellow>
    <Grey value={5 - rating}>{'★'.repeat(5 - rating)}</Grey>
  </div>
);

export default Rating;
