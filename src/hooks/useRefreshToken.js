import createRefresh from 'react-auth-kit/createRefresh';
import axios from '../api/axios';

const refresh = createRefresh({
  interval: 60,
  refreshApiCallback: async (param) => {
      try {
          const response = await axios.post("/api/auth/refresh", param, {
              headers: {'Authorization': `Bearer ${param.authToken}`}
          })
          console.log("Refreshing")
          return {
              isSuccess: true,
              newAuthToken: response.data.access_token,
              newAuthTokenExpireIn: 10,
              newRefreshTokenExpiresIn: 60
          }
      }
      catch(error){
          console.error(error)
          return {
              isSuccess: false
          } 
      }
  }
})

export default refresh;
