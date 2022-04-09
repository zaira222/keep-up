const res = require('express/lib/response');
const { Thought, User } = require('../models');

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select:  '-__v'

        })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
    
    });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .populate({
            path: 'reactions',
            select:  '-__v'

        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
   

    createThought({ params, body}, res) {
        console.log(body);
        Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));

},

    addReaction({ body, params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            {$push: { reactions: body  } },
            {new: true, runValidators: true }
            
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    removeReactions({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            {$pull: { reactions: { reactionId: params.reactionId } }  },
            {new: true }
        )
        .then(dbThoughtData => 
        res.json(dbThoughtData))

        .catch(err => res.json(err));
    
    },
updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId}, body, { new: true, runValidators: true})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
},
deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).json({ message: 'No thought with this id! '});
            return;

        }
        return User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: {thoughts: params.thoughtId }},
            {new: true }
        );
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));

}

};

module.exports = thoughtController;