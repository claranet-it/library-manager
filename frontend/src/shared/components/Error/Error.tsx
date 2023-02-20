import React from 'react';
import { useNavigate } from 'react-router-dom';

type TError = {
  message: string;
  children?: React.ReactNode;
};

export const Error: React.FC<TError> = ({ message, children }): React.ReactElement => {
  const navigate = useNavigate();
  return (
    <div className="page page-error">
      {message}
      {children && <div>{children}</div>}
    </div>
  );
};
