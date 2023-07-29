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

const initialState: {
  chatMode: boolean;
  chatList: any[];
  chatData: any;
  messages: any;
  userList: any[];
} = {
  chatMode: false,
  chatList: [],
  chatData: {},
  messages: [],
  userList: [],
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
      state.chatList = [...action.payload.result];
    },
    initilizeChatData: (state, action: { payload: { result: {} } }) => {
      state.chatData = action.payload.result;
    },
    initilizeMessages: (state, action: { payload: any }) => {
      state.messages = [...action.payload];
    },
    addMessage: (state, action: { payload: any }) => {
      console.log(action.payload);

      // check if message already exists in chat if so dont add it
      const existingMessageIndex = state.messages.findIndex(
        (e) => e._id === action.payload._id
      );

      if (existingMessageIndex !== -1) {
        return;
      }

      // god typescript is being mean here
      state.messages.push(action.payload);
    },
    removeMessage: (state, action: { payload: { messageId: string } }) => {
      // delete message
    },
    initializeUsersList: (state, action: { payload: any }) => {
      // console.log(action.payload);
      state.userList = [...action.payload];
    },
  },
});

export function getChatData(userId: string, token: string) {
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

      // console.log("From thunk", data.result.messages);

      dispatch(initilizeChatData(data));
      dispatch(initilizeMessages(data.result.messages));
      dispatch(chatModeOn());
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUsersList(token: string) {
  return async (dispatch) => {
    try {
      const result = await fetch("http://localhost:8080/chat/usersAll", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await result.json();
      dispatch(initializeUsersList(data));
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
  initilizeMessages,
  initializeUsersList,
} = chatSlice.actions;

export default chatSlice.reducer;
