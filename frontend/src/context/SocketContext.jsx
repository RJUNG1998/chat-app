/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  const url =
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : "https://chat-app-ftw7.onrender.com";
  useEffect(() => {
    if (authUser) {
      const socket = io(url, {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
