const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

//aggregate function
const headCount = async () => {
    const totalUsers =await User.aggregate().count('userCount');
    return totalUsers;
};

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();

            const userObj = {
                users,
                headCount: await headCount(),
            };

            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({message: 'We cannot find that friend!'})
            }

            res.json({
                user
                //should i add reactions and thoughts???
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    }, 

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({_id: req.params.userId});
            if (!user) {
                return res.status(404).json({message: 'This user does not exist!'});
            }

            const thought = await Thought.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.thoughts }},
                ///should i be using user or thoughts line 62
                { new: true}
            );
            if(!thought) { 
                return res.status(404).json({message: 'Friend deleted, but no thoughts exist!'});
            }
            res.json({message: 'Friend successfully deleted!'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addFriend(req,res) {
        console.log('Time to make some friends!');
        console.log(req.body);

        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId }},
                { runValidators: true, new: true},

            );

            if(!user) {
                return res.status(404)
                .json({ message: "This friend count notr be found :( " });
            }
            res.json({ message: 'You made a friend! (✿ ♥‿♥)'});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async terminateFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true },
            );

            if(!user) {
                return res.status(404).json({message: 'We could not find this friend!'});
            }
            res.json({messgae: 'You have TERMINATED this friend (◣_◢)'});
        } catch (err) {
            res.status(500).json(err);
        }
    },

}