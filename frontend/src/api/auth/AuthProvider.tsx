import { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
}

// This context provides authentication state and a logout function
// to the rest of the application, allowing components to access
// whether the user is authenticated and to log out the user.

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Check if the user is authenticated by checking for an access token in localStorage
  const isAuthenticated = !!localStorage.getItem("access");

  // Function to handle user logout
  const logoutHandler = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout: logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
