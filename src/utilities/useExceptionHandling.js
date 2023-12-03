import {useState} from "react";

export const useExceptionHandling = () => {
    const [errorMessage, setErrorMessage] = useState("");

    const handleError = (error) => {
        setErrorMessage(error.message || error);
    }

}