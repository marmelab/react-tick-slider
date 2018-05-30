import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

const InnerSlidebar = styled('div')`
  label: sidebar;
  height: ${({ innerSliderHeight }) => `${innerSliderHeight}px`};
  left: 0;
  position: absolute;
  top: ${({ innerSliderHeight }) => `calc(50% - ${innerSliderHeight / 2}px)`};
  width: 100%;
  will-change: auto;
`;

const computeStyle = completion => `linear-gradient(
    to right,
    ${'yellow'} 0,
    ${'yellow'} ${completion}%,
    ${'grey'} ${completion}%,
    ${'grey'} 100%
) no-repeat`;

const Slidebar = ({ completion }) => (
  <InnerSlidebar
    style={{
      background: computeStyle(completion),
    }}
    innerSliderHeight={2}
  />
);

Slidebar.propTypes = {
  completion: PropTypes.number,
};

Slidebar.defaultProps = {
  completion: 0,
};

export default Slidebar;
