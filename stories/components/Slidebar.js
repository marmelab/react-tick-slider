import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

const innerSliderHeight = 2;
const InnerSlidebar = glamorous.div({
  label: 'slidebar',
  backgroundColor: 'grey',
  height: innerSliderHeight,
  left: 0,
  position: 'absolute',
  top: `calc(50% - ${innerSliderHeight / 2}px)`,
  width: '100%',
  willChange: 'auto',
});

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
  />
);

Slidebar.propTypes = {
  completion: PropTypes.number,
};

Slidebar.defaultProps = {
  completion: 0,
};

export default Slidebar;
