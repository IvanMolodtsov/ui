import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Unauthorized: FC = () => {
  return <Link to={'/login'}>Login</Link>;
};
