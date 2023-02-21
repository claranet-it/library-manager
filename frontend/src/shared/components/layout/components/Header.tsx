import { stockData } from '../../../../data';

function Header() {
  return (
    <header className="header">
      <h1 className="logo">{stockData.headerTitle}</h1>
    </header>
  );
}

export default Header;
