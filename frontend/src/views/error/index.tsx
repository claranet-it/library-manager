import React from 'react';
import { useNavigate } from 'react-router-dom';
import { stockData } from '../../data';

const Error: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page page-error">
      {stockData.error}
      <button onClick={() => navigate('/')}>Go back home</button>
    </div>
  );
};

export default Error;
