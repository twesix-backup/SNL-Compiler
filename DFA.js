let S         = new Symbol('initial state');
let INID      = new Symbol('identifier state');
let INNUM     = new Symbol('number state');
let DONE      = new Symbol('finish state');
let COLON     = new Symbol(': state');
let INASSIGN  = new Symbol('assigning state');
let INCOMMENT = new Symbol('comment state');
let DOT       = new Symbol('dot state');
let INRANGE   = new Symbol('array subscript range state');
let INCHAR    = new Symbol('char symbol state');
let CHAR_DONE = new Symbol('char done state');
let CHAR_NULL = new Symbol('char null state');

function* DFA()
{
    let state = S;
    let token = '';

    do
    {
        let char = yield;
        switch(state)
        {
            case S :
            {
                if(/[a-zA-z]/.test(char))
                {
                    token += char;
                    state = INID;
                    break;
                }
                if(/[0-9]/.test(char))
                {
                    token += char;
                    state = INNUM;
                    break;
                }
                if(/[+\-*\/();\[\]=<\0\s]/.test(char))
                {
                    token += char;
                    state = DONE;
                    break;
                }
                if(char === ':')
                {
                    token += char;
                    state = COLON;
                    break;
                }
                if(char === '{')
                {
                    state = INCOMMENT;
                    break;
                }
                if(char === '.')
                {
                    token += char;
                    state = DOT;
                    break;
                }
                if(state === '\'')
                {
                    token += char;
                    state = INCHAR;
                    break;
                }
                else
                {
                    state = S;
                    yield
                        {
                            type: '出错'
                        };
                    token = '';
                    break;
                }
            }
            break;
            case INID :
            {
                if(/[0-9a-zA-Z]/.test(char))
                {
                    token += char;
                    state = INID;
                    break;
                }
                else
                {
                    state = S;
                    yield
                        {
                            token,
                            type: '标识符'
                        };
                    token = '';
                    break;
                }
            }
            break;
            case INNUM :
            {
                if(/[0-9]/.test(char))
                {
                    token += char;
                    break;
                }
                else
                {
                    yield
                        {
                            token,
                            type: '无符号整数'
                        };
                    state = S;
                    token = '';
                    break;
                }
            }
            break;
            case DONE :
            {
                yield
                    {
                        token,
                        type: '单分界符'
                    };
                    state = S;
                    token = '';
                    break;
            }
            break;
            case COLON :
            {
                if(char === '=')
                {
                    token += char;
                    state = INASSIGN;
                    break;
                }
                else
                {
                    yield
                        {
                            token,
                            type: '出错'
                        };
                    token = '';
                    state = S;
                    break;
                }
            }
            case INASSIGN :
            {
                yield
                    {
                        token,
                        type: '双分界符'
                    };
                state = S;
                token = '';
                break;
            }
            case INCOMMENT :
            {
                if(char === '}')
                {
                    state = S;
                    token = '';
                    break;
                }
                else
                {
                    break;
                }
            }
            case DOT :
            {
                if(char === '.')
                {
                    token += char;
                    state = INRANGE;
                    break;
                }
                else
                {
                    state = S;
                    token = '';
                    yield
                        {
                            type: '程序结束标志'
                        };
                    break;
                }
            }
            case INRANGE :
            {
                yield
                    {
                        type: '数组下标'
                    };
                state = S;
                token = '';
                break;

            }
            case INCHAR :
            {
                if(/[0-9a-zA-Z]/.test(char))
                {
                    token += char;
                    state = CHAR_DONE;
                    break;
                }
                else
                {
                    yield
                        {
                            type: '出错'
                        };
                    state = S;
                    token = '';
                    break;
                }
            }
            case CHAR_DONE :
            {
                if(char === '\'')
                {
                    token += char;
                    state = CHAR_NULL;
                    break;
                }
                else
                {
                    token += char;
                    yield
                        {
                            token,
                            type: '出错'
                        };
                    state = S;
                    break;
                }
            }
            case CHAR_NULL :
            {
                yield
                    {
                        token,
                        type: '字符状态'
                    };
                state = S;
                token = '';
                break;
            }
            default :
            {
                state = S;
                token = '';
                yield
                    {
                        type: '出错'
                    };
                break;
            }
        }
    }while(1);
}

module.exports = DFA;