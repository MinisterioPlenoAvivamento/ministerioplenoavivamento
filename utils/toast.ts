import toast from 'react-hot-toast';

export const showSuccess = (message: string) => {
  toast.success(message);
};

export const showError = (message: string) => {
  toast.error(message);
};

export const showLoading = (message: string, toastId?: string) => {
  // Se um toastId for fornecido, atualiza o toast existente. Caso contrário, cria um novo.
  if (toastId) {
    toast.loading(message, { id: toastId });
    return toastId;
  }
  return toast.loading(message);
};

export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};