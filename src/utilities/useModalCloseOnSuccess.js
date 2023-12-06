import { useState, useEffect } from 'react';

export const useModalCloseOnSuccess = (show, hideModal, successResponse) => {
    const [isReadyToClose, setIsReadyToClose] = useState(false);

    useEffect(() => {
        if (successResponse) {
            setIsReadyToClose(true);
        }
    }, [successResponse]);

    useEffect(() => {
        if (isReadyToClose) {
            hideModal();
        }
    }, [isReadyToClose, hideModal]);

    return { isReadyToClose };
};
