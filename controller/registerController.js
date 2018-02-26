const db = require("../models");

// Defining methods for the registerController
module.exports = {
    saveUser: (req, res) => {
        db.User
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    removeUser: (req, res) => {
        const userId = req.params.userId;

        db.User.findOneAndRemove({"_id": userId}, (err, response) => {
            if (err) throw err;

            db.Event.remove({userId: userId}), (err, response) => {
                if (err) throw err;

                res.send(response)
            }

            db.Event
                .remove({userId: userId})
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(422).json(err));
        })
    }
};