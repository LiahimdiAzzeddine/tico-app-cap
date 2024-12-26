import { useState, useEffect } from 'react';
import useAxiosPrivate from '../useAxiosPrivate'; // Assurez-vous que le chemin est correct

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const axiosPrivate = useAxiosPrivate();


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchUsers = async () => {
            try {
                const response = await axiosPrivate.get('/api/manage-users/users', {
                    signal: controller.signal
                });
                if (isMounted) {
                    setUsers(response.data.data);
                }
            } catch (err) {
                if (err.name === 'CanceledError') {
                    console.log('Request was canceled');
                } else {
                    console.error(err);
                    if (err.response?.status === 401) {
                        //navigate('/login', { state: { from: location }, replace: true });
                    }
                }
            }
        };

        fetchUsers();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    return users;
};

export default useUsers;
