import React, { createContext, useState } from 'react';

const UserContext = createContext(null);
const { Provider } = UserContext;

export const initialUserState = {
  email: '',
  username: '',
  uid: null,
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserState);

  return <Provider value={[user, setUser]}>{children}</Provider>;
};

export { UserContext, UserProvider };
