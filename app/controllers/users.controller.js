const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/users.js');
const Produtor = require('../models/produtor.js');



// Create and Save a new user
exports.createCliente = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "User cannot be empty!"
        });
    }
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            // idCliente: result._id,
            email: req.body.email,
            user: req.body.user,
            pass: req.body.pass,
            nome: req.body.nome,
            tipoUser: 0,
            morada: req.body.morada,
            contacto: req.body.contacto,
            localidade: req.body.localidade,
            nif: req.body.nif
        });

        // Save User in the database
        user.save().then(data => {
            //res.send(data)
            res.json({
                //data,
                success: true,
                message: "welcome!"
            })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });       
}


exports.CreateProdutor = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "User cannot be empty!"
        });
    }
    
    Produtor.findOne({email: req.body.email}, function(err, result) {
        if (err) {
            throw err};
        console.log(result.email);

        const user = new User({
            _id: mongoose.Types.ObjectId(),
            email: req.body.email,
            user: req.body.user,
            pass: req.body.pass,
            tipoUser: 1
        });
    
        // Save User in the database
        user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
    });
}

exports.createAdmin = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "User cannot be empty!"
        });
    }
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            email: req.body.email,
            user: req.body.nome,
            pass: req.body.pass,
            nome: req.body.nome,
            tipoUser: 2,
            contacto: req.body.contacto,
            morada: req.body.morada,
            localidade: req.body.local,
        });
        // Save User in the database
        user.save().then(data => {
            //res.send(data)
            res.json({
                //data,
                success: true,
                message: "welcome!"
            })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });       
}

exports.login = async (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "User cannot be empty!"
        })
    }
    const {email, pass} = req.body
    const resp = await User.findOne({email, pass})
    if(!resp){
            res.json({
            success: false,
            message: "Authentication Incorrect!"
        })
    }
    else{
        let token = jwt.sign({email:req.body.email},'topsecret', {expiresIn: '3h'});
        res.json({
            token,
            success: true,
            message: "welcome!"
        })
    }
}

exports.data = async (req,res) => {
    
    var decodedToken = "";
    var user = '';
    var tipo = ''; 

    let token = req.query.token;

        jwt.verify(token, 'topsecret', function(err, tokendata){
            if(err){
                user = '';
                tipo = '';
            }
            if(tokendata){
                decodedToken = tokendata;
            }
        })
        var email = decodedToken.email;
        

    User.findOne({email: decodedToken.email}, function(err, result) {
        if (err) {
            throw err};
        user = result.user;        
        tipo = result.tipoUser;
        console.log(result.user)
    return res.status(200).json({
        user,
        email,
        tipo
        });
    });
    
}

exports.findAllClientes = (req, res) => {
    User.find({ tipoUser: 0})
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Users."
        });
    });
};

exports.findAllAdmins = (req, res) => {
    User.find({ tipoUser: 2})
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Users."
        });
    });
};

exports.deleteOne = (req, res) => {
    User.remove({_id: req.body.clienteid})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "The User could not be found! ID: " + req.body.clienteid
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The User could not be found! ID: " + req.body.clienteid
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with ID: " + req.body.clienteid
        });
    });
};

exports.deleteOneAdmin = (req, res) => {
    User.deleteOne({_id: req.body.adminid})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "The admin could not be found! ID: " + req.body.adminid
            });
        }
        res.send({message: "Admin deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The admin could not be found! ID: " + req.body.adminid
            });                
        }
        return res.status(500).send({
            message: "Could not delete admin with ID: " + req.body.adminid
        });
    });
};

exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "The user could not be found! ID: " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The user could not be found! ID: " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with ID: " + req.params.userId
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "User cannot be empty!"
        });
    }

    // Find note and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "The user could not be found! ID: " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The user could not be found! ID: " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with ID: " + req.params.userId
        });
    });
}


exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "The user could not be found! ID: " + req.params.userId
            });
        }
        res.send({message: "Users deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The user could not be found! ID: " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with ID: " + req.params.userId
        });
    });
};