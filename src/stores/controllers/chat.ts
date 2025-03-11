import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const name = 'chat';

interface State {
  isConnected: boolean;
  messages: any;
}

const initialState: State = {
  isConnected: false,
  messages: null,
};

const {
  actions: {setConnected, addMessages},
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
    addMessages: (state: State, action: PayloadAction<string>) => {
      return {
        ...state,
        //token: action.payload,
      };
    },
  },
});

export {reducer, setConnected, addMessages};
