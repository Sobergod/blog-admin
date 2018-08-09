import RSA from "node-rsa";

let utils = {
    rsaEncrypt: function (message, key) {
        let pubkey = new RSA(key);
        let encrypted = pubkey.encrypt(message, "base64");
        return encrypted;
    }
}

export {
    utils,
}