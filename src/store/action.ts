import { ThemeMode } from 'antd-style';
import type { StateCreator } from 'zustand/vanilla';

import { Tab } from './initialState';
import type { Store } from './store';

export interface StoreAction {
  setActiveTab: (activeTab: Tab) => void;
  setThemeMode: (themeMode: ThemeMode) => void;
}

export const createMarketAction: StateCreator<
  Store,
  [['zustand/devtools', never]],
  [],
  StoreAction
> = (set) => ({
  setActiveTab: (activeTab) => {
    set({ activeTab });
  },
  setThemeMode: (themeMode) => {
    set({ themeMode });
  },
});
