/*Importaciones de clases */
%{
%}

/* Lexico */
%lex
%options case-sensitive

// expresiones regulares
lex_number               [0-9]+("."[0-9]+)?\b
lex_string_vacio         \"\"
lex_string               [\"\'\`](([^\"\'\`\\])*([\\].)*)*[\"\'\`] // FIXME no funciona para ""
lex_identificador        [A-Za-z_\ñ\Ñ][A-Za-z_0-9\ñ\Ñ]*
lex_comentariounilinea   ["/"]["/"].*(\r|\n|\r\n)
lex_comentariomultilinea [/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]

%%

//ignorar de archivo 
{lex_comentariounilinea}    /* Omitir */
{lex_comentariomultilinea}  /* Omitir */
[\s\t\r\n]+                 /* Omitir */

//aritmeticos
"++" return '++'
"--" return '--'
"**" return '**'
"+"  return '+'
"-"  return '-'
"*"  return '*'
"/"  return '/'
"%"  return '%'

//valores
"null"  return 'val_nulo'
"true"  return 'val_verdadero'
"false" return 'val_falso'

//relacionales
">=" return '>='
">"  return '>'
"<=" return '<='
"<"  return '<'

//comparacion
"=="  return '=='
"!="  return '!='
"="   return '='

//logicos
"&&" return '&&'
"||" return '||'
"!" return '!'

//simbolos
";"  return 'punto_y_coma'
":"  return 'dos_puntos'
"."  return 'punto'
"("  return 'par_izq'
")"  return 'par_der'
"{"  return 'llave_izq'
"}"  return 'llave_der'
"["  return 'cor_izq'
"]"  return 'cor_der'
","  return 'coma'
"?"  return '?'

//PALABRAS RESERVADAS
"number"      return 'number'
"void"        return 'void'
"boolean"     return 'boolean'
"type"        return 'type'

"const"       return 'const'
"let"         return 'let'
"push"        return 'push'
"pop"         return 'pop'
"length"      return 'length'

"if"          return 'if'
"else"        return 'else'
"switch"      return 'switch'
"case"        return 'case'
"default"     return 'default'
"break"       return 'break'
"continue"    return 'continue'
"return"      return 'return'
"for"         return 'for'
"of"          return 'of'
"in"          return 'in'
"while"       return 'while'
"do"          return 'do'

"console.log" return 'print'
"graficar_ts"  return 'graficar_ts'
"function"    return 'function'

//valores expresiones regulares
{lex_number}        return 'val_number'
{lex_string}        return 'val_string'
{lex_string_vacio}  return 'val_string_vacio'
{lex_identificador} return 'identificador'
<<EOF>> return 'EOF'

/* ERROR */
.       return 'INVALID';

/lex

%right '='
%right '?' ':'
%left '||'
%left '&&'
%left '!='
%left '==' 
%nonassoc '>' '>='
%nonassoc '<' '<='
%left '+' '-'
%left '*' '/' '%'
%right '**'
%right '!'
%right UMENOS
%right '++'
%right '--'
%right '('
%left ')'
%left '['
%left ']'
%left '{'
%left '}'
%left 'EOF'

//TODO add error lexico

%start INIT

%ebnf

%%

/* GRAMATICA */

INIT: SENTENCES EOF { var ast = new NodeGraphAST("INICIO",NumberNode.getNumber()); ast.children.push($1); return ast; }
    | EOF
    ;

SENTENCES: SENTENCES SENTENCE { $$ = new NodeGraphAST("SENTENCIAS",NumberNode.getNumber()); $$.children.push($1,$2); }
        | SENTENCE            { $$ = $1; }
        ;

SENTENCE: FUNCTION           { $$ = $1; }
        | PRINT              { $$ = $1; }
        | GRAPH_TS           { $$ = $1; } 
        | DECLARATION        { $$ = $1; }
        | ASSIGNMENT         { $$ = $1; }
        | TYPES              { $$ = $1; }
        | SENTENCE_IF        { $$ = $1; }
        | SENTENCE_WHILE     { $$ = $1; }
        | SENTENCE_DO_WHILE  { $$ = $1; }
        | SENTENCE_SWITCH    { $$ = $1; }
        | SENTENCE_FOR       { $$ = $1; }
        | RETURN             { $$ = $1; }
        | BREAK              { $$ = $1; }
        | CONITNUE           { $$ = $1; }
        | CALL_FUNCTION      { $$ = $1; }
        // | error punto_y_coma { $$ = new InstructionError(); }
        // | error llave_der       { $$ = $1; cosole.log("error recuperacion con }"); }
        ;

CALL_FUNCTION:    identificador par_izq L_E par_der PUNTO_Y_COMA { $$ = new CallFunction(this._$.first_line,this._$.first_column,$1,$3,true); }
                | identificador par_izq par_der     PUNTO_Y_COMA { $$ = new CallFunction(this._$.first_line,this._$.first_column,$1,[],true); }
                ;

BREAK: break PUNTO_Y_COMA { $$ = new Break(this._$.first_line,this._$.first_column); }
        ;

CONITNUE: continue PUNTO_Y_COMA { $$ = new Continue(this._$.first_line,this._$.first_column); }
        ;

RETURN:  return punto_y_coma    { $$ = new Return(this._$.first_line,this._$.first_column,"",false); }
        | return E punto_y_coma { $$ = new Return(this._$.first_line,this._$.first_column,$2,true); }
        ;

BLOCK:    llave_izq SENTENCES llave_der { $$ = new Block($2); }
        | llave_izq llave_der           { $$ = new Block([]); }
        ;

PUNTO_Y_COMA: punto_y_coma { $$ = ";"; }
            |/* epsilon */ { $$ = ";"; }
            ;

FUNCTION: FUNCTION_HEAD llave_izq FUNCTION_SENTENCES llave_der { $$ = $1; }
        | FUNCTION_HEAD llave_izq llave_der                    { $$ = $1; }
        ;

FUNCTION_HEAD: function identificador par_izq par_der dos_puntos TYPE          { $$ = new Function(this._$.first_line,this._$.first_column,$2,[],$6); }
        | function identificador par_izq L_PARAMETROS par_der dos_puntos TYPE  { $$ = new Function(this._$.first_line,this._$.first_column,$2,$4,$7); }
        | function identificador par_izq par_der                               { $$ = new Function(this._$.first_line,this._$.first_column,$2,[],new Type(EnumType.VOID,"")); }
        | function identificador par_izq L_PARAMETROS par_der                  { $$ = new Function(this._$.first_line,this._$.first_column,$2,$4,new Type(EnumType.VOID,"")); }
        ;

FUNCTION_SENTENCES: FUNCTION_SENTENCE FUNCTION_SENTENCES   { }
                | FUNCTION_SENTENCE                        { }
                ;
    
FUNCTION_SENTENCE: PRINT    
                { 
                        stack = eval('$$');
                        for(var i = stack.length-2;i > 0; i--){
                                if(stack[i] === '{' && stack[i-1] instanceof Function){
                                        stack[i-1].addInstruction(stack[stack.length -1]);
                                        break;
                                }
                        }
                }
                | GRAPH_TS
                { 
                        stack = eval('$$');
                        for(var i = stack.length-2;i > 0; i--){
                                if(stack[i] === '{' && stack[i-1] instanceof Function){
                                        stack[i-1].addInstruction(stack[stack.length -1]);
                                        break;
                                }
                        }
                }
                | DECLARATION 
                { 
                        stack = eval('$$');
                        for(var i = stack.length-2;i > 0; i--){
                                if(stack[i] === '{' && stack[i-1] instanceof Function){
                                        stack[i-1].addInstruction(stack[stack.length -1]);
                                        break;
                                }
                        }
                }
                | ASSIGNMENT
                { 
                        stack = eval('$$');
                        for(var i = stack.length-2;i > 0; i--){
                                if(stack[i] === '{' && stack[i-1] instanceof Function){
                                        stack[i-1].addInstruction(stack[stack.length -1]);
                                        break;
                                }
                        }
                }
                | SENTENCE_IF 
                { 
                        stack = eval('$$');
                        for(var i = stack.length-2;i > 0; i--){
                                if(stack[i] === '{' && stack[i-1] instanceof Function){
                                        stack[i-1].addInstruction(stack[stack.length -1]);
                                        break;
                                }
                        }
                }
                | SENTENCE_WHILE    
                { 
                        stack = eval('$$');
                        for(var i = stack.length-2;i > 0; i--){
                                if(stack[i] === '{' && stack[i-1] instanceof Function){
                                        stack[i-1].addInstruction(stack[stack.length -1]);
                                        break;
                                }
                        }
                }
                | SENTENCE_DO_WHILE 
                { 
                        stack = eval('$$');
                        for(var i = stack.length-2;i > 0; i--){
                                if(stack[i] === '{' && stack[i-1] instanceof Function){
                                        stack[i-1].addInstruction(stack[stack.length -1]);
                                        break;
                                }
                        }
                }
                | SENTENCE_SWITCH  
                { 
                        stack = eval('$$');
                        for(var i = stack.length-2;i > 0; i--){
                                if(stack[i] === '{' && stack[i-1] instanceof Function){
                                        stack[i-1].addInstruction(stack[stack.length -1]);
                                        break;
                                }
                        }
                }
                | SENTENCE_FOR    
                { 
                        stack = eval('$$');
                        for(var i = stack.length-2;i > 0; i--){
                                if(stack[i] === '{' && stack[i-1] instanceof Function){
                                        stack[i-1].addInstruction(stack[stack.length -1]);
                                        break;
                                }
                        }
                }
                | RETURN         
                { 
                        stack = eval('$$');
                        for(var i = stack.length-2;i > 0; i--){
                                if(stack[i] === '{' && stack[i-1] instanceof Function){
                                        stack[i-1].addInstruction(stack[stack.length -1]);
                                        break;
                                }
                        }
                }
                | BREAK       
                { 
                        stack = eval('$$');
                        for(var i = stack.length-2;i > 0; i--){
                                if(stack[i] === '{' && stack[i-1] instanceof Function){
                                        stack[i-1].addInstruction(stack[stack.length -1]);
                                        break;
                                }
                        }
                }
                | CONITNUE  
                { 
                        stack = eval('$$');
                        for(var i = stack.length-2;i > 0; i--){
                                if(stack[i] === '{' && stack[i-1] instanceof Function){
                                        stack[i-1].addInstruction(stack[stack.length -1]);
                                        break;
                                }
                        }
                }
                | CALL_FUNCTION
                {
                        stack = eval('$$');
                        for(var i = stack.length-2;i > 0; i--){
                                if(stack[i] === '{' && stack[i-1] instanceof Function){
                                        stack[i-1].addInstruction(stack[stack.length -1]);
                                        break;
                                }
                        }
                }
                | FUNCTION  
                { 
                        stack = eval('$$');
                        for(var i = stack.length-2;i > 0; i--){
                                if(stack[i] === '{' && stack[i-1] instanceof Function){
                                        stack[i-1].addFunction(stack[stack.length - 1]);
                                        break;
                                }
                        }       
                }
                // | error punto_y_coma 
                // { 
                //         stack = eval('$$');
                //         for(var i = stack.length-2;i > 0; i--){
                //                 if(stack[i] === '{' && stack[i-1] instanceof Function){
                //                         stack[i-1].addFunction(new InstructionError());
                //                         break;
                //                 }
                //         }
                // }
                ;

L_PARAMETROS: L_PARAMETROS coma PARAMETRO  { $$ = $1; $$.push($3); }
            | PARAMETRO                    { $$ = []; $$.push($1); }
            ;

PARAMETRO: identificador dos_puntos TYPE { $$ = new Parameter(this._$.first_line,this._$.first_column,$1,$3,null); }
        ;

TYPE: void          { $$ = new Type(EnumType.VOID,""); }
    | number        { $$ = new Type(EnumType.NUMBER,""); }
    | string        { $$ = new Type(EnumType.STRING,""); }
    | boolean       { $$ = new Type(EnumType.BOOLEAN,""); }
    | identificador { $$ = new Type(EnumType.TYPE,$1); }
    ;

PRINT: print par_izq E par_der PUNTO_Y_COMA { $$ = new NodeGraphAST("PRITN",NumberNode.getNumber()); $$.children.push($3); }
    ;

GRAPH_TS: graficar_ts par_izq par_der PUNTO_Y_COMA { $$ = new GraphTs(this._$.first_line,this.$.first_column); } 
        ;

DECLARATION: TYPE_DECLARATION  L_ID TYPE_VARIABLE PUNTO_Y_COMA                         { $$ = new Declaration(this._$.first_line,this._$.first_column,$1,$2,$3,""); }
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE '=' E PUNTO_Y_COMA                   { $$ = new Declaration(this._$.first_line,this._$.first_column,$1,$2,$3,$5); }
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE L_DIMENSION PUNTO_Y_COMA             { $$ = new DeclarationArray(this._$.first_line,this._$.first_column,$1,$2,$3,$4,""); }
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE L_DIMENSION '=' L_ARRAY PUNTO_Y_COMA { $$ = new DeclarationArray(this._$.first_line,this._$.first_column,$1,$2,$3,$4,new Value(new Type(EnumType.ARRAY,""),$6)); }
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE '=' llave_izq L_E_TYPE llave_der PUNTO_Y_COMA { $$ = new DeclarationTypes(this._$.first_line,this._$.first_column,$1,$2,$3,$6); }
        // TODO add arrays of types
        ;

L_E_TYPE: L_E_TYPE coma E_TYPE { $$ = $1; $$.push($3); }
        | E_TYPE               { $$ = []; $$.push($1); }
        ;

E_TYPE: identificador dos_puntos E                              { $$ = new AttributeTypeAssignment(this._$.first_line,this._$.first_column,$1,$3); }
        | identificador dos_puntos llave_izq L_E_TYPE llave_der { $$ = new TypeAssignment(this._$.first_line,this._$.first_column,$1,$4);}
        ;   

TYPES: type identificador '=' llave_izq ATTRIBUTES_TYPE llave_der PUNTO_Y_COMA { $$ = new TypeDefinition(this._$.first_line,this._$.first_column,$2,$5); }
        ;

ATTRIBUTES_TYPE: ATTRIBUTES_TYPE ATTRIBUTE_TYPE { $$ = $1; $$.push($2); }
                | ATTRIBUTE_TYPE                { $$ = []; $$.push($1); }
                ; 

ATTRIBUTE_TYPE: identificador dos_puntos TYPE END_ATTRIBUTE_TYPE               { $$ = new TypeAttributeDefinition(this._$.first_line,this._$.first_column,$1,$3); }
                | identificador dos_puntos TYPE L_DIMENSION END_ATTRIBUTE_TYPE { $$ = new TypeAttributeArrayDefinition(this._$.first_line,this._$.first_column,$1,$3,$4); }
                ;

END_ATTRIBUTE_TYPE: coma        { $$ = $1; }
                | punto_y_coma  { $$ = $1; }
                | /* epsilon */ {$$ = ';'; }
                ;

L_ARRAY: L_ARRAY coma cor_izq L_E cor_der { $$ = $1; $$.push($3); }
        | cor_izq L_E cor_der             { $$ = []; $$.push($2); }
        ;

TYPE_DECLARATION: let   { $$ = new DeclarationType(EnumDeclarationType.LET); }
                | const { $$ = new DeclarationType(EnumDeclarationType.CONST); }
                ;

L_ID:     L_ID coma identificador { $$ = $1; $$.push($3); }
        | identificador           { $$ = []; $$.push($1); }
        ; 

TYPE_VARIABLE:   dos_puntos TYPE { $$ = $2; }
                | /* epsilon */  { $$ = new Type(EnumType.NULL,""); }
                ;

L_DIMENSION: L_DIMENSION cor_izq cor_der { $$ = $1 + 1; }
        | cor_izq cor_der                { $$ = 1; }
        ;

ASSIGNMENT: ID_ASSIGNMENT '=' E PUNTO_Y_COMA 
        { 
                for(var i = 0; i < $1.length;i++){
                        if($1[i] instanceof AccessArray){
                                $$ = new AssignmentArray(this._$.first_line,this.$.first_column,$1,$3);
                                return;
                        }
                }
                $$ = new Assignment(this._$.first_line,this.$.first_column,$1,$3); 
        }
        | ID_ASSIGNMENT POST_FIXED PUNTO_Y_COMA { $$ = new Unary(this._$.first_line,this._$.first_column,$2,new Access(this._$.first_line,this._$.first_column,$1),true); }
        ;

ID_ASSIGNMENT: ID_ASSIGNMENT punto identificador             { $$ = $1; $$.push(new Id(this._$.first_line,this._$.first_column,$3)); }
        | ID_ASSIGNMENT punto identificador ACCESS_DIMENSION { $$ = $1; $$.push(new AccessArray(this._$.first_line,this._$.first_column,$3,$4)); }
        | identificador                                      { $$ = []; $$.push(new Id(this._$.first_line,this._$.first_column,$1)); }
        | identificador ACCESS_DIMENSION                     { $$ = []; $$.push(new AccessArray(this._$.first_line,this._$.first_column,$1,$2)); }
        ;

SENTENCE_IF: ELSE_IF else BLOCK { $$ = new If(this._$.first_line,this._$.first_column,$1,$3,true); }
        | ELSE_IF               { $$ = new If(this._$.first_line,this._$.first_column,$1,"",false); }
        ;

ELSE_IF: ELSE_IF else if par_izq E par_der BLOCK { $$ = $1; $$.push(new BlockIf(this._$.first_line,this._$.first_column,$5,$7,true)); }
        | if par_izq E par_der BLOCK             { $$ = []; $$.push(new BlockIf(this._$.first_line,this._$.first_column,$3,$5,false)); }
        ;

SENTENCE_WHILE: while par_izq E par_der BLOCK PUNTO_Y_COMA {$$ = new While(this._$.first_line,this._$.first_column,$3,$5); }
                ;

SENTENCE_DO_WHILE: do BLOCK while par_izq E par_der punto_y_coma {$$ = new Do(this._$.first_line,this._$.first_column,$2,$5); }
                ;

SENTENCE_SWITCH: switch par_izq E par_der BLOCK_SWITCH { $$ = new Switch(this._$.first_line,this._$.first_column,$3,$5); }
                ;

BLOCK_SWITCH: llave_izq L_CASE llave_der { $$ = $2; }
        | llave_izq llave_der            { $$ = []; }
        ;

L_CASE: L_CASE CASE { $$ = $1; $$.push($2); }
        | CASE      { $$ = []; $$.push($1); }
        ;

CASE:     case E dos_puntos SENTENCES  { $$ = new CaseSwitch(this._$.first_line,this._$.first_column,$2,new Block($4),true,true); }
        | case E dos_puntos            { $$ = new CaseSwitch(this._$.first_line,this._$.first_column,$2,new Block([]),true,false); }
        | default dos_puntos SENTENCES { $$ = new CaseSwitch(this._$.first_line,this._$.first_column,"",new Block($3),false,true); }
        | default dos_puntos           { $$ = new CaseSwitch(this._$.first_line,this._$.first_column,"",new Block([]),false,false); }
        ;

SENTENCE_FOR: for par_izq TYPE_DECLARATION L_ID '=' E punto_y_coma E punto_y_coma E par_der BLOCK 
        { $$ = new For(
                this._$.first_line,
                this._$.first_column,
                new Declaration(
                        this._$.first_line,
                        this._$.first_column,
                        $3,
                        $4,
                        new Type(EnumType.NULL,""),
                        $6),
                $8,
                $10,
                $12); 
        }
        | for par_izq ID_ASSIGNMENT '=' E punto_y_coma E punto_y_coma E par_der BLOCK 
        { $$ = new For(
                this._$.first_line,
                this._$.first_column,
                new Assignment(this._$.first_line,
                        this.$.first_column,
                        $3,
                        $5),
                $7,
                $9,
                $11); 
        }
        | for par_izq identificador punto_y_coma E punto_y_coma E par_der BLOCK
        { $$ = new For(
                this._$.first_line,
                this._$.first_column,
                new Id(this._$.first_line,this._$.first_column,$3),
                $5,
                $7,
                $9); 
        }
        | for par_izq TYPE_DECLARATION L_ID in E par_der BLOCK 
        { $$ = new ForIn(
                this._$.first_line,
                this._$.first_column,
                new Declaration(
                        this._$.first_line,
                        this._$.first_column,
                        $3,
                        $4,
                        new Type(EnumType.NULL,""),
                        ""),
                $6,
                $8);
        }
        | for par_izq TYPE_DECLARATION L_ID of E par_der BLOCK 
        { $$ = new ForOf(
                this._$.first_line,
                this._$.first_column,
                new Declaration(
                        this._$.first_line,
                        this._$.first_column,
                        $3,
                        $4,
                        new Type(EnumType.NULL,""),
                        ""),
                $6,
                $8);
        }
        ;

/* EXPRESIONES */
E   : E '+'   E           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '-'   E           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '**'  E           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '*'   E           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '/'   E           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '%'   E           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '&&'  E           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '||'  E           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | '!'     E           { $$ = new NodeGraphAST($1,NumberNode.getNumber()); $$.children.push($2); }
    | '-' E %prec UMENOS  { $$ = new NodeGraphAST($1,NumberNode.getNumber()); $$.children.push($2); }
    | E '!='  E           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '=='  E           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '>='  E           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '>'   E           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '<='  E           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '<'   E           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | val_number          { $$ = new NodeGraphAST($1,NumberNode.getNumber()); }
    | val_string          { $$ = new NodeGraphAST($1,NumberNode.getNumber()); }
    | val_string_vacio    { $$ = new NodeGraphAST($1,NumberNode.getNumber()); }
    | val_verdadero       { $$ = new NodeGraphAST($1,NumberNode.getNumber()); }
    | val_falso           { $$ = new NodeGraphAST($1,NumberNode.getNumber()); }
    | val_nulo            { $$ = new NodeGraphAST($1,NumberNode.getNumber()); }
    | par_izq E par_der   { $$ = $2; }
    | cor_izq L_E cor_der { $$ = $2; }
    | E '?' E dos_puntos E                { $$ = new NodeGraphAST("TERNARIO",NumberNode.getNumber()); $$.children.push($1,$3,$5); }
    | ACCESS POST_FIXED                   { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1); }
    | ACCESS punto pop par_izq par_der    { $$ = new NodeGraphAST("FUNCTION_ARRAY",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST($3,NumberNode.getNumber())); }
    | ACCESS punto length par_izq par_der { $$ = new NodeGraphAST("FUNCTION_ARRAY",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST($3,NumberNode.getNumber())); }
    | ACCESS punto push par_izq E par_der { $$ = new NodeGraphAST("FUNCTION_ARRAY",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST($3,NumberNode.getNumber())); }
    | ACCESS                              { $$ = $1; }
    ;

