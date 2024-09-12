# @madahapa/jotai-react

React integration for @madahapa/jotai, made for fun and for my own use.

```tsx
import {
  StoreProvider,
  atom,
  useAtom,
  useAtomValue,
  useSetAtom,
} from "@madahapa/jotai-react";

const countAtom = atom(0);

function Displayer() {
  const count = useAtomValue(countAtom);
  // const [count, setCount] = useAtom(countAtom);
  return <span>count: {count}</span>;
}

function Updater() {
  const setCount = useSetAtom(countAtom);
  // const [count, setCount] = useAtom(countAtom);
  return (
    <button onClick={() => setCount((prev) => prev + 1)}>increment</button>
  );
}

function App() {
  return (
    <StoreProvider>
      <Displayer />
      <Updater />
    </StoreProvider>
  );
}
```
