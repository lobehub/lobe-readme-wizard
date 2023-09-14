import { ThemeMode } from 'antd-style';

export interface StoreState {
  themeMode: ThemeMode;
}

export const initialState: StoreState = {
  themeMode: 'auto',
};
