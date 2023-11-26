import React, {ReactNode, useEffect, useState} from 'react';
import LoadingBar, {LoadingBarRef} from "react-top-loading-bar";
export const LoadingContext = React.createContext({
    isLoading: false,
    setLoading: (isLoading:boolean)=>{},
});

const LoadingProvider = ({children}: {children: ReactNode }) => {
    const [isLoading, setLoading] = useState(false);
    const ref = React.createRef<LoadingBarRef>();
    useEffect(() => {
        if (isLoading) {
            ref.current?.continuousStart();
        } else {
            ref.current?.complete();
        }
    }, [isLoading,ref]);
    return (
        <LoadingContext.Provider value={{ isLoading, setLoading }}>
            <LoadingBar color='white' ref={ref} />
            {children}
        </LoadingContext.Provider>
    );
};
export default LoadingProvider;