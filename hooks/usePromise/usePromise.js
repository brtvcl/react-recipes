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