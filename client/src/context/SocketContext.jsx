import { createContext, useEffect } from "react";
import {io} from "socket.io-client";
import { useState } from "react";
import {AuthContext} from "../context/AuthContext";
import { useContext } from "react";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("https://findus-mern.onrender.com"));
  }, []);

  useEffect(() => {
  currentUser && socket?.emit("newUser", currentUser.id);
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};