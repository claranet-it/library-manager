import { useEffect, useState } from "react";

export const useHomeFetch = (offset: number, limit: number) => {
    const [response, setResponse] = useState({ offset: 0, data: [], total: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchBooks = async (offset: number) => {
        try {
            setIsError(false);
            setIsLoading(true);

            const requestOptions = {
                method: 'GET',
                headers: {
                    'contentType': 'application/json'
                },
            };
            const res = await fetch(
                `http://localhost:8080/api/books?offset=${offset}&limit=${limit}`, requestOptions
            );
            const data = await res.json();
            setResponse(data);

        } catch (error) {
            setIsError(true);
        };
        setIsLoading(false);
    };

    // initial
    useEffect(() => {
        fetchBooks(offset);
    }, [limit]);


    return {
        response,
        isLoading,
        isError,
    }; // es6 syntax
};