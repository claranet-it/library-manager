import React from 'react';
import closeModalByNavigation from '../../../utils/closeModalByNavigation';
import { Footer, Header } from './components';

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }): React.ReactElement => {
  closeModalByNavigation();
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
