import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import {uuidv4} from '@/utils/helpers';
import {Storage} from '@/utils';

const name = 'chat';

interface State {
  isConnected: boolean;
  editMessage: IMessage | null;
  chats: IADayChat[];
}

const initialState: State = {
  isConnected: false,
  editMessage: null,
  chats: [],
};

const {
  actions: {
    setConnected,
    deleteMessage,
    setInitialChats,
    appendMessage,
    setEditMessage,
    editUserMessage,
  },
  reducer,
} = createSlice({
  name,
  initialState: initialState,
  reducers: {
    setConnected: (state: State, action: PayloadAction<boolean>) => {
      return {...state, isConnected: action.payload};
    },
    setInitialChats: (state: State, action: PayloadAction<IADayChat[]>) => {
      return {...state, chats: action.payload};
    },
    setEditMessage: (state: State, action: PayloadAction<IMessage | null>) => {
      return {...state, editMessage: action.payload};
    },
    deleteMessage: (state: State, action: PayloadAction<IMessage>) => {
      const {id, createdAt} = action.payload;
      const day = dayjs(createdAt).format('YYYY-MM-DD');

      let temp = [...state.chats] as IADayChat[];
      const index = temp.findIndex(c => c.day === day);

      if (index >= 0) {
        const chat = temp[index];
        let messages = [...chat.messages];

        messages = messages.filter(m => m.id !== id);

        if (messages.length === 0) {
          temp = temp.filter(c => c.day !== day);
        } else {
          temp[index].messages = messages;
        }

        Storage.save(Storage.KEYS.CHATS, temp);
        Object.assign(state, {chats: temp});
      }
    },
    editUserMessage: (state: State, action: PayloadAction<IMessage>) => {
      const {id, createdAt} = action.payload;
      const day = dayjs(createdAt).format('YYYY-MM-DD');

      let chats = [...state.chats] as IADayChat[];
      const chatIndex = chats.findIndex(c => c.day === day);

      if (chatIndex >= 0) {
        const messageIndex = chats[chatIndex].messages.findIndex(
          m => m.id === id,
        );
        if (messageIndex >= 0) {
          chats[chatIndex].messages[messageIndex] = action.payload;
        }

        Storage.save(Storage.KEYS.CHATS, chats);
        Object.assign(state, {chats: chats});
      }
    },
    appendMessage: (
      state: State,
      action: PayloadAction<{text: string; createdAt: string; sender: any}>,
    ) => {
      //const createdAt = '2025-03-16T09:32:44.012Z';
      const {text, createdAt, sender} = action.payload;
      const temp = [...state.chats] as IADayChat[];

      const message: IMessage = {
        id: uuidv4(),
        text,
        createdAt,
        sender,
        type: 'text',
      };

      const day = dayjs(createdAt).format('YYYY-MM-DD');

      if (temp.length > 0) {
        const first = temp[0];

        if (first.day === day) {
          first.messages.push(message);
        } else {
          temp.unshift({day, messages: [message]});
        }
      } else {
        temp.unshift({day, messages: [message]});
      }

      Storage.save(Storage.KEYS.CHATS, temp);
      Object.assign(state, {chats: temp});
    },
  },
});

export {
  reducer,
  setConnected,
  setInitialChats,
  appendMessage,
  deleteMessage,
  setEditMessage,
  editUserMessage,
};
