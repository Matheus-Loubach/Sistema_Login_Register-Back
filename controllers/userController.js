const User = require("../models/users");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");


//Genenate user token
const GenenateToken = (id) => {
    return jwt.sign({ id }, process.env.JWTSECRET, {
        expiresIn: "7d"
    });
};



const ServiceController = {

    // post
    register: async (req, res) => {
        const { name, email, password, passwordconf } = req.body;
        const user = await User.findOne({ name: name });
        const userEmail = await User.findOne({ email: email });

        if (user) {
            return res.status(422).json("Usuário já existe");
        }

        if (userEmail) {
            return res.status(422).json("E-mail já existe");
        }
        if (!name) {
            return res.status(422).json("Nome obrigatório");
        }

        if (!email) {
            return res.status(422).json("E-mail e senha são obrigatórios");
        }

        if(!password){
            return res.status(422).json("A senha deve ter pelo menos 8 caracteres, Letra maiúscula e um caractere especial");
        }

        if (password !== passwordconf) {
            return res.status(422).json("As senhas não correspondem");
        }

        if (password.length < 8) {
            return res.status(422).json("A senha deve ter pelo menos 8 caracteres");
        }

        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\W/.test(password)) {
            return res.status(422).json("A senha deve ter pelo menos uma letra maiúscula, uma letra minúscula e um caractere especial");
        }

        const salt = await bcrypt.genSalt(12);
        const passwordhash = await bcrypt.hash(password, salt || 12);

        try {

            //Create User
            const Users = {
                name,
                email,
                password: passwordhash,
            };

            const NewUser = await User.create(Users)

            if (!NewUser) {
                return res.status(422).json({ errors: ["Houver um erro,tente novamente mais tarde"] })

            }

            //return user with token
            res.status(200).json({
                _id: NewUser._id,
                token: GenenateToken(NewUser._id),
                msg: res.status(200).json("Cadastro Feito com sucesso"),
            })


        } catch (error) {
            console.log(`Erro post ${error}`);
        }
    },
    // rota para login
    login: async (req, res) => {
        const { name, password } = req.body;

        // procurar usuário pelo nome
        const user = await User.findOne({ name });

        if (!user) {
            return res.status(401).json({ message: 'Usuário ou Senha Incorreta' });
        }

        // verificar senha do usuário
        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
            return res.status(401).json({ message: 'Usuário ou Senha Incorreta' });
        }

        //return user with token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            token: GenenateToken(user._id),
        })

    },


    //get
    getAll: async (req, res) => {
        try {
            const services = await User.find();

            res.json(services);

        } catch (error) {
            console.log(`Erro get ${error}`);
        }
    },

    //get user by id

    getUserById: async (req, res) => {
        const { id } = req.params

        try {

            const user = await User.findById(mongoose.Types.ObjectId(id)).select("-password")
            //Check if user exists
            if (!user) {
                return res.status(404).json({ errors: ["Usuário não encontrado"] })
            }

            res.status(200).json(user);
        } catch (error) {
            return res.status(404).json({ errors: ["Usuário não encontrado"] })
        }
    },

    //get curret logged in user
    getcurrentUser: async (req, res) => {
        const user = req.user;

        res.status(200).json(user);
    },


};

module.exports = ServiceController;