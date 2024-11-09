import useAxiosPrivate from "../useAxiosPrivate";
import useSignOut from 'react-auth-kit/hooks/useSignOut';

const useLogout = () => {
    const axiosPrivate = useAxiosPrivate();
    const signOut = useSignOut()

    const logout = async () => {
        try {
            //const response = await axiosPrivate.post('/api/auth/logout');
            signOut();
            return response.data; // Return the response data to check success
        } catch (err) {
            console.error(err);
            return { success: false }; // Return a failure response
        }
    }

    return logout;
}

export default useLogout;