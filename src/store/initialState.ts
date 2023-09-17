import { ThemeMode } from 'antd-style';

export enum Tab {
  Readme = 'readme',
  Shields = 'shields',
}

export interface StoreState {
  activeTab: Tab;
  themeMode: ThemeMode;
}

export const initialState: StoreState = {
  activeTab: Tab.Readme,
  themeMode: 'auto',
};
