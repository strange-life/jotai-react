import { StrictMode } from 'react';
import { test } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { atom } from '@madahapa/jotai';
import { StoreProvider } from './StoreProvider';
import { useAtomValue } from './useAtomValue';
import { useSetAtom } from './useSetAtom';

test('useAtomValue basic test', async () => {
  const countAtom = atom(0);

  function Counter() {
    const count = useAtomValue(countAtom);
    const setCount = useSetAtom(countAtom);

    return (
      <button data-testid='dispatch' type='button' onClick={() => setCount(1)}>
        count: {count}
      </button>
    );
  }

  const { findByText, getByTestId } = render(
    <StrictMode>
      <StoreProvider>
        <Counter />
      </StoreProvider>
    </StrictMode>,
  );

  await findByText('count: 0');
  await userEvent.click(getByTestId('dispatch'));
  await findByText('count: 1');
});
