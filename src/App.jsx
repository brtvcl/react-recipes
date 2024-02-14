import React from "react";
import usePromise from "./usePromise";
function sleep(ms) {
  return new Promise((resolve)=>setTimeout(resolve, ms));
}

function App() {
  const { data, isLoading, error, abort} = usePromise(async ()=>{
    await sleep(3000);
    const data= await ((await (fetch("https://dummyjson.com/products/"))).json());
    console.log(data);
    return data
  })


  return (
    <>
    {isLoading && <h1>Loading...</h1>}
    {error && <h1 style={{color: "red"}}>Error</h1>}
    <button onClick={()=>{abort()}}>Abort</button>
    {JSON.stringify(data, null, 2)}
    </>
  )
}

export default App
