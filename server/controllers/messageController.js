const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");

const createConversation = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        if (userId === req.user._id.toString()) {
            return res.status(400).json({
                message: "You cannot start a conversation with yourself"
            });
        }

        const otherUser = await User.findById(userId);

        if (!otherUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const participants = [
            req.user._id.toString(),
            userId.toString()
        ].sort();

        let conversation = await Conversation.findOne({
            participants: {
                $all: participants,
                $size: 2
            }
        }).populate(
            "participants",
            "name email profileImage department year"
        );

        if (conversation) {
            return res.status(200).json({
                message: "Conversation already exists",
                conversation
            });
        }

        conversation = await Conversation.create({
            participants
        });

        await conversation.populate(
            "participants",
            "name email profileImage department year"
        );

        return res.status(201).json({
            message: "Conversation created successfully",
            conversation
        });
    } catch (error) {
        console.error("Create conversation error:", error.message);

        return res.status(500).json({
            message: "Server error while creating conversation"
        });
    }
};

const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            participants: req.user._id
        })
            .populate(
                "participants",
                "name email profileImage department year"
            )
            .sort({ updatedAt: -1 });

        return res.status(200).json({
            conversations
        });
    } catch (error) {
        console.error("Get conversations error:", error.message);

        return res.status(500).json({
            message: "Server error while fetching conversations"
        });
    }
};

const getMessages = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            _id: req.params.conversationId,
            participants: req.user._id
        });

        if (!conversation) {
            return res.status(403).json({
                message: "You are not a participant in this conversation"
            });
        }

        const messages = await Message.find({
            conversation: conversation._id
        })
            .populate(
                "sender",
                "name email profileImage department year"
            )
            .sort({ createdAt: 1 });

        return res.status(200).json({
            messages
        });
    } catch (error) {
        console.error("Get messages error:", error.message);

        return res.status(500).json({
            message: "Server error while fetching messages"
        });
    }
};

const sendMessage = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                message: "Message text is required"
            });
        }

        const conversation = await Conversation.findOne({
            _id: req.params.conversationId,
            participants: req.user._id
        });

        if (!conversation) {
            return res.status(403).json({
                message: "You are not a participant in this conversation"
            });
        }

        const message = await Message.create({
            conversation: conversation._id,
            sender: req.user._id,
            text: text.trim()
        });

        conversation.updatedAt = new Date();
        await conversation.save();

        const populatedMessage = await message.populate(
            "sender",
            "name email profileImage department year"
        );

        return res.status(201).json({
            message: "Message sent successfully",
            data: populatedMessage
        });
    } catch (error) {
        console.error("Send message error:", error.message);

        return res.status(500).json({
            message: "Server error while sending message"
        });
    }
};

const markMessageAsRead = async (req, res) => {
    try {
        const message = await Message.findById(
            req.params.messageId
        );

        if (!message) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        const conversation = await Conversation.findOne({
            _id: message.conversation,
            participants: req.user._id
        });

        if (!conversation) {
            return res.status(403).json({
                message: "You are not a participant in this conversation"
            });
        }

        message.read = true;
        await message.save();

        return res.status(200).json({
            message: "Message marked as read",
            data: message
        });
    } catch (error) {
        console.error("Mark message as read error:", error.message);

        return res.status(500).json({
            message: "Server error while updating message"
        });
    }
};

module.exports = {
    createConversation,
    getConversations,
    getMessages,
    sendMessage,
    markMessageAsRead
};