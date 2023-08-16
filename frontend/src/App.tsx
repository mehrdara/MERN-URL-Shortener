/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input, Button, } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import useUrl from './hooks/useUrl'
function App() {
  const [inputUrl, setInputUrl] = useState<string>('')
  const { data, isLoading, error } = useUrl("/api/url/shorten", inputUrl)
  const URlregex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
  const urlRef = useRef<HTMLInputElement>(null);
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
      <Input autoFocus={true} ref={urlRef} placeholder="Enter your long URL here " />
      <button onClick={handleClick}>click me </button>
    </>
  )
}
export default App