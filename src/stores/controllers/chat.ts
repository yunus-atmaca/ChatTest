import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {uuidv4} from '@/utils/helpers';
import dayjs from 'dayjs';

const name = 'chat';

interface State {
  isConnected: boolean;
  messages: IMessage[];
  lastMessageDate: string | null;
}

const initialState: State = {
  isConnected: false,
  messages: [],
  lastMessageDate: null,
};

const {
  actions: {setConnected, appendMessage},
  reducer,
} = createSlice({
  name,
  initialState: initialState,
  reducers: {
    setConnected: (state: State, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isConnected: action.payload,
      };
    },
    appendMessage: (
      state: State,
      action: PayloadAction<{text: string; createdAt: string; sender: any}>,
    ) => {
      const {text, createdAt, sender} = action.payload;
      const temp = [...state.messages];

      if (state.lastMessageDate) {
        if (!dayjs(state.lastMessageDate).isSame(createdAt, 'day')) {
        }
      } else {
        const isToday = dayjs(createdAt).isToday();
        temp.unshift({
          id: uuidv4(),
          deleted: false,
          text: '',
          createdAt: '',
          sender: 'client',
          type: 'system',
        });
      }

      temp.unshift({
        id: uuidv4(),
        deleted: false,
        text,
        createdAt,
        sender,
        type: 'text',
      });
      return {
        ...state,
        messages: temp,
      };
    },
  },
});

export {reducer, setConnected, appendMessage};
