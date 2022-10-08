var Userdb = require('../model/model');

//create new User and save
exports.create = (req,res,next) => {
    //validate
    if(!req.body) {
        res.status(400).send({message: 'Cannot create user'});
        return;
    }
    //new user 
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    });

    //saave user in database
    user
        .save(user)
        .then(data=> {
            //res.send(data)
            res.redirect('/');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Occured while creating new user'
            });
        });
}

//retrive and return user
exports.find = (req,res,next) => {
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if(!data) {
                    res.status(404).send({
                        message: `Cannot find user with id ${id}`
                    })
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: `Cannot retriving user id ${id}` })
            })
    } else {
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occured while retiving user" })
            });
    }
}

// update user
exports.update = (req,res,next) => {
    if(!req.body) {
       return res
        .status(400)
        .send({ message: 'Data update cann`t empty'})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({ message: `Cannot update user with id ${id}`})
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Cannot update user information!' })
        })
} 

//create new User
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}