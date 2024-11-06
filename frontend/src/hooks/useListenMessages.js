import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  const { selectedConversation } = useConversation();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (selectedConversation._id !== newMessage.senderId) return;
      setMessages([...messages, newMessage]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, [setMessages, socket, messages, selectedConversation]);
};

export default useListenMessage;
