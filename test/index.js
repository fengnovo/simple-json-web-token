var jwt = require('../lib/index.js'); 

var secret = 'test-secret-string';
var data = {
    text: 'test',
    exp: new Date(Date.now() + 10 * 60 * 1000).getTime() / 1000
};

console.log('before jwtEncode------------>', data);
var token = jwt.encode(data, secret);
console.log('jwtEncode token------------>', token);
var decodedData = jwt.decode(token, secret);
console.log('jwtDecoded data------------>', decodedData);
