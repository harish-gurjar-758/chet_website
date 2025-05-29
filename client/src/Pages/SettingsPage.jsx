import { useEffect, useState } from "react";
import { THEMES } from "../constants";
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const { getUsers } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();

  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    getUsers();
    setOnlineCount(onlineUsers.length);
  }, [onlineUsers]);

  const initials = authUser?.username
    ? authUser.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <div className="container py-5" style={{ minHeight: "100vh" }}>
      {/* Theme Selection */}
      <div className="mb-4">
        <h2 className="h5 fw-semibold">Theme</h2>
        <p className="text-muted small">Choose a theme for your chat interface</p>
      </div>

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-2 mb-5">
        {THEMES.map((t) => (
          <div key={t} className="col">
            <button
              className={`btn w-100 p-2 text-center ${theme === t ? "bg-light" : "btn-outline-light"}`}
              onClick={() => setTheme(t)}
            >
              <div
                className="position-relative w-100 rounded overflow-hidden mb-1"
                data-theme={t}
                style={{ height: "32px" }}
              >
                <div className="d-flex justify-content-between h-100 px-1">
                  <div className="flex-fill rounded bg-primary me-1"></div>
                  <div className="flex-fill rounded bg-secondary me-1"></div>
                  <div className="flex-fill rounded bg-success me-1"></div>
                  <div className="flex-fill rounded bg-dark"></div>
                </div>
              </div>
              <small className="text-truncate d-block">{t.charAt(0).toUpperCase() + t.slice(1)}</small>
            </button>
          </div>
        ))}
      </div>

      {/* Online Count */}
      <div className="mb-4">
        <h3 className="h5 fw-semibold">Online Users</h3>
        <p className="text-muted small">Currently online: <strong>{onlineCount}</strong></p>
      </div>

      {/* Preview Chat */}
      <h3 className="h5 fw-semibold mb-3">Preview</h3>
      <div className="card border shadow-sm">
        <div className="card-header bg-light">
          <div className="d-flex align-items-center gap-2">
            {authUser?.profilePic ? (
              <img
                src={authUser.profilePic}
                alt={authUser.username}
                className="rounded-circle"
                style={{ width: "32px", height: "32px", objectFit: "cover" }}
              />
            ) : (
              <div
                className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                style={{ width: "32px", height: "32px" }}
              >
                {initials}
              </div>
            )}
            <div>
              <h6 className="mb-0">{authUser?.username || "User"}</h6>
              <small className="text-muted">Online</small>
            </div>
          </div>
        </div>

        <div className="card-body overflow-auto" style={{ maxHeight: "200px", minHeight: "200px" }}>
          {PREVIEW_MESSAGES.map((message) => (
            <div
              key={message.id}
              className={`d-flex ${message.isSent ? "justify-content-end" : "justify-content-start"} mb-3`}
            >
              <div
                className={`p-2 rounded shadow-sm ${
                  message.isSent ? "bg-primary text-white" : "bg-light"
                }`}
                style={{ maxWidth: "80%" }}
              >
                <p className="mb-1 small">{message.content}</p>
                <small className={`d-block ${message.isSent ? "text-white-50" : "text-muted"}`}>
                  12:00 PM
                </small>
              </div>
            </div>
          ))}
        </div>

        <div className="card-footer bg-white">
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Type a message..."
              value="This is a preview"
              readOnly
            />
            <button className="btn btn-primary btn-sm d-flex align-items-center justify-content-center">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
