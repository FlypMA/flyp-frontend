export type ModalType = 'signup' | 'login' | null;

export interface AuthModalContextType {
  isOpen: boolean;
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export interface AuthModalProviderProps {
  children: React.ReactNode;
}

export interface PluginInstallPromptConfig {
  title: string;
  description: string;
  buttonText: string;
  onInstall: () => void;
  onDismiss: () => void;
}
