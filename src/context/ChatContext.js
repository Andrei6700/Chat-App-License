import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";
//  provider for ChatContext
export const ChatContext = createContext();
//useContext to access currentUser from AuthContext
export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  //   the initial state for the reducer
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };
  // the reducer will manage the chat status
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        // If the action is 'CHANGE_USER', we return a new state with updated user and chatId
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      default:
        // If the action is not recognized, we return the current state
        return state;
    }
  };
  // useReducer to create the state and dispatch function for our reducer
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  // Return the ChatContext provider that surrounds the children and provides the state and dispatch function
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
