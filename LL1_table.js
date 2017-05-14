const xlsx = require('xlsx');

const workbook = xlsx.readFile('./SNL语言文法的LL（1）分析表.xls');
const sheet2 = workbook.Sheets['Sheet2'];
// console.log(sheet2);

const Vn = [];
const Vn_index = [];
const Vt = [];
const Vt_index = [];
const table = {};

for( let i = 2 ; i <= 69 ; i ++ )
{
    let cell = sheet2[ 'A' + i ];
    Vn.push(cell.v);
    Vn_index.push(i);
}

// console.log(Vn);
// console.log(Vn_index);

{
    let curr = 0;
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for ( let i = 1 ; i < 26 ; i ++ )
    {
        let index = alphabet [ i ];
        let cell = sheet2 [ index + '1' ];
        Vt.push(cell.v.toUpperCase());
        Vt_index.push(index);
    }
    for ( let i = 0 ; i < 12 ; i ++ )
    {
        let index = 'A' + alphabet [ i ];
        let cell = sheet2[ index + '1' ];
        Vt.push(cell.v.toUpperCase());
        Vt_index.push(index);
    }
}

// console.log(Vt);
// console.log(Vt_index);

Vn.forEach(function(e, i)
{
    table[e] = {};
    Vt.forEach(function(element, index)
    {
        const id = Vt_index[index] + Vn_index[i];
        // console.log(id);
        const cell = sheet2[id];
        table[e][element] = cell ? cell.v : null;
    })
});

// console.log(table);
module.exports.table = table;
module.exports.Vn = Vn;
module.exports.Vt = Vt;