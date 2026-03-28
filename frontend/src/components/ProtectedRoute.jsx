import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getProfile } from "../services/authApi";

export default function ProtectedRoute({ children })
{
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() =>
  {
    const checkAuth = async () =>
    {
      const token = sessionStorage.getItem("token");
      if (!token)
      {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      try
      {
        await getProfile(); 
        setAuthorized(true);
      } catch (err)
      {
        console.error("Unauthorized:", err);
        sessionStorage.removeItem("token");
        setAuthorized(false);
      } finally
      {
        setLoading(false); 
      }
    };

    checkAuth();
  }, []);

  if (loading)
  {
    return <p>Loading...</p>; 
  }

  return authorized ? children : <Navigate to="/" />;
}
