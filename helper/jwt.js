const jwt = require('jsonwebtoken');

const generarJWT = (usuario) => {
    const payload = {_id: usuario._id, name: usuario.name, email: usuario.email,
        status: usuario.state, role: usuario.role
    };

    const token = jwt.sign(payload, '123456', { expiresIn: '1h' });
    return token;
};

module.exports = {
    generarJWT
};
