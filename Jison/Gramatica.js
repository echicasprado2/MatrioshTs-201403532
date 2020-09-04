/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var Gramatica = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,11],$V1=[1,9],$V2=[1,12],$V3=[1,13],$V4=[5,17,31,38,39],$V5=[1,34],$V6=[1,28],$V7=[1,27],$V8=[1,29],$V9=[1,30],$Va=[1,31],$Vb=[1,32],$Vc=[1,33],$Vd=[5,14,17,31,36,38,39,40],$Ve=[5,14,17,21,25,31,36,38,39,40],$Vf=[5,12,17,31,38,39],$Vg=[12,17,31],$Vh=[1,42],$Vi=[1,43],$Vj=[1,44],$Vk=[1,45],$Vl=[1,46],$Vm=[1,47],$Vn=[1,48],$Vo=[1,49],$Vp=[1,50],$Vq=[1,51],$Vr=[1,52],$Vs=[1,53],$Vt=[1,54],$Vu=[1,55],$Vv=[5,14,17,20,31,38,39,42,43,44,45,46,47,48,49,51,52,53,54,55,56],$Vw=[2,11],$Vx=[1,62],$Vy=[1,70],$Vz=[1,66],$VA=[1,67],$VB=[1,68],$VC=[1,69],$VD=[1,74],$VE=[5,11,14,17,20,25,31,36,38,39,40],$VF=[20,25],$VG=[5,14,17,20,31,38,39,42,43,48,49,51,52,53,54,55,56],$VH=[5,14,17,20,31,38,39,42,43,45,46,47,48,49,51,52,53,54,55,56],$VI=[5,14,17,20,31,38,39,48,49,51,52],$VJ=[5,14,17,20,31,38,39,48,49,51,52,53,54],$VK=[5,14,17,31,38,39,40];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INIT":3,"SENTENCES":4,"EOF":5,"SENTENCE":6,"FUNCTION":7,"PRINT":8,"DECLARATION":9,"BLOCK":10,"llave_izq":11,"llave_der":12,"PUNTO_Y_COMA":13,"punto_y_coma":14,"FUNCTION_HEAD":15,"FUNCTION_SENTENCES":16,"function":17,"identificador":18,"par_izq":19,"par_der":20,"dos_puntos":21,"TYPE":22,"L_PARAMETROS":23,"FUNCTION_SENTENCE":24,"coma":25,"PARAMETRO":26,"void":27,"number":28,"string":29,"boolean":30,"print":31,"E":32,"TYPE_DECLARATION":33,"L_ID":34,"TYPE_VARIABLE":35,"=":36,"L_DIMENSION":37,"let":38,"const":39,"cor_izq":40,"cor_der":41,"+":42,"-":43,"**":44,"*":45,"/":46,"%":47,"&&":48,"||":49,"!":50,"!=":51,"==":52,">=":53,">":54,"<=":55,"<":56,"val_number":57,"val_string":58,"val_verdadero":59,"val_falso":60,"val_nulo":61,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",11:"llave_izq",12:"llave_der",14:"punto_y_coma",17:"function",18:"identificador",19:"par_izq",20:"par_der",21:"dos_puntos",25:"coma",27:"void",28:"number",29:"string",30:"boolean",31:"print",36:"=",38:"let",39:"const",40:"cor_izq",41:"cor_der",42:"+",43:"-",44:"**",45:"*",46:"/",47:"%",48:"&&",49:"||",50:"!",51:"!=",52:"==",53:">=",54:">",55:"<=",56:"<",57:"val_number",58:"val_string",59:"val_verdadero",60:"val_falso",61:"val_nulo"},
productions_: [0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[10,3],[10,2],[13,1],[13,0],[7,4],[7,3],[15,6],[15,7],[16,2],[16,1],[24,1],[24,1],[23,3],[23,1],[26,3],[22,1],[22,1],[22,1],[22,1],[22,1],[8,5],[9,4],[9,6],[9,5],[33,1],[33,1],[34,3],[34,1],[35,2],[35,0],[37,3],[37,2],[32,3],[32,3],[32,3],[32,3],[32,3],[32,3],[32,3],[32,3],[32,2],[32,2],[32,3],[32,3],[32,3],[32,3],[32,3],[32,3],[32,1],[32,1],[32,1],[32,1],[32,1],[32,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return $$[$0-1]; 
break;
case 3:
 this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 4: case 21: case 35:
 this.$ = []; this.$.push($$[$0]); 
break;
case 5: case 6: case 7: case 36:
 this.$ = $$[$0]; 
break;
case 8:
 this.$ = new Block($$[$0-1]); 
break;
case 9:
 this.$ = new Block([]); 
break;
case 10: case 11:
 this.$ = ";"; 
break;
case 12:
 this.$ = $$[$0-3]; 
break;
case 13:
 this.$ = $$[$0-2]; 
break;
case 14:
 this.$ = new Function(this._$.first_line,this._$.first_column,$$[$0-4],[],$$[$0]); 
break;
case 15:
 this.$ = new Function(this._$.first_line,this._$.first_column,$$[$0-5],$$[$0-3],$$[$0]); 
break;
case 16: case 17:
 
break;
case 18:
 
                        stack = eval('$$');
                        for(var i = stack.length-2;i > 0; i--){
                                if(stack[i] === '{' && stack[i-1] instanceof Function){
                                        stack[i-1].addInstruction(stack[stack.length -1]);
                                        break;
                                }
                        }
                
break;
case 19:
 
                        stack = eval('$$');
                        for(var i = stack.length-2;i > 0; i--){
                                if(stack[i] === '{' && stack[i-1] instanceof Function){
                                        stack[i-1].addFunction(stack[stack.length - 1]);
                                        break;
                                }
                        }       
                
break;
case 20: case 34:
 this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 22:
 this.$ = new Parameter(this._$.first_line,this._$.first_column,$$[$0-2],$$[$0],null); 
break;
case 23:
 this.$ = new Type(EnumType.VOID,""); 
break;
case 24:
 this.$ = new Type(EnumType.NUMBER,""); 
break;
case 25:
 this.$ = new Type(EnumType.STRING,""); 
break;
case 26:
 this.$ = new Type(EnumType.BOOLEAN,""); 
break;
case 27:
 this.$ = new Type(EnumType.TYPE,$$[$0]); 
break;
case 28:
 this.$ = new Print(this._$.first_line,this._$.first_column,$$[$0-2]); 
break;
case 29:
 this.$ = new Declaration(this._$.first_line,this._$.first_column,$$[$0-3],$$[$0-2],$$[$0-1],""); 
break;
case 30:
 this.$ = new Declaration(this._$.first_line,this._$.first_column,$$[$0-5],$$[$0-4],$$[$0-3],$$[$0-1]); 
break;
case 32:
 this.$ = new DeclarationType(EnumDeclarationType.LET); 
break;
case 33:
 this.$ = new DeclarationType(EnumDeclarationType.CONST); 
break;
case 37:
 this.$ = new Type(EnumType.NULL,""); 
break;
case 38:
 this.$ = $$[$0-2] + 1; 
break;
case 39:
 this.$ = 1; 
break;
case 40:
 this.$ = new Arithmetic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.PLUS),$$[$0-2],$$[$0]); 
