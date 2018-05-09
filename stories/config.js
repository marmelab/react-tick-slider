import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/hello');
}

configure(loadStories, module);
