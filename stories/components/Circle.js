import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

const InnerCircle = styled('div')`
  label: circle;
  background-color: ${({ active }) => (active ? `yellow` : `black`)};
  border: ${({ circleBorderSize }) => `solid ${circleBorderSize}px ${'yellow'}`};
  border-radius: 50%;
  top: ${({ circleSize }) => `calc(50% - ${circleSize / 2}px)`};
  max-height: ${({ circleSize }) => `${circleSize}px`};
  max-width: ${({ circleSize }) => `${circleSize}px`};
  height: ${({ circleSize }) => `${circleSize}px`};
  width: ${({ circleSize }) => `${circleSize}px`};
  position: absolute;
`;

const computeStyle = (circleSize, position, withTransition) => {
  const style = {
    left: `calc(${position}% - ${circleSize / 2}px - 2px)`,
  };
  if (withTransition) {
    style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    style.transform = 'translateZ(0)';
  }
  return style;
};

const Circle = ({ position, withTransition, active }) => (
  <InnerCircle
    active={active}
    style={computeStyle(20, position, withTransition)}
    circleSize={20}
    circleBorderSize={2}
  />
);

Circle.propTypes = {
  active: PropTypes.bool,
  position: PropTypes.number,
  withTransition: PropTypes.bool,
};

Circle.defaultProps = {
  active: false,
  position: 0,
  withTransition: false,
};

export default Circle;
