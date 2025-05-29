import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="border-bottom p-2">
      <div className="d-flex align-items-center justify-content-between">
        {/* Left: Avatar + User Info */}
        <div className="d-flex align-items-center gap-2">
          {/* Avatar */}
          <div className="me-2">
            <div
              className="rounded-circle overflow-hidden border"
              style={{ width: "40px", height: "40px" }}
            >
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="img-fluid w-100 h-100 object-fit-cover"
              />
            </div>
          </div>

          {/* User Info */}
          <div>
            <h6 className="mb-0">{selectedUser.fullName}</h6>
            <small className="text-muted">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </small>
          </div>
        </div>

        {/* Close Button */}
        <button className="btn btn-sm btn-light" onClick={() => setSelectedUser(null)}>
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
