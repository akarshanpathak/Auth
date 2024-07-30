import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const socketInstance = io('https://auth-2-srv0.onrender.com/', {
        query: {
          userId: currentUser._id
        }
      });
      // console.log(socketInstance);
      setSocket(socketInstance);

      return () => {
        socketInstance.close();
      };
    } else {
      if (socket) {
        // console.log(socket);
        socket.close();
        setSocket(null);
      }
    }
  }, [currentUser]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
