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

// get the message
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

export const sendMessage = (req, res)=>{}