import { useState } from 'react';
import './assets/css/app.scss';
import { ToastManager } from './components/toastManager';
import { ToastContext } from './context';
import AppRouter from './router/AppRouter';
import { ToastMessage } from './types';

function App() {
  const [toast, setToast] = useState<ToastMessage[]>([]);

  return (
    <ToastContext.Provider value={[toast, setToast]}>
      <AppRouter></AppRouter>
      <ToastManager />
    </ToastContext.Provider>
  );
}

export default App;
