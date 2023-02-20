import './assets/css/app.scss';
import { ToastProvider } from './context/toastContext';
import AppRouter from './router/AppRouter';
import { ToastManager } from './shared/components/toastManager';

function App() {
  return (
    <ToastProvider>
      <AppRouter></AppRouter>
      <ToastManager />
    </ToastProvider>
  );
}

export default App;
