import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="container py-5" style={{ minHeight: "100vh" }}>
      <div className="mx-auto" style={{ maxWidth: "720px" }}>
        <div className="bg-light rounded-4 p-4 shadow-sm">
          {/* Profile Title */}
          <div className="text-center mb-4">
            <h1 className="h4 fw-semibold">Profile</h1>
            <p className="text-muted">Your profile information</p>
          </div>

          {/* Avatar Upload */}
          <div className="d-flex flex-column align-items-center gap-3 mb-4">
            <div className="position-relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="rounded-circle border"
                style={{ width: "128px", height: "128px", objectFit: "cover" }}
              />
              <label
                htmlFor="avatar-upload"
                className={`position-absolute bottom-0 end-0 btn btn-sm btn-dark rounded-circle p-2 ${isUpdatingProfile ? "disabled pulse" : ""}`}
                style={{ transform: "translate(25%, 25%)", cursor: "pointer" }}
              >
                <Camera size={16} className="text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="d-none"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <small className="text-muted">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </small>
          </div>

          {/* User Info */}
          <div className="mb-4">
            <div className="mb-3">
              <label className="form-label d-flex align-items-center gap-2 text-muted small">
                <User size={16} />
                Full Name
              </label>
              <div className="form-control bg-light border">{authUser?.fullName}</div>
            </div>

            <div className="mb-3">
              <label className="form-label d-flex align-items-center gap-2 text-muted small">
                <Mail size={16} />
                Email Address
              </label>
              <div className="form-control bg-light border">{authUser?.email}</div>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white p-4 rounded-4 border">
            <h5 className="fw-medium mb-3">Account Information</h5>
            <ul className="list-unstyled small">
              <li className="d-flex justify-content-between border-bottom py-2">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </li>
              <li className="d-flex justify-content-between py-2">
                <span>Account Status</span>
                <span className="text-success">Active</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
