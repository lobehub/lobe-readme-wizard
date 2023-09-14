import { ThemeMode } from 'antd-style';
import type { StateCreator } from 'zustand/vanilla';

import type { Store } from './store';

export interface StoreAction {
  setThemeMode: (themeMode: ThemeMode) => void;
}

export const createMarketAction: StateCreator<
  Store,
  [['zustand/devtools', never]],
  [],
  StoreAction
> = (set) => ({
  setThemeMode: (themeMode) => {
    set({ themeMode });
  },
});
