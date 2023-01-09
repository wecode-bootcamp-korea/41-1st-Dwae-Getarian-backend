const bcrypt = require("bcrypt");

async function encode(password) {
    const saltRound = 12;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
}

async function decode(password, hashedPassword) {
    const passwordsAreEqual = await bcrypt.compare(password, hashedPassword);
    return passwordsAreEqual;
}

module.exports = {
    encode,
    decode
}