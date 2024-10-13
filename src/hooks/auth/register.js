import axios from "../../api/axios";
export const register = async (
  username,
  email,
  password,
  password_confirmation,
  role_id
) => {
  try {
    const responce = await axios.post("/api/auth/register", {
      username,
      email,
      password,
      password_confirmation,
      role_id,
    });
    return responce.data;
  } catch (e) {
    console.error("Register Error : ", e);
    throw e;
  }
};
