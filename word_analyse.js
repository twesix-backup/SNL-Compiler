module.exports = function(str)
{
    str = str.split('');
    let result = [];
    let char = str.shift();
    let DFA = require('./DFA')();
    DFA.next();
    while(char)
    {
        // console.log('--------------------------------');
        // console.log(`input char : ${char}`);
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
                // console.log(output);
            }
        }
    }
    console.log(result);
};