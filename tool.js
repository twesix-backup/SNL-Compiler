let fs = require('fs');

module.exports.read_file_as_string = function(path)
{
    return fs.readFileSync(path).toString();
};