import React from 'react';
import { stockData } from '../../data';

const Error: React.FC = () => <div className="page page-error">{stockData.error}</div>;

export default Error;
