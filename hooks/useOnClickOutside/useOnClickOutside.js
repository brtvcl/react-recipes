import { useEffect } from "react/hooks";

/**
 * Hook to detect clicks occurring outside of a specified DOM element.
 * @param {React.MutableRefObject} ref - Reference to the DOM element to monitor clicks outside of.
 * @param {function} handler - Function to be called when a click occurs outside of the referenced DOM element.
 */
function useOnClickOutside(ref, handler) {
    /**
     * Event listener function to handle click events.
     * @param {MouseEvent | TouchEvent} event - The event object representing the click.
     */
    const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
            return;
        }
        // If clicked outside call handler
        handler(event);
    };

    useEffect(() => {
        // Add event listeners for mouse click and touch events
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        
        // Remove event listeners when component unmounts
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);

};

export default useOnClickOutside;
