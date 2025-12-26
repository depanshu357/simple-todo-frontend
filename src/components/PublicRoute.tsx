import React from "react";
import { useAuth } from "../contexts/AuthContexts";
import { Navigate } from "react-router";

type Props = {
  children: React.ReactNode;
};

const PublicRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

export default PublicRoute;
