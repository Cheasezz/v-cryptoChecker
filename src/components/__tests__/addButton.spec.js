import { render } from '@testing-library/vue';
import { expect, test } from 'vitest';
import addButton from '../addButton.vue';

function renderAddButton(disabled){
	return render(addButton, {
    props: {
      disabled: disabled,
    },
  });
}

test('addButton without disabled ', () => {
  const { getByRole, debug } = renderAddButton(false)
  const button = getByRole('button');
	// console.log(button.options);
	// console.log(button.attributes.disabled);
	// debug()
  expect(button.disabled).toBeFalsy();
});

test('addButton with disabled', () => {
  const { getByRole } = renderAddButton(true)
  const button = getByRole('button');

  expect(button.disabled).toBeTruthy();
});
