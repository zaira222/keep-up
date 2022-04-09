const { Schema, model, Types } = require('mongoose');

const moment = require('moment');

let createdAt = moment().format('LLLL');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'reaction is required',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Username is required'
        },
        createdAt: {
            type: Date,
            default: Date.now,
           //get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            minlength: 1,
            maxlength: 280,           
            required: 'text is required',

        },
        createdAt: {
            type: Date,
            default: Date.now,
            //get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Username is required'
        },
        userId: {
            type: String,
            required: true

        },
        reactions: 
        [ReactionSchema]
        },
        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false
    }
);


ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;

});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;