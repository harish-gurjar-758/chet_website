import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-100 border-end d-flex flex-column">
      {/* Header */}
      <div className="border-bottom w-100 p-3">
        <div className="d-flex align-items-center gap-2">
          <Users size={24} />
          <span className="fw-medium d-none d-lg-inline">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-auto w-100 py-3 px-2">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-100 p-2 d-flex align-items-center gap-3">
            {/* Avatar skeleton */}
            <div className="position-relative mx-auto mx-lg-0">
              <div
                className="rounded-circle bg-secondary placeholder-glow"
                style={{ width: "48px", height: "48px" }}
              />
            </div>

            {/* User info skeleton (desktop only) */}
            <div className="d-none d-lg-block flex-grow-1">
              <div className="placeholder-glow mb-2">
                <span className="placeholder col-6" style={{ height: "16px" }}></span>
              </div>
              <div className="placeholder-glow">
                <span className="placeholder col-4" style={{ height: "12px" }}></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
