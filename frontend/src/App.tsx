/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import useUrl from './hooks/useUrl'
import {
  FormControl,
  Button,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
} from '@chakra-ui/react'
function App() {
  const [inputUrl, setInputUrl] = useState<string>('')
  const inputUrlRef=useRef<HTMLInputElement>(null);
  const { data, isLoading, error } = useUrl("/api/url/shorten", inputUrl)
  const[isValidUrl ,setIsValidUrl]=useState<boolean>(false)
  const URlregex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
  const urlRef = useRef();
  function handleClick() {    
    if(inputUrlRef.current){ 
      if(URlregex.test(inputUrlRef.current.value.toString()))
    {      
      setIsValidUrl(true)
      setInputUrl(inputUrlRef.current.value)
      console.log(data)
      return
    }
      else{      
        setIsValidUrl(false)
        return
      }
   }
  }
  
  return (
    <>
    <FormControl  isInvalid={isValidUrl} marginTop={200}>
      <FormLabel >Email address</FormLabel>
      <Input width='500px' type='url' placeholder='https://' ref={inputUrlRef}/>
      {(isValidUrl)?(<FormErrorMessage>asdasdasd</FormErrorMessage>):<label>fine</label>}
      <Button
            mt={4}
            colorScheme='teal'
            type='submit'
            onClick={handleClick}
          >
            Submit
          </Button>
          <label>{inputUrl}</label>
    </FormControl>
    </>
  )
}
export default App