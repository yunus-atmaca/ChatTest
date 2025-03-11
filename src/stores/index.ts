import {configureStore} from '@reduxjs/toolkit';

import {ChatController} from './controllers';

const stores = configureStore({
  reducer: {
    chatController: ChatController.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof stores.getState>;
export type AppDispatch = typeof stores.dispatch;

export default stores;
