const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            280 character maximum 
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: Use a getter method to format the timestamp on query 
        }
    }
)


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            Must be between 1 and 280 characters 
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: Use a getter method to format the timestamp on query 
        },
        username: {
            type: String,
            required: true
        },
        reactions: {
            (These are like replies) Array of nested documents created with the reactionSchema
        }
    }
);

Schema Settings 

Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query. 

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;