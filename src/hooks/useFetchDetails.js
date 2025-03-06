import axios from "axios";
import { useEffect, useState } from "react";

const useFetchDetails = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true)
            const respone = await axios.get(endpoint);
            setData(respone.data);
            setLoading(false)
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint])
    

    return { data, loading };
};

export default useFetchDetails