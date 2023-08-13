import { getTokenFromLocalStorage } from "../utils/localStorage";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const PrivateRoutes: React.FC<Props> = ({ children }) => {
  const token = getTokenFromLocalStorage();

  return token ? children : <Navigate to="/login" replace={true} />;
};

export default PrivateRoutes;
