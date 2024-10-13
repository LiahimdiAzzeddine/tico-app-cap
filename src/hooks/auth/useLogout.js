import useAxiosPrivate from "../useAxiosPrivate";

const useLogout = () => {
    const axiosPrivate = useAxiosPrivate();

    const logout = async () => {
        try {
            const response = await axiosPrivate.post('/api/auth/logout');
            return response.data; // Return the response data to check success
        } catch (err) {
            console.error(err);
            return { success: false }; // Return a failure response
        }
    }

    return logout;
}

export default useLogout;