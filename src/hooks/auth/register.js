import axios from "../../api/axios";

export const register = async ({
  username,
  email,
  password,
  password_confirmation,
  role_id
}) => {
  try {
    const response = await axios.post("/api/auth/register", {
      username,
      email,
      password,
      password_confirmation,
      role_id,
    });
    return response.data;
  } catch (e) {
    console.error("Register Error: ", e);
    throw e.response?.data || e; // Include error response for better debugging
  }
};
