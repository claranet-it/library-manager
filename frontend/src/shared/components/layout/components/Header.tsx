import { stockData } from '../../../../model/data';

export const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">{stockData.headerTitle}</h1>
    </header>
  );
};
