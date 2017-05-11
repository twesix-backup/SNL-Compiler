module.exports =
    {
        Program: 'ProgramHead DeclarePart ProgramBody',
        ProgramHead: 'PROGRAM ProgramName',
        ProgramName: 'ID',

        DeclarePart: 'TypeDecpart VarDecpart ProcDecpart',

        TypeDecpart: 'ε | TypeDec',
        TypeDec: 'TYPE TypeDecList',
        TypeDecList: 'TypeId = TypeDef; TypeDecMore',
        TypeDecMore: 'ε | TypeDecList',
        TypeId: 'ID',

        TypeDef: 'BaseType | StructureType | ID',
        BaseType: 'INTEGER | CHAR',
        StructureType: 'ArrayType | RecType',
        ArrayType: 'Array [low..top] OF BaseType',
        Low: 'INTC',
        Top: 'INTC',
        RecType: 'RECORD FieldDecList END',
        FieldDecList: 'BaseType IdList;FieldDecMore | ArrayType IdList; FieldDecMore',
        FieldDecMore: 'ε | FieldDecList',
        IdList: 'ID IdMore',
        IdMore: 'ε |,IdList',

        VarDecpart: 'ε | VarDec',
        VarDec: 'VAR VarDecList',
        VarDecMore: 'ε | VarDecList',
        VarIdList: 'ID VarIdMore',
        VarIdMore: 'ε |,VarIdList',

        ProcDecpart: 'ε | ProcDec',
        ProcDec: 'PROCEDURE ProName(ParamList) ; ProcDecPart ProcBody ProcDecMore',
        ProcDecMore: 'ε | ProcDeclaration',
        ProcName: 'ID',

        ParamList: 'ε | ParamDecList',
        ParamDecList: 'Param ParamMore',
        ParamMore: 'ε |;ParamDecList',
        Param: 'TypeDef FormList | VAR TypeDef FormList',
        FormList: 'ID FidMore'
    };