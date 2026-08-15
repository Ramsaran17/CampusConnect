const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        text: {
    type: String,
    trim: true,
    maxlength: 2000,
    default: ""
},

attachment: {
    url: {
        type: String,
        default: ""
    },

    publicId: {
        type: String,
        default: ""
    },

    type: {
        type: String,
        enum: [
            "image",
            "file"
        ],
        default: ""
    },

    name: {
        type: String,
        default: ""
    }
},

        read: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Message",
    messageSchema
);