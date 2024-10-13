import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const useAxiosPrivate = () => {
    const authHeader = useAuthHeader()
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (authHeader && !config.headers['Authorization']) {
                    config.headers['Authorization'] = `${authHeader}`; // Set the Bearer token if authHeader exists
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
        };
    }, [authHeader]);

    return axiosPrivate;
};

export default useAxiosPrivate;
