//in React we can also make custom hooks like useState and useEffect.
//here we are making useFetch hook to fetch data from api everytime.
//so there are several things that are to be done while fetching data from the api
//this hook will help use in that thing.

import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url)=>{

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=>{
        const fetchData = async ()=>{
            setLoading(true);
            try{
                const res = await axios.get(url);
                
                setData(res.data);
            }
            catch(err){
                setError(err);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    const reFetch = async ()=>{
        setLoading(true);
        try{
            const res = await axios.get(url);
            setData(res.data);
        }
        catch(err){
            setError(err);
        }
        setLoading(false);
    }

    return {data, loading, error, reFetch};

}

export default useFetch;