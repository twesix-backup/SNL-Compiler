let tool = require('./tool');

let source_characters = tool.read_file_as_string('./source.snl');

let tokens = require('./word_analyse')(source_characters);