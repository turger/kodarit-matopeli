import {useEffect, useRef} from "react";
/*
Thanks Dan Abramov for useInterval hook
https://overreacted.io/making-setinterval-declarative-with-react-hooks/
This useInterval Hook sets up an interval and clears it after unmounting.
It’s a combo of setInterval and clearInterval tied to the component lifecycle.
*/
export const useInterval = (callback, delay, setIntervalId) => {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(
    () => {
      savedCallback.current = callback;
    },
    [callback]
  );
  // Set up the interval.
  useEffect(
    () => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        setIntervalId(id);
        return () => clearInterval(id);
      }
    },
    [delay, setIntervalId]
  );
};

export const range = (number) => [...Array(Math.round(number)).keys()]
