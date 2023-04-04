import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/vue';
import loadScreen from '../loadScreen.vue';

function renderLoadScreen(bool) {
  return render(loadScreen, {
    props: {
      isLoading: bool,
    },
  });
}

describe('render with different loading states', () => {
  it('loading in progress', () => {
    renderLoadScreen(true);

		expect(screen.queryByTestId('loadingScreen')).toBeInTheDocument();
  });
  it('loading finished', () => {
    renderLoadScreen(false);

    expect(screen.queryByTestId('loadingScreen')).toBeNull();
  });
});
