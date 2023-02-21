import React from 'react';
import { Footer, Header } from './components';

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
