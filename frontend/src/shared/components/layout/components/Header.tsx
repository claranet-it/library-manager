import { stockData } from '../../../../model/label';

export const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">{stockData.headerTitle}</h1>
    </header>
  );
};
