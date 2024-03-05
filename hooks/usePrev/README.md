# 🎣 React Hook: usePrev

## 📚 Contents

- [🔧 Usage](#usage)
  - [🧩 Parameters](#parameters)
  - [📨 Return Value](#return-value)
- [🔦 Code](#code)
- [🙏 Credits](#credits)

## 🔧 Usage
```jsx
import React, { useState } from "react";
import usePrev from "./usePrev";

function ExampleComponent() {
    const [count, setCount] = useState(0);
    const previousCount = usePrev(count);

    return (
        <div>
            <p>Current Count: {count}</p>
            <p>Previous Count: {previousCount}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}

export default ExampleComponent;

```

## 🧩 Parameters
* value (*): The current value.

## 📨 Return Value
* (*) The previous value.

## 🔦 Code
Go to [source code](./usePrev.js) 
<br><br>
OR
<details>
<summary>Show code</summary>

### Full Code

```jsx
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
```
</details>

## 🙏 Credits
Developed by Berat Vıcıl beratvicil@gmail.com

License This code is released under the MIT License.