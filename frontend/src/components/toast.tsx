type Props = {
  show: boolean;
  title: string;
  description: string;
};

export const Toast: React.FC<Props> = ({ show, title, description }) => {
  let showClass = show ? 'show' : 'hide';

  return (
    <div className={`notification-container top-right ${showClass}`}>
      <div className={`notification toast toast--success`}>
        <div>
          <p className="notification-title">{title}</p>
          <p className="notification-message">{description}</p>
        </div>
      </div>
    </div>
  );
};
