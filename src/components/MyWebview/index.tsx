import { h, render, FunctionalComponent } from "preact";
import { useState, useCallback } from "preact/hooks";

const App: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((_count) => _count + 1), []);
  const decrement = useCallback(() => setCount((_count) => _count - 1), []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

const parent = document.getElementById("app");
if (parent) {
  render(<App />, parent);
}
