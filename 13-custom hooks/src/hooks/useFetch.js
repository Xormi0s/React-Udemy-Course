import {useEffect, useState} from "react";
import {fetchUserPlaces} from "../http.js";

export function useFetch(fetchFn, initialValue) {
    const [fetchedData, setFetchedData] = useState(initialValue);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const data = await fetchFn();
                setFetchedData(data);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch data.' });
            }

            setIsFetching(false);
        }

        fetchData();
    }, [fetchFn]);

    return {
        isFetching,
        fetchedData,
        error,
        setFetchedData,
    };
}