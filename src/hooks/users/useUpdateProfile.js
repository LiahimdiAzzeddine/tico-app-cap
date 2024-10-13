import { useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate";

const useUpdateProfile=()=>{
  const privateClient= useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await privateClient.put('/api/profile/update', userData);
      if(response.data.success){
        setSuccess(response.data.message);
        return response.data.data; 
      }else{
        setError(response.data.errors);
      }
      
    } catch (err) {
      setError(err.response ? err.response.data.errors : { general: 'Une erreur est survenue.' });
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading, error, success };

}
export default useUpdateProfile;