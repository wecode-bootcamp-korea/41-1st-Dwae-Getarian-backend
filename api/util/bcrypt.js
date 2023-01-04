const bcrypt = require("bcrypt");

async function encode() {
    const saltRound = 12;
    const hashedPassword = await bcrypt.hash(this.password, saltRound);
    return hashedPassword;
}

async function decode() {
    const result = await bcrypt.compare(this.password, this.hashedPassword);
    return result;
}

module.exports = {
    encode,
    decode
}