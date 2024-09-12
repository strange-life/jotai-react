import { useCallback } from 'react';
import type { WritableAtom } from '@madahapa/jotai';
import { useStore } from './StoreProvider';

export type SetAtom<Args extends unknown[]> = (...args: Args) => void;

export function useSetAtom<Value, Args extends unknown[]>(
  atom: WritableAtom<Value, Args>,
): SetAtom<Args> {
  const store = useStore();
  const setAtom = useCallback(
    (...args: Args) => store.set(atom, ...args),
    [store, atom],
  );

  return setAtom;
}
