module.exports = function(str)
{
    str = str.split('');
    let result = [];
    let char = str.shift();
    let DFA = require('./DFA')();
    while(char)
    {
        let output = DFA.next(char);
        if(output.value === undefined)
        {
            char = str.shift();
            continue;
        }
        else
        {
            output = JSON.parse(output);
            if(output.type === '出错')
            {
                console.error(`Error : ${output.value.token}`);
                return false;
            }
            else
            {
                result.push(output);
                console.log(output);
            }
        }
    }
};