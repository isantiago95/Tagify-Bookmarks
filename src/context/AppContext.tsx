import React, { createContext, useReducer, ReactNode } from 'react';
import useBookmarks from '../hooks/useBookmarks';
import { BookmarkTreeNodeProps } from '../interfaces/BookmarkProps';

export interface ModalProps {
  isOpen: boolean;
}
// Define the shape of the application state
interface AppState {
  selectedTree?: BookmarkTreeNodeProps;
  bookmarkTree: BookmarkTreeNodeProps[];
  modalProps: ModalProps;
  selectedNode?: BookmarkTreeNodeProps;
}

// Define the shape of the context properties as a tuple (array)
type AppContextProps = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
};

// Define the possible actions for the reducer
export type Action =
  | { type: 'SET_SELECTED_TREE'; payload: BookmarkTreeNodeProps }
  | { type: 'SET_BOOKMARK_TREE'; payload: AppState['bookmarkTree'] }
  | { type: 'TOGGLE_MODAL'; payload: boolean }
  | { type: 'SET_SELECTED_NODE'; payload: BookmarkTreeNodeProps };

// Define the reducer function to handle state changes
const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_SELECTED_TREE':
      return { ...state, selectedTree: action.payload };
    case 'SET_BOOKMARK_TREE':
      return { ...state, bookmarkTree: action.payload };
    case 'TOGGLE_MODAL':
      return {
        ...state,
        modalProps: { ...state.modalProps, isOpen: action.payload },
      };
    case 'SET_SELECTED_NODE': {
      return {
        ...state,
        selectedNode: action.payload,
      };
    }
    default:
      return state;
  }
};

// Define the initial state of the application
const initialState: AppState = {
  bookmarkTree: [],
  selectedTree: undefined,
  modalProps: {
    isOpen: false,
  },
  selectedNode: undefined,
};

// Define a no-op dispatch function
const noopDispatch: React.Dispatch<Action> = () => {};

// Create the context with a default value
const AppContext = createContext<AppContextProps>({
  state: initialState,
  dispatch: noopDispatch,
});

// Define the provider component
const AppProvider = ({ children }: { children: ReactNode }) => {
  // Use the custom hook to get the bookmark tree
  const { bookmarkTree } = useBookmarks();

  // Use the useReducer hook to manage the state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Dispatch the action to update the bookmarkTree whenever it changes
  React.useEffect(() => {
    dispatch({ type: 'SET_BOOKMARK_TREE', payload: bookmarkTree });
    dispatch({ type: 'SET_SELECTED_TREE', payload: bookmarkTree[0] });
  }, [bookmarkTree]);

  // Provide the state and dispatch function as an array
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
