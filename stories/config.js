import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/tickSlider');
}

configure(loadStories, module);
