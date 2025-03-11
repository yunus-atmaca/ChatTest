import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import {uuidv4} from '@/utils/helpers';
import {Storage} from '@/utils';

const name = 'chat';

interface State {
  isConnected: boolean;
  messages: IMessage[];
}

const initialState: State = {
  isConnected: false,
  messages: [],
};

const generateSystemDateMessage = (createdAt: string): IMessage => {
  const isToday = dayjs(createdAt).isToday();
  return {
    id: uuidv4(),
    deleted: false,
    text: `${isToday ? 'Today' : dayjs(createdAt).format('dddd')}, ${dayjs(
      createdAt,
    ).format('DD MMM')}`,
    createdAt: dayjs().toISOString(),
    sender: 'client',
    type: 'system',
  };
};

const {
  actions: {setConnected, setInitialMessages, appendMessage},
  reducer,
} = createSlice({
  name,
  initialState: initialState,
  reducers: {
    setConnected: (state: State, action: PayloadAction<boolean>) => {
      return {...state, isConnected: action.payload};
    },
    setInitialMessages: (state: State, action: PayloadAction<IMessage[]>) => {
      return {...state, messages: action.payload};
    },
    appendMessage: (
      state: State,
      action: PayloadAction<{text: string; createdAt: string; sender: any}>,
    ) => {
      const {text, createdAt, sender} = action.payload;
      const temp = [...state.messages];

      const lastMessageCreatedAt =
        state.messages.length > 0 ? state.messages[0].createdAt : null;

      if (lastMessageCreatedAt) {
        if (!dayjs(lastMessageCreatedAt).isSame(createdAt, 'day')) {
          temp.unshift(generateSystemDateMessage(createdAt));
        }
      } else {
        temp.unshift(generateSystemDateMessage(createdAt));
      }

      temp.unshift({
        id: uuidv4(),
        deleted: false,
        text,
        createdAt,
        sender,
        type: 'text',
      });

      Storage.save(Storage.KEYS.MESSAGES, temp);
      return {
        ...state,
        messages: temp,
      };
    },
  },
});

export {reducer, setConnected, setInitialMessages, appendMessage};
