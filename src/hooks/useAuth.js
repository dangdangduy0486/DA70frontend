import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  // const token = useSelector(selectCurrentToken);
  const token = localStorage.getItem("token");
  let isAdmin = false;
  let status = "Member";

  if (token) {
    const decoded = jwtDecode(token);
    const { email, role } = decoded.UserInfo;

    isAdmin = role.includes("Amin");

    if (isAdmin) status = "Admin";

    return { email, role, status, isAdmin };
  }

  return { email: "", role: [], isAdmin, status };
};

export default useAuth;
