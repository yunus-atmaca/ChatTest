import {RootState} from '../index';
import {createSelector} from '@reduxjs/toolkit';

export const controller = (state: RootState) => state.chatController;

export const isConnected = createSelector(controller, c => c.isConnected);
export const editMessage = createSelector(controller, c => c.editMessage);
export const aDayChats = createSelector(controller, c => c.chats);
