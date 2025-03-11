import {RootState} from '../index';
import {createSelector} from '@reduxjs/toolkit';

export const controller = (state: RootState) => state.chatController;

export const isConnected = createSelector(controller, c => c.isConnected);
export const messages = createSelector(controller, c => c.messages);
