import { createContext, useState } from "react";

const initialState = {
  currentUser: {
    id: "",
    username: "",
    accessToken: "",
  },

  setCurrentUser: () => {},
};

const AuthContext = createContext(initialState);

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(initialState.currentUser);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContextProvider, AuthContext };
