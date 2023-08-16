/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import useUrl from './hooks/useUrl'
import { border } from '@chakra-ui/react'

function App() {
  const [inputUrl, setInputUrl] = useState<string>('')
  const { data, isLoading, error } = useUrl("/api/url/shorten", inputUrl)
  const URlregex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
  const urlRef = useRef<HTMLInputElement>(null);
  console.log(data)
  function handleClick() {
    if (urlRef.current?.value) {
      if (URlregex.test(urlRef.current?.value)) {
        setInputUrl(urlRef.current?.value)
      }
      else {
        setInputUrl('')
      }
    }
  }
  return (
    <>
    <input ref={urlRef} placeholder='adad' style={{width:'500px' ,height:'100px' ,border:'1px solid black ',borderRadius:'4px'}} />
    <button onClick={handleClick}>click me </button>
    {data?<p>adad</p>:null}
    </>
  )
}
export default App