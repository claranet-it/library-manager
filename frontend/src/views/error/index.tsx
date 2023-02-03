import React from 'react';
import { stockData } from '../../data';

type TError = {
  children?: React.ReactNode;
};

const Error: React.FC<TError> = ({ children }) => (
  <div className="page page-error">
    <div>{stockData.error}</div>
    {children}
  </div>
);

export default Error;
