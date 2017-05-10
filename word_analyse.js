module.exports = function(str)
{
    str = str.split('');
    let result = [];
    let row = 1;
    result.push([]);
    let char = str.shift();
    let DFA = require('./DFA')();
    DFA.next();
    while(char)
    {
        let output = DFA.next(char);
        // console.log(output);
        if(output.value === undefined)
        {
            char = str.shift();
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
    // console.log(result);
};

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