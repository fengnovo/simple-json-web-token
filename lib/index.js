var crypto = require('crypto');

function toBase64(str) {
    return Buffer.from(str).toString('base64');
}

function fromBase64(str) {
    return Buffer.from(str, 'base64').toString();
}

function sign(input, secret) {
    return crypto.createHmac('sha256', secret).update(input).digest('base64');
}

function encode(payload, secret) {
    var header = {
        alg: 'sha256',
        typ: 'JWT'
    };
    var headerSegment = toBase64(JSON.stringify(header));
    var payloadSegment = toBase64(JSON.stringify(payload));
    var signSegment = sign([headerSegment, payloadSegment].join('.'), secret);
    return [headerSegment, payloadSegment, signSegment].join('.');
}

function decode(token, secret) {
    var args = token.split('.');
    var headerSegment = args[0],
        payloadSegment = args[1],
        signSegment = args[2];
    if (sign([headerSegment, payloadSegment].join('.'), secret) !== signSegment) {
        throw new Error('verify fail');
    }
    var payload = JSON.parse(fromBase64(payloadSegment));
    var exp = payload.exp;
    if (Date.now() / 1000 >= exp) {
        throw new Error('token exprires time');
    }
    return payload;
}

module.exports = {
    encode: encode,
    decode: decode
}