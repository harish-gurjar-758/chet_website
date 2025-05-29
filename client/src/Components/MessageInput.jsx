import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-3 w-100">
      {imagePreview && (
        <div className="mb-3 d-flex align-items-center gap-2">
          <div className="position-relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="rounded border border-secondary"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <button
              type="button"
              className="btn btn-sm btn-light position-absolute top-0 start-100 translate-middle p-0 d-flex align-items-center justify-content-center"
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
              }}
              onClick={removeImage}
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="d-flex align-items-center gap-2">
        <div className="d-flex flex-grow-1 gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="d-none"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`btn btn-outline-secondary d-none d-sm-flex p-2`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} className={imagePreview ? "text-success" : "text-muted"} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary p-2"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
