import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export interface ProtectedRouteProps extends PropsWithChildren {
  user: unknown;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/unauthorized" replace />;
  } else {
    return children;
  }
};
