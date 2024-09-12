import { type ReactNode, createContext, useContext, useRef } from 'react';
import { type Store, createStore } from '@madahapa/jotai';

const StoreContext = createContext<Store | undefined>(undefined);

export function useStore(): Store {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('useStore can only be used in a StoreProvider tree');
  }

  return store;
}

type StoreProviderProps = {
  store?: Store;
  children?: ReactNode;
};

export function StoreProvider({ store, children }: StoreProviderProps) {
  const storeRef = useRef<Store>(undefined);
  if (!store && !storeRef.current) {
    storeRef.current = createStore();
  }

  return (
    <StoreContext.Provider value={store ?? storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
}