break;
case 41:
 this.$ = new Arithmetic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.MINUS),$$[$0-2],$$[$0]); 
break;
case 42:
 this.$ = new Arithmetic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.POWER),$$[$0-2],$$[$0]); 
break;
case 43:
 this.$ = new Arithmetic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.MULTIPLICATION),$$[$0-2],$$[$0]); 
break;
case 44:
 this.$ = new Arithmetic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.DIVISION),$$[$0-2],$$[$0]); 
break;
case 45:
 this.$ = new Arithmetic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.MODULE),$$[$0-2],$$[$0]); 
break;
case 46:
 this.$ = new Logic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.AND),$$[$0-2],$$[$0]); 
break;
case 47:
 this.$ = new Logic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.OR),$$[$0-2],$$[$0]); 
break;
case 48:
 this.$ = new Unary(this._$.first_line, this._$.first_column, new OperationType(EnumOperationType.NOT), $$[$0]); 
break;
case 49:
 this.$ = new Unary(this._$.first_line, this._$.first_column, new OperationType(EnumOperationType.NEGATIVE), $$[$0]);
break;
case 50:
 this.$ = new Relational(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.DIFFERENT_THAN),$$[$0-2],$$[$0]); 
break;
case 51:
 this.$ = new Relational(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.LIKE_THAN),$$[$0-2],$$[$0]); 
break;
case 52:
 this.$ = new Relational(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.MORE_EQUAL_TO),$$[$0-2],$$[$0]); 
break;
case 53:
 this.$ = new Relational(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.LESS_EQUAL_TO),$$[$0-2],$$[$0]); 
break;
case 54:
 this.$ = new Relational(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.LESS_THAN),$$[$0-2],$$[$0]); 
break;
case 55:
 this.$ = new Relational(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.MORE_THAN),$$[$0-2],$$[$0]); 
break;
case 56:
 this.$ = new Value(new Type(EnumType.NUMBER,""),$$[$0]); 
break;
case 57:
 this.$ = new Value(new Type(EnumType.STRING,""),$$[$0]); 
break;
case 58: case 59:
 this.$ = new Value(new Type(EnumType.BOOLEAN,""),$$[$0]); 
break;
case 60:
 this.$ = new Value(new Type(EnumType.NULL,""),$$[$0]); 
