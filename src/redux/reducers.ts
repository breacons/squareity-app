import { combineReducers } from 'redux';
import layoutReducer, { LayoutState } from './slices/layout';

export interface RootState {
  layout: LayoutState;
}

export const rootReducer = combineReducers<RootState>({
  layout: layoutReducer,
});
