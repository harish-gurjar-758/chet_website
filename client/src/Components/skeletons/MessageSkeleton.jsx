const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-grow-1 overflow-auto p-3">
      {skeletonMessages.map((_, idx) => {
        const isOwnMessage = idx % 2 !== 0;

        return (
          <div
            key={idx}
            className={`d-flex mb-4 ${isOwnMessage ? "justify-content-end" : "justify-content-start"}`}
          >
            {/* Avatar Skeleton */}
            <div className="me-2">
              <div
                className="rounded-circle bg-secondary bg-opacity-25"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
            </div>

            {/* Message Skeleton */}
            <div className="d-flex flex-column">
              <div
                className="bg-secondary bg-opacity-25 rounded mb-2"
                style={{
                  height: "16px",
                  width: "64px",
                }}
              />
              <div
                className="bg-secondary bg-opacity-25 rounded"
                style={{
                  height: "64px",
                  width: "200px",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;
