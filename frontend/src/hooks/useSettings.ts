import { useSettings as useSettingsStore } from '../store/settingsStore';

export const useSettings = () => {
  return useSettingsStore();
};
