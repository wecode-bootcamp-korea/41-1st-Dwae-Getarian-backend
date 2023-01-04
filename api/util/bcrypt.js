const bcrypt = require("bcrypt");

async function encode() {
    const saltRound = 12;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
}

async function decode() {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
}

module.exports = {
    encode,
    decode
}