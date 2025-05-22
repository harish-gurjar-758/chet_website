import Message from "../modules/message.module.js";
import User from "../modules/user.model.js";

// Get users for side bar..
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("_password");

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error("Error in getUsersForSidebar : ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

// get the message controller method
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const myId = req.user._id;

        const message = await Message.find({
            $or: [
                { senderId: myId, recevierId: userToChatId },
                { senderId: userToChatId, recevierId: myId }
            ]
        });

        res.status(200).json(message)
    } catch (error) {
        console.log("Error in getMessages controller : ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// send the message controller method
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: recevierId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            // Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recevierId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // todo: realtime functionality goes here => socket.io

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage controller : ", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}