import { useEffect } from 'react';
import { test, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { atom } from '@madahapa/jotai';
import { StoreProvider } from './StoreProvider';
import { useAtomValue } from './useAtomValue';
import { useSetAtom } from './useSetAtom';

test('useSetAtom does not trigger rerender', async ({ expect }) => {
  const countAtom = atom(0);

  const displayerEffect = vi.fn();
  function Displayer() {
    const count = useAtomValue(countAtom);
    useEffect(() => void displayerEffect());
    return <span>count: {count}</span>;
  }

  const updaterEffect = vi.fn();
  function Updater() {
    const setCount = useSetAtom(countAtom);
    useEffect(() => void updaterEffect());
    return (
      <button
        data-testid='increment'
        type='button'
        onClick={() => setCount((prev) => prev + 1)}
      >
        increment
      </button>
    );
  }

  const { findByText, getByTestId } = render(
    <StoreProvider>
      <Displayer />
      <Updater />
    </StoreProvider>,
  );

  await findByText('count: 0');
  expect(displayerEffect).toHaveBeenCalledTimes(1);
  expect(updaterEffect).toHaveBeenCalledTimes(1);

  await userEvent.click(getByTestId('increment'));

  await findByText('count: 1');
  expect(displayerEffect).toHaveBeenCalledTimes(2);
  expect(updaterEffect).toHaveBeenCalledTimes(1);
});
