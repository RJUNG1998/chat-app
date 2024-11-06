import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

export const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => {
        return (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIdx={idx === conversations.length - 1}
          />
        );
      })}
      {loading ? <span className="loading loading-spinner" /> : null}
    </div>
  );
};
