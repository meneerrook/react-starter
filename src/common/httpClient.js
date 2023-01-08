
import appConfig from "constants/appConfig";

var _cachedData = new Map();

export const httpClient = {
    /**
     * Performs a GET request to the specified URL
     * @param  {String} url End-point of the request
     * @param  {Object} options Options for the request
     * @param  {Boolean} useCache True/false to write to cache
     */
    get: async (url, options = {}, useCache = false) => {
        let defaultOptions = {
            method: "get",
        };
        
        let requestOptions = { ...defaultOptions, ...options };

        if (useCache) {
            let response = await getCachedResponse(url, requestOptions);

            if(!successfulStatus(response.status)) {
                await removeCachedResponse(url);
            }

            return response;
        }

        const { data } = await request(url, requestOptions);
        return data;
    },

    /**
     * Performs a POST request to the specified URL
     * @param  {String} url End-point of the request
     * @param  {Object} data Payload
     * @param  {String} options Options for the request
     */
    post: async (url, data, options) => {
        let defaultOptions = {
            method: "post",
            body: formatData(data),
        };

        let requestOptions = { ...defaultOptions, ...options };

        const { data: responseData } = await request(url, requestOptions);
        return responseData;
    },

    /**
     * Performs a POST request to the specified URL
     * @param  {String} url End-point of the request
     * @param  {Object} data Payload
     * @param  {String} options Options for the request
     */
    put: async (url, data, options) => {
        let defaultOptions = {
            method: "put",
            body: formatData(data),
        };

        let requestOptions = { ...defaultOptions, ...options };

        const { data: responseData } = await request(url, requestOptions);
        return responseData;
    },

    /**
     * Performs a POST request to the specified URL
     * @param  {String} url End-point of the request
     * @param  {Object} data Payload
     * @param  {String} options Options for the request
     * @param  {String} bearerToken OIS bearerToken, also sends OIS headers
     */
    delete: async (url, data, options) => {
        let defaultOptions = {
            method: "delete",
            body: formatData(data),
        };

        let requestOptions = { ...defaultOptions, ...options };

        const { data: responseData } = await request(url, requestOptions);
        return responseData;
    },
};

async function getCachedResponse(url, options) {
    if (!_cachedData.has(url)) {
        _cachedData.set(
            url,
            new Promise(async (resolve, reject) => {
                let cache = await caches.open(appConfig.cacheName);
                let cacheResponse = await cache.match(url);

                if (cacheResponse) {
                    let promise = await Promise.resolve(cacheResponse);
                    const data = await responseType(promise);
                    _cachedData.set(url, data);
                    resolve(data);
                } else {
                    const { response, data } = await request(url, options);
                    cache.put(url, response);
                    _cachedData.set(url, data);
                    resolve(data);
                }
            })
        );
    }
    let result = await _cachedData.get(url);
    return result;
}

async function removeCachedResponse(url) {
    let cache = await caches.open(appConfig.cacheName);
    
    cache.delete(url);

    if(_cachedData.has(url)) {
        _cachedData.delete(url);
    }
}

async function request(url, options = {}) {
    let response = await fetch(url, options);

    if (response.status >= 200 && response.status < 500) {
        let data = await responseType(response.clone());
        return { response: response.clone(), data: data };
    } else {
        return Promise.reject(new Error(`${response.status} ${response.statusText}`));
    }
}

async function responseType(response) {
    const contentType = response.headers.get("content-type");
    let result;

    if (contentType && contentType.includes("json")) {
        result = await response.json();
    } else if (contentType && contentType.includes("blob")) {
        result = await response.blob();
    } else {
        result = await response.text();
    }

    return {
        content: result,
        status: response.status,
        contentType: contentType
    }
}

function formatData(data) {
    return JSON.stringify(data, trimStrings);
}

function trimStrings(key, value) {
    if (typeof value === "string") {
        return value.trim();
    }

    return value;
}

export function successfulStatus(statusCode) {
    return statusCode >= 200 && statusCode < 300;
}

export function redirectionStatus(statusCode) {
    return statusCode >= 300 && statusCode < 400;
}

export function clientErrorStatus(statusCode) {
    return statusCode >= 400 && statusCode < 499;
}

export default httpClient;