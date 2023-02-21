import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  message: string;
};

export const ErrorMessage: React.FC<Props> = ({ message }): React.ReactElement => {
  const navigate = useNavigate();
  return (
    <div className="page page-error">
      {message}
      <button onClick={() => navigate(-1)}>⬅️ Back</button>
    </div>
  );
};
