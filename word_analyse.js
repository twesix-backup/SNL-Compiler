const path = require('path');

module.exports = function(source_code)
{
    let DFA = require('./DFA')();
    let rows = source_code.split(path.sep);
    let row_number = 1;
    let result = [];
    result.push([]);

    let row = rows.shift();
    DFA.next();

    while(row)
    {
        row = row.split('');
        let char = row.shift();
        while(char)
        {
            let output = DFA.next(char);
            // console.log(output);
            if(output.value === undefined)
            {
                char = row.shift();
            }
            else
            {
                output = JSON.parse(output.value);
                if(output.type === '出错')
                {
                    console.error(`Error : ${output.value.token}`);
                    return false;
                }
                else
                {
                    DFA.next();
                    result.push(output);
                    if(output.type === '标识符')
                    {
                        console.log(output);
                    }
                }
            }
        }
        row = rows.shift();
        row_number ++;
    }

    // console.log(result);
};

let reserved_words =
    [
        'program',
        'var',
        'integer',
        'array',
        'of',
    ];

function build_token(info)
{
    switch(info.type)
    {
        case '标识符':
        {
            switch(info.token.toLowerCase())
            {
                case 'program':
                {
                    return {
                        lex: 'PROGRAM'
                    };
                }
                case 'var':
                {
                    return {
                        lex: 'VAR'
                    };
                }
                case 'integer':
                {
                    return {
                        lex: 'INTEGER'
                    }
                }
            }
        }
    }
}