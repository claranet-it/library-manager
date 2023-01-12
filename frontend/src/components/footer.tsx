import { stockData } from '../data';

function Footer() {
  return (
    <footer className="footer">
      <h1 className="authors">{stockData.footerTitle}</h1>
    </footer>
  );
}

export default Footer;
