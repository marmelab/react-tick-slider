import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
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

storiesOf('TickSlider', module).add('Complete', () => {
  const store = new Store({
    value: 2,
    options: [
      {
        label: 'value 1',
        value: 1,
      },
      {
        label: 'value 2',
        value: 2,
      },
      {
        label: 'value 3',
        value: 3,
      },
    ],
  });

  const handleKeyPress = (selectChoice, choice) => e => {
    if (e.key === 'Enter') {
      selectChoice(choice);
    }
  };

  const handleValueChange = value => {
    action('Value changed')(value);
    store.set({ value });
  };

  return (
    <State store={store}>
      <Container>
        <TickSlider
          rootStyle={rootStyle}
          options={store.get('options')}
          value={store.get('value')}
          onValueChange={handleValueChange}
        >
          {({ choices, selectedChoice, selectChoice }) => (
            <Fragment>
              <Slidebar />
              <CircleContainer>
                {choices.map(choice => (
                  <BulletPointContainer
                    key={choice.value}
                    onKeyPress={handleKeyPress(selectChoice, choice)}
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
    </State>
  );
});
