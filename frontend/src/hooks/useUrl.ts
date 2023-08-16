import { useEffect, useState } from "react"
import httpCommon from "../http-common"
import { CanceledError } from "axios"
const useUrl = (endpoint:string,inputUrl:string) => {
        const [data,setData]=useState()
        const [error ,setError]=useState()
        const [isLoading,setLoading]=useState(true)
        useEffect(()=>{
            if(inputUrl&&endpoint)
            {
            const controller=new AbortController()
            setLoading(true)
            httpCommon.get(endpoint)
            httpCommon
            .post(endpoint,{inputUrl:inputUrl},{signal:controller.signal})
            .then((res)=>{
                setData(res.data)
            })
            .catch((err)=>{
                if(err instanceof CanceledError)
                return;
                setError(err.message)
            })
            .finally(()=>{
                setLoading(false)
            })
            return()=>controller.abort()
            }
        },[endpoint,inputUrl])
        return{data,error,isLoading}
}

export default useUrl;