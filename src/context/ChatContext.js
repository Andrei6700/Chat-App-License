import { createContext, useContext, useReducer } from "react";
import { AuthContext } from './AuthContext';

// Create a new context for the chat functionality
export const ChatContext = createContext();

// Define a provider component for the ChatContext
export const ChatContextProvider = ({ children }) => {
    // Use the useContext hook to access the current user from AuthContext
    const { currentUser } = useContext(AuthContext);

    // Define the initial state for the chat context
    const INITIAL_STATE = {
        chatId: "null", // Initially no chat is selected
        user: {}, // No user is selected initially
    };

    // Define a reducer for managing chat state
    const chatReducer = (state, action) => {
        switch (action.type) {
            case 'CHANGE_USER':
                // Handle changing the user and computing a unique chatId
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid
                        ? currentUser.uid + action.payload.uid
                        : action.payload.uid + currentUser.uid,
                };
            default:
                // Return the current state for any unknown actions
                return state;
        }
    };

    // Use the useReducer hook to manage the chat state with the defined reducer and initial state
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    // Render the provider, passing down the chat state and dispatch function to children
    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};