import { render, fireEvent } from '@testing-library/vue'
import Component from './AtBadge.vue'

test('renders component correctly', async () => {
  // The render method returns a collection of utilities to query your component.
  const { getByText } = render(Component, {
      type: "primary"
  });
  
  getByText('primary')
})