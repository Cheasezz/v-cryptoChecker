import { describe, it, expect, test } from 'vitest'

import { render } from '@testing-library/vue'
import addButton from '../addButton.vue'

// describe('addButton', () => {
//   it('renders properly', () => {
//     const wrapper = mount(addButton, { props: { msg: 'Hello Vitest' } })
//     expect(wrapper.text()).toContain('Hello Vitest')
//   })
// })
test('render add button', ()=> {
	const {debug} = render(addButton)
	debug()
})