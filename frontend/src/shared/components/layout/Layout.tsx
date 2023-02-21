import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }): React.ReactElement => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
