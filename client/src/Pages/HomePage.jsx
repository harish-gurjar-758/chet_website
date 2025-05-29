import React from 'react';
import Sidbar from '../Components/Sidbar';
import { useChatStore } from '../store/useChatStore';
import NoChatSelected from '../Components/NoChatSelected';
import ChatContainer from '../Components/ChatContainer';

export default function HomePage() {
  const { selectedUser } = useChatStore();
  return (
    <div className="min-vh-100 bg-light">
      <div className="d-flex justify-content-center pt-5 px-3">
        <div className="bg-white rounded shadow w-100" style={{ maxWidth: '1140px', height: 'calc(100vh - 8rem)' }}>
          <Sidbar />

          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
}
