import { useEffect, useState } from "react";


const localCache = {

};


export const useFetch = ( url ) => {
    
    const [state, setState] = useState({
        data: null, 
        isLoading: true,
        hasError: false,
        errorMessage:null
    });
    
    useEffect(() => {
        
        getFetch()
        
    }, [url])
    
    const setLoadingState = () => {
        setState({
            data: null, 
            isLoading: true,
            hasError: false,
            errorMessage:null
        })
    }
    
    const getFetch = async() => {
        
        
        if( localCache[url] ){

            setState({
                data: localCache[url],
                isLoading:false,
                hasError: false, 
                errorMessage: null
            })
            return;
        }
        
        setLoadingState();
        const response = await fetch(url ,{
            headers: {
                "AuthorId": '1811'
            }
        });
        
        
        if(!response.ok){
            setState({
                data:null,
                isLoading: false,
                hasError:true,
                errorMessage: {
                    code: response.status,
                    message: response.statusText,
                }
            })
            return;
        }
        const data = await response.json();
        setState({
            data:data,
            isLoading: false,
            hasError:false,
            errorMessage:null
        })
        
        localCache[url] = data;
    }
    
    
    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError
    }
    
}
    