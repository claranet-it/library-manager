import './assets/css/app.scss';
import AppRouter from './router/AppRouter';
import { ToastManager } from './shared/components/toast/toastManager';

function App() {
  return (
    <>
      <AppRouter></AppRouter>
      <ToastManager />
    </>
  );
}

export default App;
