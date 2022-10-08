const axios = require('axios');

exports.homeRoutes = (req,res,next) => {
    //Make a get request to api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response) {
            res.render('index', { users : response.data});
        })
        .catch(err => {
            res.status(500).render('error');
        })
}

exports.add_user = (req, res, next) => {
    res.render('add_user');
}

exports.update_user = (req, res, next) => {
    axios.get('http://localhost:3000/api/users', { params: { id: req.query.id }})
        .then(function(userdata) {
            res.render("update_user", { user: userdata.data })
        })
        .catch(err => {console.log(err)})
}