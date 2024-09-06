import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Unauthorized } from '../pages/Unauthorized';
import { ProtectedRoute } from './ProtectedRoute';

export const Router: FC = () => {
  return (
    <Routes>
      <Route
        path="home"
        element={
          <ProtectedRoute user={null}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Home />} />
      <Route path="unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};
