import axios from "axios";

export function retrieveUsername(role){
    if(role !== "user"){
        return axios.get("api/v1/username")
            .then(response => {
                return response.data.username;
            })
            .catch(error=>{
                console.error("Error retrieving username",error);
                throw error;
            })
    }
}