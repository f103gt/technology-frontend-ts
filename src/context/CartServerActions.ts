import axios from "axios";

export function deleteCartItemServer(cartItemName: string) {
    axios.get("/csrf/api/v1")
        .then(response => {
            const csrfToken = response.data.headers;
            axios.delete(`/cart/api/v1/delete-item?cartItemName=${cartItemName}`, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            })
                .catch(error => new Error(error));
        })

}

export function addNewItemServer(cartItemName: string) {
    axios.get("/csrf/api/v1")
        .then(response => {
            const csrfToken = response.data.headers;
            axios.post(`/cart/api/v1/add-item?cartItemName=${cartItemName}`,{
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            })
                .catch(error => new Error(error));
        })
}

/*removes the whole cart item regardless of quantity*/
export function removeCartItemServer(cartItemName: string) {
    axios.get("/csrf/api/v1")
        .then(response => {
            const csrfToken = response.data.headers;
            axios.delete(`/cart/api/v1/remove-item?cartItemName=${cartItemName}`,{
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            })
                .catch(error => new Error(error));
        })
}
