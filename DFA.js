let S         = Symbol('initial state');
let INID      = Symbol('identifier state');
let INNUM     = Symbol('number state');
let DONE      = Symbol('finish state');
let COLON     = Symbol(': state');
let INASSIGN  = Symbol('assigning state');
let INCOMMENT = Symbol('comment state');
let DOT       = Symbol('dot state');
let INRANGE   = Symbol('array subscript range state');
let INCHAR    = Symbol('char symbol state');
let CHAR_DONE = Symbol('char done state');
let CHAR_NULL = Symbol('char null state');

let DFA = function* ()
{
    let state = S;
    let token = '';
    do
    {
        let char = yield;
        // console.log(`current char : ${char}`);
        // console.log(state);
        // console.log(`current token : ${token}`);
        switch(state)
        {
            case S :
            {
                if(/[a-zA-Z]/.test(char))
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
            case DONE :
            {
                yield JSON.stringify
                (
                    {
                        token,
                        type: '单分界符'
                    }
                );
                state = S;
                token = '';
                break;
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
                    yield JSON.stringify
                    (
                        {
                            token: token,
                            type : '标识符'
                        }
                    );
                    token = '';
                    state = S;
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
                    yield JSON.stringify
                    (
                        {
                            token,
                            type: '无符号整数'
                        }
                    );
                    state = S;
                    token = '';
                    break;
                }
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
                    yield JSON.stringify
                    (
                        {
                            token,
                            type: '出错'
                        }
                    );
                    token = '';
                    state = S;
                    break;
                }
            }
            case INASSIGN :
            {
                yield JSON.stringify
                (
                    {
                        token,
                        type: '双分界符'
                    }
                );
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
                    yield JSON.stringify
                    (
                        {
                            type: '程序结束标志'
                        }
                    );
                    break;
                }
            }
            case INRANGE :
            {
                yield JSON.stringify
                (
                    {
                        type: '数组下标'
                    }
                );
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
                    yield JSON.stringify
                    (
                        {
                            type: '出错'
                        }
                    );
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
                    yield JSON.stringify
                    (
                        {
                            token,
                            type: '出错'
                        }
                    );
                    state = S;
                    break;
                }
            }
            case CHAR_NULL :
            {
                yield JSON.stringify
                (
                    {
                        token,
                        type: '出错'
                    }
                );
                state = S;
                token = '';
                break;
            }
            default :
            {
                state = S;
                token = '';
                yield JSON.stringify
                (
                    {
                        type: '出错'
                    }
                );
                break;
            }
        }
    }while(1);
};

module.exports = DFA;