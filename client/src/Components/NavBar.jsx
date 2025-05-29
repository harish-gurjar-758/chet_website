import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-light border-bottom fixed-top z-4 bg-opacity-75 backdrop-blur">
      <div className="container-fluid px-3" style={{ height: "4rem" }}>
        <div className="d-flex align-items-center justify-content-between h-100">
          {/* Brand */}
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none text-dark">
            <div className="d-flex align-items-center justify-content-center rounded bg-primary bg-opacity-10" style={{ width: "2.25rem", height: "2.25rem" }}>
              <MessageSquare size={20} className="text-primary" />
            </div>
            <h1 className="fs-5 fw-bold mb-0">Chatty</h1>
          </Link>

          {/* Right Side Buttons */}
          <div className="d-flex align-items-center gap-2">
            <Link to="/settings" className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2">
              <Settings size={16} />
              <span className="d-none d-sm-inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to="/profile" className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2">
                  <User size={18} />
                  <span className="d-none d-sm-inline">Profile</span>
                </Link>

                <button className="btn btn-sm btn-outline-danger d-flex align-items-center gap-2" onClick={logout}>
                  <LogOut size={18} />
                  <span className="d-none d-sm-inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
