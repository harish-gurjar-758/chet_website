import { MessageSquare } from "lucide-react";
import '../Style/animate-bounce.css';

const NoChatSelected = () => {
    return (
        <div className="w-100 d-flex flex-column align-items-center justify-content-center p-4 bg-light flex-grow-1">
            <div className="text-center" style={{ maxWidth: '28rem' }}>
                {/* Icon Display */}
                <div className="d-flex justify-content-center mb-4">
                    <div className="position-relative">
                        <div
                            className="rounded-4 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center bounce-animation"
                            style={{ width: "4rem", height: "4rem" }}
                        >
                            <MessageSquare size={32} className="text-primary" />
                        </div>
                    </div>
                </div>

                {/* Welcome Text */}
                <h2 className="fs-4 fw-bold">Welcome to Chatty!</h2>
                <p className="text-muted">
                    Select a conversation from the sidebar to start chatting
                </p>
            </div>
        </div>
    );
};

export default NoChatSelected;
