import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

const circleSize = 20;
const circleBorderSize = 2;

const InnerCircle = glamorous.span({
  label: 'circle',
  backgroundColor: 'black',
  border: `solid ${circleBorderSize}px ${'yellow'}`,
  borderRadius: '50%',
  top: `calc(50% - ${circleSize / 2}px)`,
  maxHeight: circleSize,
  maxWidth: circleSize,
  position: 'absolute',
  height: circleSize,
  width: circleSize,
  '.active': {
    backgroundColor: 'yellow',
  },
});

const computeStyle = (position, withTransition) => {
  const style = {
    left: `calc(${position}% - ${circleSize / 2}px - 2px)`,
  };
  return style;
};

const Circle = ({ position, withTransition, className }) => (
  <InnerCircle className={className} style={computeStyle(position, withTransition)} />
);

Circle.propTypes = {
  className: PropTypes.string,
  position: PropTypes.number,
  withTransition: PropTypes.bool,
};

Circle.defaultProps = {
  className: '',
  position: 0,
  withTransition: false,
};

export default Circle;
