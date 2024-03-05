import { useRef, useEffect } from "react";

/**
 * A React hook that returns the previous value of a given value.
 * @param {*} value - The current value.
 * @returns {*} The previous value.
 */
function usePrev(value) {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [value]); 

    return ref.current;
}

export default usePrev;