const bcrypt = require("bcrypt");

class hashPasswordHandler {
    constructor (password, hashedPassword) {
        this.password = password;
        this.hashedPassword = hashedPassword;
    }

    async encode() {
        const saltRound = 12;
        const hashedPassword = await bcrypt.hash(this.password, saltRound);
        return hashedPassword;
    }

    async decode() {
        const result = await bcrypt.compare(this.password, this.hashedPassword);
        return result;
    }
}

module.exports = hashPasswordHandler;