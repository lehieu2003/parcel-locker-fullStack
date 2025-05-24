import { createContext, useState } from "react";

interface ContextProps {
  isInputFocused: boolean;
  setInputFocused: (isFocused: boolean) => void;
}

export const SearchOrderHistoryContext = createContext<ContextProps>({} as any);

export const SearchOrderHistoryProvider = ({ children }: any) => {
  const [isInputFocused, setInputFocused] = useState(false);

  return (
    <SearchOrderHistoryContext.Provider value={{ isInputFocused, setInputFocused }}>
      {children}
    </SearchOrderHistoryContext.Provider>
  );
};
