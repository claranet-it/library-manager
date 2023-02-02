import './assets/css/app.scss';
import { ToastManager } from './components/toastManager';
import { ToastProvider } from './context/toastContext';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <ToastProvider>
      <AppRouter></AppRouter>
      <ToastManager />
    </ToastProvider>
  );
}

export default App;
