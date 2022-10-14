import React, { createContext, useState } from 'react';

const UserContext = createContext(null);
const { Provider } = UserContext;

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return <Provider value={[user, setUser]}>{children}</Provider>;
};

export { UserContext, UserProvider };
