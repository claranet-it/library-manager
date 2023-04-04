import { OmitID } from './common';

export type ToastMessage = {
  type: string;
  title: string;
  message: string;
  id: string;
};

export type ToastContextType = {
  toast: ToastMessage[];
  removeToast: (index: string) => void;
  addToast: (args: OmitID<ToastMessage>) => void;
};
