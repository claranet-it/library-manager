import './assets/css/app.scss';
import AppRouter from './router/AppRouter';
import { ModalProvider } from './shared/context/modalContext';
import { ModalManager } from './shared/context/modalManager';
import { ToastProvider } from './shared/context/toastContext';
import { ToastManager } from './shared/context/toastManager';

function App() {
  return (
    <ToastProvider>
      <ModalProvider>
        <AppRouter></AppRouter>
        <ToastManager />
        <ModalManager />
      </ModalProvider>
    </ToastProvider>
  );
}

export default App;
