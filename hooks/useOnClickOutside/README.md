# 🎣 React Hook: useOnClickOutside
This React hook provides a mechanism to detect clicks that occur outside of a specified DOM element. It is particularly useful for scenarios such as closing a modal when clicking outside of it or hiding a dropdown menu when clicking elsewhere on the page.

## 📚Contents

- [🔧 Usage](#usage)
  - [💡 Example](#example)
  - [🧩 Parameters](#parameters)
  - [📨 Return Value](#return-value)
  - [📝 Notes](#notes)
- [🔦 Code](#code)
- [🙏 Credits](#credits)

## 🔧Usage
### 💡Example
```
import React, { useRef } from "react";
import { useOnClickOutside } from "./useOnClickOutside";

function Modal({ onClose }) {
    const modalRef = useRef(null);
    useOnClickOutside(modalRef, onClose);

    return (
        <div ref={modalRef}>
            {/* Modal content */}
        </div>
    );
};
```
In this example, the useOnClickOutside hook is used to detect clicks outside of the modal content, triggering the onClose function when such a click occurs.

### 🧩Parameters
* ref (RefObject): A reference to the DOM element that you want to monitor clicks outside of.
* handler (function): A function to be called when a click occurs outside of the referenced DOM element.

### 📨Return value
This hook does not return any value directly. Instead, it sets up event listeners to detect clicks outside of the specified DOM element. Optionally, you can return a cleanup function if needed.

### 📝Notes
This hook listens for both mouse clicks (mousedown) and touch events (touchstart), ensuring compatibility across various devices.
Ensure that the ref passed to the hook refers to a valid DOM element. If the ref is null, the hook won't have any effect.
The handler function passed to the hook will be called whenever a click occurs outside of the referenced DOM element.

## 🔦Code
Go to [source code](./useOnClickOutside.js) 
<br><br>
OR
<details>
<summary>Show code</summary>

### Full Code

```jsx
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

```
</details>

## 🙏Credits
Developed by Berat Vıcıl beratvicil@gmail.com

License This code is released under the MIT License.