import { createSlice } from "@reduxjs/toolkit";

// interface IChat {
//   _id: string;
//   participantEmails: string[];
//   participantUsernames: string[];
//   messages: string[];
// }

// interface IState {
//   chatMode: boolean;
//   chatList: IChat[];
//   chatData: IChat;
// }

const initialState = {
  chatMode: false,
  chatList: [],
  chatData: {},
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    chatModeOn: (state) => {
      state.chatMode = true;
    },
    chatModeOff: (state) => {
      state.chatMode = false;
    },
    initilizeChatList: (state, action: { payload: { result: [] } }) => {
      // console.log(action.payload.result);
      state.chatList = [...action.payload.result];
    },
    initilizeChatData: (state, action: { payload: { result: {} } }) => {
      console.log(action.payload.result);
      state.chatData = action.payload.result;
    },
    addMessage: (state, action: { payload: { messageData: object } }) => {
      console.log(action.payload);
      // god typescript is being mean here
      state.chatData.messages.push(action.payload);
    },
    removeMessage: (state, action: { payload: { messageId: string } }) => {
      // delete message
    },
  },
});

export function getChatData(userId, token) {
  return async (dispatch) => {
    try {
      const result = await fetch("http://localhost:8080/chat/getAllChats", {
        method: "POST",
        body: JSON.stringify({ userId: userId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const data = await result.json();

      dispatch(initilizeChatList(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getChatInfo(chatId: string, token: string) {
  return async (dispatch) => {
    try {
      const result = await fetch(
        "http://localhost:8080/chat/getChat/" + chatId,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const data = await result.json();

      dispatch(initilizeChatData(data));
      dispatch(chatModeOn());
    } catch (error) {
      console.log(error);
    }
  };
}

export const {
  chatModeOn,
  chatModeOff,
  addMessage,
  removeMessage,
  initilizeChatList,
  initilizeChatData,
} = chatSlice.actions;

export default chatSlice.reducer;
