// empty redirect page

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "@/api/auth/authService";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default LogoutPage;
