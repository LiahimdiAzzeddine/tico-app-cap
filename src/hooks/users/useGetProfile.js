import { useState, useEffect } from "react";
import useAxiosPrivate from "../useAxiosPrivate";

const useGetProfile = () => {
  const privateClient = useAxiosPrivate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await privateClient.get('/api/profile');
        console.log("🚀 ~ fetchProfile ~ response:", response)
        setProfile(response.data.data); 
      } catch (err) {
        setError(err.response ? err.response.data.error : "An error occurred");
        setProfile({}); 
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [privateClient]);

  return { profile,setProfile, loading, error };
};

export default useGetProfile;
