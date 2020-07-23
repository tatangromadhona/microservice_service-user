const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        password: 'string|min:6',
        profession: 'string|optional'
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const user = await User.findOne({
        where: { email: req.body.email }
    });

    if (user) {
        return res.status(409).json({
            status: 'error',
            message: 'email has alreafy exist'
        });
    }

    const password = await bcrypt.hash(req.body.password, 10);

    const data = {
        name: req.body.password,
        email: req.body.email,
        password,
        profession: req.body.profession,
        role: 'student'
    }
console.log(data)
    const createdUser = await User.create(data);

    return res.status(201).json({
        status: 'success',
        data: {
            id: createdUser.id
        }
    });
}