break;
case 61:
 $$[$0-1].translatedCode = "("+ $$[$0-1].translatedCode +")"; this.$ = $$[$0-1]; 
break;
}
},
table: [{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,15:8,17:$V0,31:$V1,33:10,38:$V2,39:$V3},{1:[3]},{5:[1,14],6:15,7:5,8:6,9:7,15:8,17:$V0,31:$V1,33:10,38:$V2,39:$V3},{1:[2,2]},o($V4,[2,4]),o($V4,[2,5]),o($V4,[2,6]),o($V4,[2,7]),{11:[1,16]},{19:[1,17]},{18:[1,19],34:18},{18:[1,20]},{18:[2,32]},{18:[2,33]},{1:[2,1]},o($V4,[2,3]),{7:25,8:24,12:[1,22],15:8,16:21,17:$V0,24:23,31:$V1},{19:$V5,32:26,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},o($Vd,[2,37],{35:35,21:[1,37],25:[1,36]}),o($Ve,[2,35]),{19:[1,38]},{12:[1,39]},o($Vf,[2,13]),{7:25,8:24,12:[2,17],15:8,16:40,17:$V0,24:23,31:$V1},o($Vg,[2,18]),o($Vg,[2,19]),{20:[1,41],42:$Vh,43:$Vi,44:$Vj,45:$Vk,46:$Vl,47:$Vm,48:$Vn,49:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu},{19:$V5,32:56,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},{19:$V5,32:57,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},o($Vv,[2,56]),o($Vv,[2,57]),o($Vv,[2,58]),o($Vv,[2,59]),o($Vv,[2,60]),{19:$V5,32:58,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},o($V4,$Vw,{13:59,37:61,14:$Vx,36:[1,60],40:[1,63]}),{18:[1,64]},{18:$Vy,22:65,27:$Vz,28:$VA,29:$VB,30:$VC},{18:$VD,20:[1,71],23:72,26:73},o($Vf,[2,12]),{12:[2,16]},{14:[1,75]},{19:$V5,32:76,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},{19:$V5,32:77,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},{19:$V5,32:78,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},{19:$V5,32:79,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},{19:$V5,32:80,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},{19:$V5,32:81,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},{19:$V5,32:82,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},{19:$V5,32:83,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},{19:$V5,32:84,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},{19:$V5,32:85,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},{19:$V5,32:86,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},{19:$V5,32:87,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},{19:$V5,32:88,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},{19:$V5,32:89,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},o($Vv,[2,48]),o($Vv,[2,49]),{20:[1,90],42:$Vh,43:$Vi,44:$Vj,45:$Vk,46:$Vl,47:$Vm,48:$Vn,49:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu},o($V4,[2,29]),{19:$V5,32:91,43:$V6,50:$V7,57:$V8,58:$V9,59:$Va,60:$Vb,61:$Vc},o($V4,$Vw,{13:92,14:$Vx,40:[1,93]}),o($V4,[2,10]),{41:[1,94]},o($Ve,[2,34]),o($Vd,[2,36]),o($VE,[2,23]),o($VE,[2,24]),o($VE,[2,25]),o($VE,[2,26]),o($VE,[2,27]),{21:[1,95]},{20:[1,96],25:[1,97]},o($VF,[2,21]),{21:[1,98]},o($Vf,[2,28]),o($VG,[2,40],{44:$Vj,45:$Vk,46:$Vl,47:$Vm}),o($VG,[2,41],{44:$Vj,45:$Vk,46:$Vl,47:$Vm}),o($VH,[2,42],{44:$Vj}),o($VH,[2,43],{44:$Vj}),o($VH,[2,44],{44:$Vj}),o($VH,[2,45],{44:$Vj}),o([5,14,17,20,31,38,39,48,49],[2,46],{42:$Vh,43:$Vi,44:$Vj,45:$Vk,46:$Vl,47:$Vm,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu}),o([5,14,17,20,31,38,39,49],[2,47],{42:$Vh,43:$Vi,44:$Vj,45:$Vk,46:$Vl,47:$Vm,48:$Vn,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu}),o([5,14,17,20,31,38,39,48,49,51],[2,50],{42:$Vh,43:$Vi,44:$Vj,45:$Vk,46:$Vl,47:$Vm,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu}),o($VI,[2,51],{42:$Vh,43:$Vi,44:$Vj,45:$Vk,46:$Vl,47:$Vm,53:$Vr,54:$Vs,55:$Vt,56:$Vu}),o($VI,[2,52],{42:$Vh,43:$Vi,44:$Vj,45:$Vk,46:$Vl,47:$Vm,55:$Vt,56:$Vu}),o($VI,[2,53],{42:$Vh,43:$Vi,44:$Vj,45:$Vk,46:$Vl,47:$Vm,55:$Vt,56:$Vu}),o($VJ,[2,54],{42:$Vh,43:$Vi,44:$Vj,45:$Vk,46:$Vl,47:$Vm}),o($VJ,[2,55],{42:$Vh,43:$Vi,44:$Vj,45:$Vk,46:$Vl,47:$Vm}),o($Vv,[2,61]),o($V4,$Vw,{13:99,14:$Vx,42:$Vh,43:$Vi,44:$Vj,45:$Vk,46:$Vl,47:$Vm,48:$Vn,49:$Vo,51:$Vp,52:$Vq,53:$Vr,54:$Vs,55:$Vt,56:$Vu}),o($V4,[2,31]),{41:[1,100]},o($VK,[2,39]),{18:$Vy,22:101,27:$Vz,28:$VA,29:$VB,30:$VC},{21:[1,102]},{18:$VD,26:103},{18:$Vy,22:104,27:$Vz,28:$VA,29:$VB,30:$VC},o($V4,[2,30]),o($VK,[2,38]),{11:[2,14]},{18:$Vy,22:105,27:$Vz,28:$VA,29:$VB,30:$VC},o($VF,[2,20]),o($VF,[2,22]),{11:[2,15]}],
defaultActions: {3:[2,2],12:[2,32],13:[2,33],14:[2,1],40:[2,16],101:[2,14],105:[2,15]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-sensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* Omitir */
break;
case 1:/* Omitir */
break;
case 2:/* Omitir */
break;
case 3:return '++'
break;
case 4:return '--'
break;
case 5:return 44
break;
case 6:return 42
break;
case 7:return 43
break;
case 8:return 45
break;
case 9:return 46
break;
case 10:return 47
break;
case 11:return 61
break;
case 12:return 59
break;
case 13:return 60
break;
case 14:return 53
break;
case 15:return 54
break;
case 16:return 55
break;
case 17:return 56
break;
case 18:return 52
break;
case 19:return 51
break;
case 20:return 36
break;
case 21:return 48
break;
case 22:return 49
break;
case 23:return 50
break;
case 24:return 14
break;
case 25:return 21
break;
case 26:return 'punto'
break;
case 27:return 19
break;
case 28:return 20
break;
case 29:return 11
break;
case 30:return 12
break;
case 31:return 40
break;
case 32:return 41
break;
case 33:return 25
break;
case 34:return 'ternario'
break;
case 35:return 28
break;
case 36:return 27
break;
case 37:return 30
break;
case 38:return 'type'
break;
case 39:return 39
break;
case 40:return 38
break;
case 41:return 'push'
break;
case 42:return 'pop'
break;
case 43:return 'length'
break;
case 44:return 'if'
break;
case 45:return 'else'
break;
case 46:return 'switch'
break;
case 47:return 'case'
break;
case 48:return 'default'
break;
case 49:return 'break'
break;
case 50:return 'continue'
break;
case 51:return 'return'
break;
case 52:return 'for'
break;
case 53:return 'of'
break;
case 54:return 'in'
break;
case 55:return 'while'
break;
case 56:return 'do'
break;
case 57:return 31
break;
case 58:return 'graficar_ts'
break;
case 59:return 17
break;
case 60:return 57
break;
case 61:return 58
break;
case 62:return 18
break;
case 63:return 5
break;
case 64:return 'INVALID';
break;
}
},
rules: [/^(?:(["/"]["/"].*(\r|\n|\r\n)))/,/^(?:([/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]))/,/^(?:[\s\t\r\n]+)/,/^(?:\+\+)/,/^(?:--)/,/^(?:\*\*)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:null\b)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:>=)/,/^(?:>)/,/^(?:<=)/,/^(?:<)/,/^(?:==)/,/^(?:!=)/,/^(?:=)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:!)/,/^(?:;)/,/^(?::)/,/^(?:\.)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?:\?)/,/^(?:number\b)/,/^(?:void\b)/,/^(?:boolean\b)/,/^(?:type\b)/,/^(?:const\b)/,/^(?:let\b)/,/^(?:push\b)/,/^(?:pop\b)/,/^(?:length\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:switch\b)/,/^(?:case\b)/,/^(?:default\b)/,/^(?:break\b)/,/^(?:continue\b)/,/^(?:return\b)/,/^(?:for\b)/,/^(?:of\b)/,/^(?:in\b)/,/^(?:while\b)/,/^(?:do\b)/,/^(?:console\.log\b)/,/^(?:grafica_ts\b)/,/^(?:function\b)/,/^(?:([0-9]+(\.[0-9]+)?\b))/,/^(?:([\"\'\`](([^\"\'\`\\])*([\\].)*)*[\"\'\`]))/,/^(?:([A-Za-z_\ñ\Ñ][A-Za-z_0-9\ñ\Ñ]*))/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = Gramatica;
exports.Parser = Gramatica.Parser;
exports.parse = function () { return Gramatica.parse.apply(Gramatica, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}