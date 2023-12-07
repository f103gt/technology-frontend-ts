import { useState, useEffect } from 'react';

export const useModalCloseOnSuccess = (show, setShow, successResponse) => {
    const [isReadyToClose, setIsReadyToClose] = useState(false);

    useEffect(() => {
        if (successResponse) {
            setIsReadyToClose(true);
        }
    }, [successResponse]);

    useEffect(() => {
        if (isReadyToClose) {
            setShow(false);
        }
    }, [isReadyToClose, setShow]);

    return { isReadyToClose };
};
