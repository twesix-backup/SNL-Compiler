const tool = require('./tool');
const LL1_table = require('./LL1_table');

let source_characters = tool.read_file_as_string('./source.snl');
let token_list = require('./word_analyse')(source_characters);
// console.log(token_list);

const S = ['Program'];
const T = token_list;
// console.log(token_list);
const table = LL1_table.table;
const Vn = LL1_table.Vn;
const Vt = LL1_table.Vt;
const P = require('./generate_form');
// console.log(P);

while (1)
{
    let X1 = S[0];
    while(X1 === 'ε')
    {
        S.shift();
        X1 = S[0]
    }
    const a1 = T[0];
    if(Vt.indexOf(X1) !== -1 && X1 === a1.lex)
    {
        S.shift();
        T.shift();
        continue;
    }
    if(Vn.indexOf(X1) !== -1)
    {
        // console.log(table);
        const number = table[X1][a1.lex];
        if ( number === null )
        {
            console.log(S);
            console.log(a1);
            throw new Error('分析失败');
        }
        else
        {
            const form = P[number - 1];
            // console.log(P);
            // console.log(form);
            if ( form.left === X1)
            {
                S.shift();
                form.right.split(' ').reverse().forEach(function(e)
                {
                    S.unshift(e);
                });
                continue;
            }
            else
            {
                console.log(form);
                console.log(X1);
                throw new Error('生成式和分析表不匹配');
            }
        }
    }
    if ( S.length === 0 && T.length === 0 )
    {
        console.log('分析成功');
        break;
    }
    console.log(S);
    console.log(a1);
    throw new Error('分析失败');
}