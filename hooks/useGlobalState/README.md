# 🎣 React Hook: useGlobalState
Global state hook is an alternative solution to state management for your React app. Instead of setting up state management in an opinonated way that the current solutions provide like Context API, Redux and Zustand, you have a state hook that you already know how to use.

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
```jsx
import React, { useRef } from "react";
import useGlobalState from "./useGlobalState";

function Parent() {
    const [count, setCount] = useGlobalState("count", 0);

    return (
        <>
            {count}
            <Child/>
        </>
    );
};

function Child() {
    const [count, setCount] = useGlobalState("count");

    return (
        <>
            <button onClick={()=>setCount(count-1)}>-</button>
            <button onClick={()=>setCount(count+1)}>+</button>
        </>
    );
};
```
In this example, the useOnClickOutside hook is used to detect clicks outside of the modal content, triggering the onClose function when such a click occurs.

### 🧩Parameters
* key (string): A globally unique key in your app that represents this state. Used for getting and setting the state to global store.
* defaultValue (any): A function to be called when a click occurs outside of the referenced DOM element.

### 📨Return value
Returns array. Array {0: State Value, 1: State Setter}

### 📝Notes
Key parameter must be unique.

## 🔦Code
Go to [source code](./useGlobalState.js) 
<br><br>
OR
<details>
<summary>Show code</summary>

### Full Code

```jsx
import { useEffect, useState } from "react";

function nanoid(length = 6) {
    const alphabet = "QWERTYUIOPASDFGHJZXCVB";
    return Array(length).fill(null).map(() => {
        return alphabet[Math.floor(Math.random()*alphabet.length)];
    }).join("");
}

const defaultValues = {
    count: 5,
};

const store = {};

Object.entries(defaultValues).forEach(([key, value]) => {
    store[key] = {
        value,
        listeners: {},
    }
})

function setState(key, value) {
    // Update Value
    store[key].value = value;
    // Call listeners
    Object.values(store[key].listeners).forEach((listener) => {
        listener(value);
    });
}

function initKey(key, defaultValue) {
    if (!store[key]) {
        store[key] = {
            value: defaultValue,
            listeners: {}
        }
    }
}

function addStateListener(key, callback) {
    const listenerId = nanoid();

    store[key].listeners[listenerId] = callback;

    return listenerId;
}

function removeStateListener(key, id) {
    delete store[key].listeners[id];
}

/**
 * 
 * @param {*} key 
 * @param {*} defaultValue 
 * @returns {[any, Function]}
 */
export default function useGlobalState(key, defaultValue) {
    // Init key
    initKey(key, defaultValue);

    // Value
    const value = store[key]?.value;

    const [internalState, setInternalState] = useState(value);

    // Listen to state changes 
    useEffect(() => {
        // register state listener
        const listenerId = addStateListener(key, (value)=>{
            console.log("state updated", key)
            setInternalState(value);
        })

        return () => {
            removeStateListener(key, listenerId);
        }
    }, []);
    
    function setter(value) {
        setState(key, value)
    }

    return [internalState, setter];
}
```
</details>

## 🙏Credits
Developed by Berat Vıcıl beratvicil@gmail.com

License This code is released under the MIT License.