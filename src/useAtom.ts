import type { WritableAtom } from '@madahapa/jotai';
import { useAtomValue } from './useAtomValue';
import { type SetAtom, useSetAtom } from './useSetAtom';

export function useAtom<Value, Args extends unknown[]>(
  atom: WritableAtom<Value, Args>,
): [Value, SetAtom<Args>] {
  return [useAtomValue(atom), useSetAtom(atom)];
}
