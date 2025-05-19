const bcrypt = require('bcrypt');

const passwordHash = (pass) => {

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(pass, salt);

    return hash;

}

module.exports = {
    passwordHash,
}