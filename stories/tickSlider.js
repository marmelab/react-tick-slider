import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import classnames from 'classnames';
import glamorous from 'glamorous';

import TickSlider from '../src';
import { Circle, Slidebar } from './components';

const rootStyle = {
  borderRadius: 10,
  cursor: 'pointer',
  height: 10,
  outline: 'none',
  padding: '20px 0',
  position: 'relative',
  width: '100%',
};

const Container = glamorous.div({
  padding: '0 20px',
  height: '100%',
});

const CircleContainer = glamorous.div({
  height: '100%',
  left: 0,
  position: 'absolute',
  top: 0,
  width: '100%',
});

const BulletPointContainer = glamorous.div(
  {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
  },
  ({ position, width }) => ({
    width: `${width}%`,
    left: `calc(${position}% - ${width / 2}%)`,
  }),
);

const bulletSize = 10;

export const BulletPoint = glamorous.span({
  backgroundColor: 'grey',
  borderRadius: '50%',
  height: bulletSize,
  outline: 'none',
  width: bulletSize,
});

const values = [{ label: 'label', value: 0 }, { label: 'label1', value: 1 }, { label: 'label2', value: 2 }];

storiesOf('TickSlider', module).add('TickSlider', () => (
  <Container>
    <TickSlider rootStyle={rootStyle} options={values}>
      {({ handleStart, selectedChoice, handleKeyPress, choices }) => (
        <Fragment>
          <Slidebar />
          <CircleContainer onMouseDown={handleStart} onTouchStart={handleStart}>
            {choices.map(choice => (
              <BulletPointContainer
                key={choice.value}
                onKeyPress={handleKeyPress(choice)}
                position={choice.position}
                width={100 / choices.length}
              >
                <BulletPoint
                  aria-label={choice.label}
                  aria-pressed={selectedChoice && selectedChoice.value === choice.value}
                  role="button"
                  tabIndex={0}
                  title={choice.label}
                />
              </BulletPointContainer>
            ))}
            <Circle
              className={classnames({ active: selectedChoice })}
              position={selectedChoice ? selectedChoice.position : 0}
              withTransition
            />
          </CircleContainer>
        </Fragment>
      )}
    </TickSlider>
  </Container>
));
