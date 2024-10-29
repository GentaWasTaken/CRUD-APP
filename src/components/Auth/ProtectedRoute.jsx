import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return children;
}
