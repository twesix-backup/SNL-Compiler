function* number()
{
    let state = 0;
    let num = '';

    do
    {
        let char = yield state;
        if(char >= 0 && char <=10)
        {
            state = 1;
            num += char;
        }
        else
        {
            state = 2;
        }
    }while(state === 1);
    return num;
}

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
let CHAR      = new Symbol('char state');
let OTHER     = new Symbol('other state');
let EXIT      = new Symbol('exit state');

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
                    state = DOT;
                    break;
                }
                if(state === ',')
                {
                    state = INCHAR;
                    break;
                }
                else
                {
                    state = OTHER;
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
                }
            }
            break;
            case DONE:
            {
                yield
                    {
                        token,
                        type: '单分界符'
                    }
            }
        }
    }while(state !== EXIT);
}