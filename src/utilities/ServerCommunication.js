import axios from "axios";

function reloadPage() {
    window.location.reload(false);
}

export const sendRequest = (options) => {
    return new Promise((resolve, reject) => {
        const { method, url, data, headers, executeFunction, handleError, reload } = options;
        const requestData = data instanceof FormData ? data : { ...data };
        const requestHeaders = headers || {};

        if (data instanceof FormData) {
            requestHeaders['Content-Type'] = 'multipart/form-data';
        } else if (!requestHeaders['Content-Type']) {
            requestHeaders['Content-Type'] = 'application/json';
        }

        axios({
            method: method,
            url: url,
            headers: requestHeaders,
            data: requestData,
            withCredentials: true
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300 && executeFunction) {
                    if (Array.isArray(options.executeFunctionArgs)) {
                        executeFunction(response, ...options.executeFunctionArgs);
                    }
                    if (reload) {
                        reloadPage();
                    }
                }
                resolve(response); // Resolve with the response
            })
            .catch(error => {
                handleError(error.response?.data?.detail || error.message);
                //reject(error);
            });
    });
};

export const communicateWithServer = (options) => {
    return new Promise((resolve, reject) => {
        const { data, handleError, reload = false } = options;

        axios.get('/csrf/api/v1')
            .then(response => {
                const csrfToken = response.data.headers;
                const headers = {
                    'X-CSRF-TOKEN': csrfToken
                };
                if (data) {
                    sendRequest({ ...options, headers, data, reload })
                        .then(resolve)
                        .catch(reject);
                } else {
                    sendRequest({ ...options, headers, reload })
                        .then(resolve)
                        .catch(reject);
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    handleError(error.response.data.message);
                } else {
                    handleError(error.message);
                }
                reject(error);
            });
    });
};


