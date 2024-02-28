# 🎣 React Hook: usePromise

The usePromise hook is a custom React hook designed to simplify the management of asynchronous operations that return promises. It handles common asynchronous patterns such as loading indicators, error handling, and aborting requests. This hook is particularly useful for managing asynchronous data fetching in React applications.

## 📚 Contents

- [🔧 Usage](#usage)
  - [🧩 Parameters](#parameters)
  - [📨 Return Value](#return-value)
  - [⛔ Aborting Requests](#aborting-requests)
  - [💡 Example](#example)
  - [⚠️ Error Handling](#error-handling)
  - [📝 Note](#note)
- [🔦 Code](#code)
- [🙏 Credits](#credits)

## 🔧 Usage
```jsx
import React from 'react';
import usePromise from './usePromise';

function MyComponent() {
    const { data, isLoading, error, run, abort } = usePromise(fetchData);

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && <p>Data: {data}</p>}
            <button onClick={run}>Fetch Data</button>
            <button onClick={abort}>Abort</button>
        </div>
    );
}
```
### 🧩Parameters
* fn: A function that returns a promise. This is the asynchronous operation to be executed.
* options (optional):
    * shouldExecute (default: true): A boolean indicating whether the asynchronous operation should be executed initially.
    * onError (default: ()=>undefined): A callback function invoked when an error occurs during the execution of the asynchronous operation.
    * onSuccess (default: ()=>undefined): A callback function invoked when the asynchronous operation completes successfully.

### 📨 Return Value
The usePromise hook returns an object with the following properties:

* data: The result of the asynchronous operation.
* isLoading: A boolean indicating whether the asynchronous operation is currently in progress.
* error: An error object containing details if an error occurred during the execution of the asynchronous operation.
* run: A function that triggers the execution of the asynchronous operation.
* abort: A function that aborts the ongoing asynchronous operation.

### ⛔ Aborting Requests
The abort function allows you to cancel an ongoing asynchronous operation. It utilizes the AbortController mechanism and throws a custom AbortError to signal the abortion.

### 💡 Example
```jsx
import { useState } from 'react';
import usePromise from './usePromise';

function MyComponent() {
    const [searchQuery, setSearchQuery] = useState('');
    const { data, isLoading, error, run, abort } = usePromise(() => fetchData(searchQuery));

    const handleSearch = () => {
        run();
    };

    const handleAbort = () => {
        abort();
    };

    return (
        <div>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleAbort} disabled={!isLoading}>Abort</button>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && <p>Data: {data}</p>}
        </div>
    );
}
```

### ⚠️ Error Handling
Errors thrown during the execution of the asynchronous operation are caught and stored in the error state. Additionally, the onError callback, if provided, is invoked with the error object.

### 📝 Note
Ensure the provided asynchronous function (fn) returns a promise.
The onError and onSuccess callbacks are optional and can be provided for custom error handling and side effects upon successful completion, respectively.
The AbortError class is provided for graceful abortion of ongoing asynchronous operations.

## 🔦 Code
Go to [source code](./usePromise.js) 
<br><br>
OR
<details>
<summary>Show code</summary>

### Full Code

```jsx
import { useState, useRef, useEffect } from "react";

class AbortError extends Error {
    constructor() {
        super("Aborted");
        this.abort = true;
        this.name = "AbortError";
    }
}

function usePromise(fn, { shouldExecute = true, onError = ()=>undefined, onSuccess = ()=>undefined} = {}) {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const controller = useRef(()=>undefined);

    async function execute() {
        console.log("executing");
        if (!shouldExecute) {
            return;
        }

        try {
            setIsLoading(true);
            setError(undefined);
            const data = await Promise.race([
                fn(), 
                new Promise((_, reject) => {
                    controller.current.abort = reject;
                })
            ]);
            setData(data);
            onSuccess(data);
        } catch (error) {
            console.log(error);
            const reallyError = !(error instanceof AbortError)
            if (reallyError) {
                setError(error);
                onError(error);;
            }
        } finally {
            setIsLoading(false);
        }
    }

    // On run, execute function
    async function run() {
        execute();
    };

    // On abort, abort with signal
    async function abort() {
        if (controller?.current?.abort) {
            controller.current.abort(new AbortError());
        }
    }

    // Initial render execute
    useEffect(() => {
        execute();
    }, []);

    return {
        data,
        isLoading,
        error,
        run,
        abort
    }
};

export default usePromise;
```

</details>

## 🙏 Credits
This hook was created and documented by Berat Vıcıl beratvicil@gmail.com.

License
This code is released under the MIT License.