ACCESS: ACCESS punto identificador                       { $$ = new NodeGraphAST("ACCESO",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST($3,NumberNode.getNumber()));}
        | ACCESS punto identificador ACCESS_DIMENSION    { $$ = new NodeGraphAST("ACCESO",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST($3,NumberNode.getNumber()),$4);}
        | ACCESS punto identificador par_izq par_der     { $$ = new NodeGraphAST("ACCESO",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST($3,NumberNode.getNumber()));}
        | ACCESS punto identificador par_izq L_E par_der { $$ = new NodeGraphAST("ACCESO",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST($3,NumberNode.getNumber()),$5);}
        | identificador                                  { $$ = new NodeGraphAST($1,NumberNode.getNumber()); }
        | identificador ACCESS_DIMENSION                 { $$ = new NodeGraphAST("ACCESO_ARRAY",NumberNode.getNumber()); $$.children.push(new NodeGraphAST($1,NumberNode.getNumber()),$3);}
        | identificador par_izq par_der                  { $$ = new NodeGraphAST("LLAMADA_FUNCION",NumberNode.getNumber()); $$.children.push(new NodeGraphAST($1,NumberNode.getNumber()));}
        | identificador par_izq L_E par_der              { $$ = new NodeGraphAST("LLAMADA_FUNCION",NumberNode.getNumber()); $$.children.push(new NodeGraphAST($1,NumberNode.getNumber()),$3); }
        ;

ACCESS_DIMENSION: ACCESS_DIMENSION cor_izq E cor_der { $$ = new NodeGraphAST("ACCESO_DIMENSION",NumberNode.getNumber()); $$.children.push($1,$3); }
                | cor_izq E cor_der                  { $2; }
                ;

POST_FIXED: '--' { $$ = "--"; }
        | '++'   { $$ = "++"; }
        ;

L_E: L_E coma E { $$ = new NodeGraphAST("LISTA_EXP",NumberNode.getNumber()); $$.children.push($1,$3);}
        | E     { $$ = $1; }
        ;