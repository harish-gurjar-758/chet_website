import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();

      return () => unsubscribeFromMessages();
    }
  }, [selectedUser?._id]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="d-flex flex-column flex-grow-1 overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column flex-grow-1 overflow-auto">
      <ChatHeader />

      <div className="flex-grow-1 overflow-auto p-3">
        {messages?.map((message) => {
          const isOwnMessage = message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              className={`d-flex mb-4 ${isOwnMessage ? "justify-content-end" : "justify-content-start"}`}
              ref={messageEndRef}
            >
              {/* Avatar */}
              <div className="me-2">
                <img
                  src={
                    isOwnMessage
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser?.profilePic || "/avatar.png"
                  }
                  alt="profile"
                  className="rounded-circle border"
                  style={{ width: "40px", height: "40px" }}
                />
              </div>

              {/* Message bubble */}
              <div className="bg-light rounded p-2 d-flex flex-column" style={{ maxWidth: "75%" }}>
                <small className="text-muted mb-1">
                  {formatMessageTime(message.createdAt)}
                </small>

                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="img-fluid rounded mb-2"
                    style={{ maxWidth: "200px" }}
                  />
                )}

                {message.text && <p className="mb-0">{message.text}</p>}
              </div>
            </div>
          );
        })}

        {/* Bottom scroll anchor */}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
