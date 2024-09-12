import { useReducer, useEffect } from 'react';
import type { Atom } from '@madahapa/jotai';
import { useStore } from './StoreProvider';

export function useAtomValue<Value>(atom: Atom<Value>): Value {
  const store = useStore();
  const [value, rerender] = useReducer(
    () => store.get(atom),
    undefined,
    () => store.get(atom),
  );

  useEffect(() => store.subscribe(atom, rerender), [store, atom]);

  return value;
}
