import { stockData } from '../../../../model/data';

export const Footer = () => {
  return (
    <footer className="footer">
      <h1 className="authors">{stockData.footerTitle}</h1>
    </footer>
  );
};
