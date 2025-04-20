// Updated AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { login as performLogin } from "../../services/client.js";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  

  // Helper function to safely get token from various possible sources
  const extractToken = (response) => {
    if (!response) return null;
    
    // Try to find token in various locations
    if (response.data?.token) {
      return response.data.token;
    } else if (response.data?.customerDTO?.token) {
      return response.data.customerDTO.token;
    } else if (response.headers?.authorization) {
      return response.headers["authorization"];
    } else if (response.headers?.["authorization"]) {
      return response.headers["authorization"];
    }
    
    return null;
  };

  // Helper function to safely decode and validate token
  const validateToken = (token) => {
    if (!token || typeof token !== 'string') {
      return null;
    }
    
    // Check basic JWT structure
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    try {
      const decoded = jwtDecode(token);
      
      // Check if token has required properties
      if (!decoded || !decoded.sub) {
        return null;
      }
      
      // Check if token is expired
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        return null;
      }
      
      return decoded;
    } catch (error) {
      console.warn("Token validation failed:", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access token");
    if (!token) return;
    
    const decodedToken = validateToken(token);
    if (decodedToken) {
      setCustomer({
        username: decodedToken.sub,
        roles: decodedToken.scopes || [],
      });
    } else {
      // Token is invalid or expired, remove it
      localStorage.removeItem("access token");
    }
  }, []);


  const login = async (usernameAndPassword) => {
    return new Promise((resolve, reject) => {
      performLogin(usernameAndPassword)
        .then((res) => {
          console.log("Full login response:", res);
          console.log("Login response data:", res.data);
          console.log("Login response headers:", res.headers);
          
          const jwtToken = extractToken(res);
          
          if (!jwtToken) {
            reject(new Error("Invalid response from server - no token found"));
            return;
          }

          const decodedToken = validateToken(jwtToken);
          if (!decodedToken) {
            reject(new Error("Invalid token received from server"));
            return;
          }

          localStorage.setItem("access token", jwtToken);
          
          setCustomer({
            username: decodedToken.sub,
            roles: decodedToken.scopes || [],
          });
          
          resolve(res);
        })
        .catch((err) => {
          console.error("Login failed:", err);
          reject(err);
        });
    });
  };

  const logout = () => {
    localStorage.removeItem("access token");
    setCustomer(null);
  };

  const isCustomerAuthenticated = () => {
    try {
      const token = localStorage.getItem("access token");
      return !!validateToken(token);
    } catch (error) {
      console.warn("Authentication check failed:", error);
      logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        login,
        logout,
        isCustomerAuthenticated,
        extractToken, // Expose token extraction function
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;