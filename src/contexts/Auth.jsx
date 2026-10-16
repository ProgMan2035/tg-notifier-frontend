import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [ apiUrl, setApiUrl ] = useState();
  const [ phoneNumber, setPhoneNumber ] = useState();
  const [ idInstance, setIdInstance] = useState();
  const [ apiTokenInstance, setApiTokenInstance] = useState();
  const isAuthorized = !!(idInstance && apiTokenInstance);

  return (
    <AuthContext.Provider
      value={{
        apiUrl,
        setApiUrl,
        phoneNumber,
        setPhoneNumber,
        idInstance,
        setIdInstance,
        apiTokenInstance,
        setApiTokenInstance,
        isAuthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('Auth context was used outside the AuthProvider');
  }

  return context;
}

export {
  AuthProvider,
  useAuth,
};