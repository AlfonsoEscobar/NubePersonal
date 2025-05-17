
const login = (req, res) => {

    res.status().json({
        msg: 'Login'
    });

}

const register = (req, res) => {

    res.status().json({
        msg: 'register'
    });

}

const validateToken = (req, res) => {

    res.status().json({
        msg: 'validateToken'
    });

}


module.exports = {
    login,
    register,
    validateToken,
}
