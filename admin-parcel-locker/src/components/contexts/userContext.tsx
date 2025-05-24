import React, { useState, useContext } from 'react';
import { User, RoleDetail, Token, Credential } from '../../models/user';

export interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    user_id: 0,
    role: {} as RoleDetail,
    name: "",
    username: "",
    gender: "",
    age: 0,
    email: "",
    address: "",
    phone: "",
    accessToken: {} as Token,
    credentials: {} as Credential,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
