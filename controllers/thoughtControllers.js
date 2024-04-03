const { Thought, Reaction } = require('../models');

module.exports = {
    //get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            // .populate('thoughts')
            res.json(thoughts)
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    //get a thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId})
            // .populate('users')

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
              }
              res.json(thought)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //create a thought
    async createThought(req, res) {
        try {
            const { thoughtText, username } = req.body;
            const newThought = await Thought.create({thoughtText, username});
            res.json(newThought);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    //update a thought
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId },
                {$set: req.body},
                {new: true}

            );
            if(!updatedThought) {
                res.status(404).json({message: 'No thought found with this id'});
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //delete a thought
    async deleteThought(req,res) {
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId})
            if(!deletedThought) {
                return res.status(404).json({message: 'Hmmm... This thought doesnt exist yet.'});
            }
            res.json({message: 'Thought terminated!'})
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //add a reaction 
    async addReaction(req, res) {
        try {
            const { reactionBody, username } = req.body;
            
            // Create the reaction
            const newReaction = await Reaction.create({ reactionBody, username });
            
            // Find the corresponding thought and update it to include the new reaction
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $push: { reactions: newReaction } },
                { new: true }
            );
    
            if (!updatedThought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
    
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //delete a reaction
    async deleteReaction(req, res) {
        try {
            const deletedReaction = await Reaction.findOneAndDelete({_id: req.params.reactionId});
            if(!deletedReaction) {
                return res.status(404).json({message: 'Hmmmm.. This reaction was not found.'});
            }
            res.json({message: 'Reaction terminated!'});
        } catch (err) {
            res.status(500).json(err);
        }
    }

};
