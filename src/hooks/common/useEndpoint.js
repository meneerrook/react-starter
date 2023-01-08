import { useState } from "react";
import { httpClient, successfulStatus } from "common";

function useEndpoint(url, handleResponse) {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const fetchTask = async (method, payload = {}, cache = false) => {
        setIsFetching(true);
        setError(null);

        try {
            let response;

            switch (method) {
                case "GET":
                    response = await httpClient.get(`${url}${typeof payload === "string" ? payload : ""}`, {}, cache);
                    break;
                case "POST":
                    response = await httpClient.post(url, payload, {});
                    break;
                case "PUT":
                    response = await httpClient.put(url, payload, {});
                    break;
                case "DELETE":
                    response = await httpClient.delete(url, payload, {});
                    break;
                default:
                    throw new Error(`Invalid request method`);
            }

            if (successfulStatus(response.status)) {
                handleResponse(response);
                return response.content;
            } else {
                setError("Er is een fout opgetreden");
            }
        } catch (err) {
            console.error(err);
            setError("Er is een fout opgetreden");
        } finally {
            setIsFetching(false);
        }
    };

    return { fetchTask, error, isFetching };
}

export default useEndpoint;
