import React from 'react';
import { storiesOf } from '@storybook/react';

import HelloWorld from '../src';

storiesOf('HelloWorld', module).add('hello', () => <HelloWorld name="Maxime" />);
