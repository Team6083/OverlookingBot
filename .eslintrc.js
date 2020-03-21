module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "google",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 8
    },
    "rules": {
        "quotes": ["warn", "single"],
        "no-unused-vars": ["warn", { "vars": "all", "args": "after-used" }],
        "max-len": ["warn", { "ignoreComments": true }],
        "linebreak-style": ["warn", "unix"],
        "require-jsdoc": "off",
        "padded-blocks": "off",
        "new-cap": "warn",
        "object-curly-spacing": "off"
    }
};
