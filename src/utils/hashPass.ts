const bcrypt = require('bcrypt');

export const passwordHash = (pass: string) => {

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(pass, salt);

    return hash;

}
