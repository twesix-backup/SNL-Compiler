let tool = require('./tool');

let source_characters = tool.read_file_as_string('./source.snl');
console.log(source_characters.length);