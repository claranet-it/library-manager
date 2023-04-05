import './assets/css/app.scss';
import AppRouter from './router/AppRouter';
import { ToastProvider } from './shared/context/toastContext';
import { ToastManager } from './shared/context/toastManager';

function App() {
  return (
    <ToastProvider>
      <AppRouter></AppRouter>
      <ToastManager />
    </ToastProvider>
  );
}

export default App;
