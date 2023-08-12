import { useEffect, useState } from "react";
import httpCommon from "../http-common";
import { CanceledError } from "axios";
import IUrl from "../types/IUrl";
const useUrl = (endpoint:string) => {
        const [data,setData]=useState<IUrl>();
        const [error ,setError]=useState('');
        const [isLoading,setLoading]=useState(false)
        useEffect(()=>{
            const controller=new AbortController()
            setLoading(true)
            httpCommon
            .get<IUrl>(endpoint,{signal:controller.signal})
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
        },[endpoint])
        return{data,error,isLoading}
}

export default useUrl;