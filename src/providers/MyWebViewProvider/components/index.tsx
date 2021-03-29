import { h, render, FunctionalComponent } from "preact";
import { useState, useCallback } from "preact/hooks";
import styles from "./index.scss";

const App: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((_count) => _count + 1), []);
  const decrement = useCallback(() => setCount((_count) => _count - 1), []);

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>Count: {count}</p>
      <button className={styles.button} onClick={increment}>
        Increment
      </button>
      <button className={styles.button} onClick={decrement}>
        Decrement
      </button>
    </div>
  );
};

const parent = document.getElementById("app");
if (parent) {
  render(<App />, parent);
}
