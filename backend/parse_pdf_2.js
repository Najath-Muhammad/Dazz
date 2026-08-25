const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('../Dazz Tradlink CP.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('pdf-content-2.txt', data.text);
    console.log('PDF extracted to pdf-content-2.txt');
}).catch(function(err) {
    console.log(err);
});
