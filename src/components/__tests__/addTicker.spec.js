// import { describe, it, expect, test } from 'vitest'

import { render } from '@testing-library/vue';
import addTicker from '../addTicker.vue';
// import addButton from '../addButton.vue';

// describe('addButton', () => {
//   it('renders properly', () => {
//     const wrapper = mount(addButton, { props: { msg: 'Hello Vitest' } })
//     expect(wrapper.text()).toContain('Hello Vitest')
//   })
// })
test('render addTicker component', () => {
  const { debug } = render(addTicker, {
    props: {
      tickers: [],
    },
		shallow: true,
  });
  debug();
});
// test('render addButton component', () => {
//   const { debug } = render(addButton);
//   debug();
// });
