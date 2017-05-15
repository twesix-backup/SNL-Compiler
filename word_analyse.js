const path = require('path');

module.exports = function(source_code)
{
    let DFA = require('./DFA')();
    let rows = source_code.split(/[\r\n]+/);
    let row_number = 1;
    let result = [];

    let row = rows.shift();
    DFA.next();

    while(row)
    {
        row = row.split('');
        row.push(' ');
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
                    console.error(`Error : ${output.value.token} at line ${row}`);
                    return false;
                }
                if(output.type === '程序结束标志')
                {
                    // let end =
                    //     {
                    //         lex: '#',
                    //         sem: null,
                    //         row: row_number
                    //     };
                    // result.push(end);
                    return result;
                }
                else
                {
                    DFA.next();
                    if(output.token === ' ')
                    {

                    }
                    else
                    {
                        output = build_token(output);
                        output.row = row_number;
                        // console.log(output);

                        result.push(output);
                    }
                }
            }
        }
        row = rows.shift();
        row_number ++;
    }

    console.log(result);
    return result;
};

let reserved_words =
    [
        'program',
        'var',
        'integer',
        'array',
        'of',
        'procedure',
        'begin',
        'while',
        'do',
        'if',
        'then',
        'else',
        'fi',
        'endwh',
        'end',
        'read',
        'write',
        'type',
    ];

function build_token(info)
{
    switch(info.type)
    {
        case '标识符':
        {
            let index = reserved_words.indexOf(info.token.toLowerCase());
            if( index === -1 )
            {
                return {
                    lex: 'ID',
                    sem: info.token
                };
            }
            else
            {
                return {
                    lex: reserved_words[index].toUpperCase(),
                    sem: info.token
                };
            }
        }
        case '单分界符':
        {
            if(info.token === ';')
            {
                return {
                    lex: ';',
                    sem: null
                };
            }
            if(info.token === '[')
            {
                return {
                    lex: '[',
                    sem: null
                };
            }
            if(info.token === ']')
            {
                return {
                    lex: ']',
                    sem: null
                };
            }
            if(info.token === '(')
            {
                return {
                    lex: '(',
                    sem: null
                };
            }
            if(info.token === ')')
            {
                return {
                    lex: ')',
                    sem: null
                };
            }
            if(info.token === '+')
            {
                return {
                    lex: '+',
                    sem: null
                };
            }
            if(info.token === '-')
            {
                return {
                    lex: '-',
                    sem: null
                };
            }
            if(info.token === '*')
            {
                return {
                    lex: '*',
                    sem: null
                };
            }
            if(info.token === '/')
            {
                return {
                    lex: '/',
                    sem: null
                };
            }
            if(info.token === '=')
            {
                return {
                    lex: '=',
                    sem: null
                };
            }
            if(info.token === '<')
            {
                return {
                    lex: '<',
                    sem: null
                };
            }
            if(info.token === ',')
            {
                return {
                    lex: ',',
                    sem: null
                };
            }
            else
            {
                return info;
            }
        }
        case '数组下标':
        {
            return {
                lex: '..',
                sem: null
            };
        }
        case '无符号整数':
        {
            return {
                lex: 'INTC',
                sem: info.token
            };
        }
        case '双分界符':
        {
            if(info.token === ':=')
            {
                return {
                    lex: ':=',
                    sem: null
                };
            }
            else
            {
                return info;
            }
        }
        default:
        {
            return info;
        }
    }
}