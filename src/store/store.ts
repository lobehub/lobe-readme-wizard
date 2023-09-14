import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import type { StateCreator } from 'zustand/vanilla';

import { type StoreAction, createMarketAction } from './action';
import { type StoreState, initialState } from './initialState';

export type Store = StoreAction & StoreState;

const createStore: StateCreator<Store, [['zustand/devtools', never]]> = (...parameters) => ({
  ...initialState,
  ...createMarketAction(...parameters),
});

export const useStore = createWithEqualityFn<Store>()(devtools(createStore), shallow);
