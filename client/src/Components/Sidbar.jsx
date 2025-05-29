import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? (users || []).filter((user) => onlineUsers.includes(user._id))
    : (users || []);

  if (isUsersLoading || !Array.isArray(users)) return <SidebarSkeleton />;

  return (
    <aside className="h-100 border-end d-flex flex-column">
      <div className="border-bottom w-100 p-3">
        <div className="d-flex align-items-center gap-2">
          <Users size={24} />
          <span className="fw-medium d-none d-lg-inline">Contacts</span>
        </div>

        <div className="mt-3 d-none d-lg-flex align-items-center gap-2">
          <label className="form-check-label d-flex align-items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="form-check-input"
            />
            <span className="small">Show online only</span>
          </label>
          <span className="text-muted small">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-auto w-100 py-3 px-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`btn w-100 text-start d-flex align-items-center gap-3 mb-2 ${
              selectedUser?._id === user._id ? "bg-light border border-secondary" : "btn-light"
            }`}
          >
            <div className="position-relative mx-auto mx-lg-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="rounded-circle object-fit-cover"
                style={{ width: "48px", height: "48px" }}
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="position-absolute bottom-0 end-0 bg-success rounded-circle"
                  style={{
                    width: "10px",
                    height: "10px",
                    border: "2px solid #212529",
                  }}
                />
              )}
            </div>

            <div className="d-none d-lg-block text-start text-truncate">
              <div className="fw-medium text-truncate">{user.fullName}</div>
              <div className="small text-muted">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-muted py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
