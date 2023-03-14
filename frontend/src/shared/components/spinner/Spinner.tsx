export const Spinner: React.FC = (): React.ReactElement => {
  return (
    <div className="page center-spinner">
      <div className="lds-circle">
        <div></div>
      </div>
    </div>
  );
};
