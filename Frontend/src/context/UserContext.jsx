import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [search, setSearch] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [conversation, setConversation] = useState([]);
  
  const fetchMessage = async () => {
    console.log("fetchMessage called");
    if (!selectedUser) {
      console.log("No selected user");
      return;
    }
    
    try {
      const res = await fetch(`/api/message/get/${selectedUser._id}`);
      const data = await res.json();
      
      console.log("API response data:", data); // Detailed logging
      
      if (res.ok) {
        setConversation(data);
        console.log("Setting data to conversation");
      } else {
        setConversation([]);
        console.log("Error in API response:", data);
      }
      
    } catch (error) {
      console.log("Error in fetchMessage:", error);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      console.log("Triggering fetchMessage due to selectedUser change");
      fetchMessage();
    }
  }, [selectedUser]);

  useEffect(() => {
    if (search) {
      console.log("Triggering fetchMessage due to search change");
      fetchMessage();
      setSearch(false);
    }
  }, [search]);

  return (
    <UserContext.Provider value={{ search, setSearch, selectedUser, setSelectedUser, showChat, setShowChat, conversation, setConversation }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
