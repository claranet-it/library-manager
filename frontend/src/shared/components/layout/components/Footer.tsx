import { stockData } from '../../../../model/label';

export const Footer = () => {
  return (
    <footer className="footer">
      <h1 className="authors">{stockData.footerTitle}</h1>
    </footer>
  );
};
