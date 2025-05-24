import { createContext, useReducer } from "react";

interface RecipientInfo {
  recipientFullName: string;
  recipientPrefix: string;
  recipientEmail: string;
  recipientPhone: string;
  recipientAddress: string;
  lockerId: number;
}

interface SenderInfo {
  senderFullName: string;
  senderPrefix: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress: string; //locker address
  lockerId: number;
}

interface SendingType {
  type: string;
  textFrom: string;
  textTo: string;
  iconFrom: string;
  iconTo: string;
  home: boolean;
}
interface ParcelSize {
  icon: string;
  width: number;
  height: number;
  length: number;
  weight: number;
  recomendedSize: string;
}

interface ParcelType {
  type: string[];
  text: string[];
}

interface ContextProps {
  recipientInfo: RecipientInfo;
  setRecipientInfo: (recipientInfo: RecipientInfo) => void;

  senderInfo: SenderInfo;
  setSenderInfo: (senderInfo: SenderInfo) => void;

  parcel: {
    sendingType: SendingType | undefined;
    parcelSize: ParcelSize | undefined;
    parcelType: ParcelType;
  };
  setSendingType: (sendingType: SendingType) => void;
  setParcelSize: (size: ParcelSize) => void;
  setParcelType: (type: ParcelType) => void;
}

export const Context = createContext<ContextProps>({} as any);

type StateWithoutFunction = Omit<
  ContextProps,
  "setRecipientInfo" | "setSendingType" | "setParcelSize" | "setSenderInfo"
>;

const initialState: StateWithoutFunction = {
  recipientInfo: {
    recipientFullName: "",
    recipientPrefix: "",
    recipientEmail: "",
    recipientPhone: "",
    recipientAddress: "",
    lockerId: 0
  },
  senderInfo: {
    senderFullName: "",
    senderPrefix: "",
    senderEmail: "",
    senderPhone: "",
    senderAddress: "",
    lockerId: 0
  },
  parcel: {
    sendingType: undefined,
    parcelSize: undefined,
    parcelType: {
      type: [],
      text: []
    }
  },
  setParcelType: function (type: ParcelType): void {
    throw new Error("Function not implemented.");
  }
};

export enum ActionType {
  SET_RECIPIENT_INFO = "setRecipientInfo",
  SET_SENDING_TYPE = "setSendingType",
  SET_PARCEL_SIZE = "setParcelSize",
  SET_SENDER_INFO = "setSenderInfo",
  SET_PARCEL_TYPE = "setParcelType"
}

function reducer(state: StateWithoutFunction, action: { type: ActionType; payload: any }) {
  switch (action.type) {
    case ActionType.SET_RECIPIENT_INFO:
      return { ...state, recipientInfo: action.payload };
    case ActionType.SET_SENDING_TYPE:
      return {
        ...state,
        parcel: { ...state.parcel, sendingType: action.payload }
      };
    case ActionType.SET_PARCEL_SIZE:
      return {
        ...state,
        parcel: { ...state.parcel, parcelSize: action.payload }
      };
    case ActionType.SET_SENDER_INFO:
      return { ...state, senderInfo: action.payload };
    case ActionType.SET_PARCEL_TYPE:
      return {
        ...state,
        parcel: { ...state.parcel, parcelType: action.payload }
      };
    default:
      return state;
  }
}

export const ParcelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  function setRecipientInfo(recipientInfo: RecipientInfo) {
    dispatch({ type: ActionType.SET_RECIPIENT_INFO, payload: recipientInfo });
  }
  function setSendingType(sendingType: SendingType) {
    dispatch({ type: ActionType.SET_SENDING_TYPE, payload: sendingType });
  }
  function setParcelSize(size: ParcelSize) {
    dispatch({ type: ActionType.SET_PARCEL_SIZE, payload: size });
  }
  function setSenderInfo(senderInfo: SenderInfo) {
    dispatch({ type: ActionType.SET_SENDER_INFO, payload: senderInfo });
  }
  function setParcelType(type: ParcelType) {
    dispatch({ type: ActionType.SET_PARCEL_TYPE, payload: type });
  }
  const { recipientInfo, parcel } = state;

  return (
    <Context.Provider
      value={{
        recipientInfo,
        setSenderInfo,
        parcel,
        setSendingType: setSendingType,
        setParcelSize: setParcelSize,
        senderInfo: state.senderInfo,
        setRecipientInfo: setRecipientInfo,
        setParcelType: setParcelType
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const ParcelContext = {
  Context,
  ParcelProvider
};
