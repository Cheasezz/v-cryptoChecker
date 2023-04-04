import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/vue';
import addButton from '../addButton.vue';

function renderAddButton(isDisabled) {
  return render(addButton, {
    props: {
      disabled: isDisabled,
    },
  });
}

describe('different disabled attribute', () => {
  it('without disabled', () => {
    renderAddButton(false);
    
    expect(screen.getByRole('button')).toBeEnabled();
  });

  it('with disabled', () => {
    renderAddButton(true);

    expect(screen.getByRole('button')).toBeDisabled();
  });
	
});
