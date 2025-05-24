import { createContext, useState } from "react";

interface ContextProps {
  isInputFocused: boolean;
  setInputFocused: (isFocused: boolean) => void;
}

export const SearchHomeContext = createContext<ContextProps>({} as any);

export const SearchHomeProvider = ({ children }: any) => {
  const [isInputFocused, setInputFocused] = useState(false);

  return (
    <SearchHomeContext.Provider value={{ isInputFocused, setInputFocused }}>{children}</SearchHomeContext.Provider>
  );
};
