const { Schema, model } = require('mongoose');

// User model
const userSchema =  new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual property to show number of friends
userSchema.virtual('friendCount').get(function () {
    return this.comments.length;
  });

const User = model('User', userSchema);

module.exports = User;