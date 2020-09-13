/*Importaciones de clases */
%{
%}

/* Lexico */
%lex
%options case-sensitive

// expresiones regulares
lex_number               [0-9]+("."[0-9]+)?\b
lex_string               [\"\'\`](([^\"\'\`\\])*([\\].)*)*[\"\'\`]
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
{lex_number}       return 'val_number'
{lex_string}        return 'val_string'
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

INIT: SENTENCES EOF { return $1; }
    | EOF
    ;

SENTENCES: SENTENCES SENTENCE { $$ = $1; $$.push($2); }
        | SENTENCE            { $$ = []; $$.push($1); }
        ;



SENTENCE: FUNCTION    { $$ = $1; }
        | PRINT       { $$ = $1; }
        | GRAPH_TS    { $$ = $1; } 
        | DECLARATION { $$ = $1; }
        | ASSIGNMENT  { $$ = $1; }
        | TYPES       { $$ = $1; }
        /*TODO add
        break
        continue
        return E
        return 
        */
         
        /*TODO add recuperacion de error sintactico 
                con ; y }
        */
        ;

BLOCK:    llave_izq SENTENCES llave_der { $$ = new Block($2); }
        | llave_izq llave_der           { $$ = new Block([]); }
        ;

PUNTO_Y_COMA: punto_y_coma { $$ = ";"; }
            |              { $$ = ";"; }
            ;

FUNCTION: FUNCTION_HEAD llave_izq FUNCTION_SENTENCES llave_der { $$ = $1; }
        | FUNCTION_HEAD llave_izq llave_der                    { $$ = $1; }
        ;

FUNCTION_HEAD: function identificador par_izq par_der dos_puntos TYPE          { $$ = new Function(this._$.first_line,this._$.first_column,$2,[],$6); }
        | function identificador par_izq L_PARAMETROS par_der dos_puntos TYPE  { $$ = new Function(this._$.first_line,this._$.first_column,$2,$4,$7); }
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

PRINT: print par_izq E par_der PUNTO_Y_COMA { $$ = new Print(this._$.first_line,this._$.first_column,$3); }
    ;

GRAPH_TS: graficar_ts par_izq par_der PUNTO_Y_COMA { console.log("Si llego"); $$ = new GraphTs(this._$.first_line,this.$.first_column); } 
        ;

DECLARATION: TYPE_DECLARATION  L_ID TYPE_VARIABLE PUNTO_Y_COMA                         { $$ = new Declaration(this._$.first_line,this._$.first_column,$1,$2,$3,""); }
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE '=' E PUNTO_Y_COMA                   { $$ = new Declaration(this._$.first_line,this._$.first_column,$1,$2,$3,$5); }
        //|    TYPE_DECLARATION  L_ID TYPE_VARIABLE '=' llave_izq llave_der PUNTO_Y_COMA { $$ = new Declaration(this._$.first_line,this._$.first_column,$1,$2,$3,$5); } //TODO terminar de implentar
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE L_DIMENSION PUNTO_Y_COMA             { $$ = new DeclarationArray(this._$.first_line,this._$.first_column,$1,$2,$3,$4,""); }
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE L_DIMENSION '=' L_ARRAY PUNTO_Y_COMA { $$ = new DeclarationArray(this._$.first_line,this._$.first_column,$1,$2,$3,$4,new Value(new Type(EnumType.ARRAY,""),$6)); }
        ;

//TODO terminar de implementar
TYPE_VALUES: TYPE_VALUES coma identificador dos_puntos E {}
        | identificador dos_puntos E                     {}
        ;    

TYPES: type identificador '=' llave_izq ATTRIBUTES_TYPE llave_der PUNTO_Y_COMA { $$ = new TypeDefinition(this._$.first_line,this._$.first_column,$2,$5); }
        ;

ATTRIBUTES_TYPE: ATTRIBUTES_TYPE ATTRIBUTE_TYPE { $$ = $1; $$.push($2); }
                | ATTRIBUTE_TYPE                { $$ = []; $$.push($1); }
                ; 

ATTRIBUTE_TYPE: identificador dos_puntos TYPE END_ATTRIBUTE_TYPE               { $$ = new TypeDeclaration(this._$.first_line,this._$.first_column,$1,$3); }
                | identificador dos_puntos TYPE L_DIMENSION END_ATTRIBUTE_TYPE { $$ = new TypeDeclarationArray(this._$.first_line,this._$.first_column,$1,$3,$4); }
                ;

END_ATTRIBUTE_TYPE: coma        { $$ = $1; }
                | punto_y_coma  { $$ = $1; }
                | /* epsilon */ {$$ = ';'; }
                ;

L_ARRAY: L_ARRAY coma cor_izq L_E cor_der { $$ = $1; $$.push($3); }
        | cor_izq L_E cor_der        { $$ = []; $$.push($2); }
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
        | ID_ASSIGNMENT POST_FIXED PUNTO_Y_COMA { $$ = new Unary(this._$.first_line,this._$.first_column,$2,$1); }
        ;

ID_ASSIGNMENT: ID_ASSIGNMENT punto identificador             { $$ = $1; $$.push(new Id(this._$.first_line,this._$.first_column,$3)); }
        | ID_ASSIGNMENT punto identificador ACCESS_DIMENSION { $$ = $1; $$.push(new AccessArray(this._$.first_line,this._$.first_column,$3,$4)); }
        | identificador                                      { $$ = []; $$.push(new Id(this._$.first_line,this._$.first_column,$1)); }
        | identificador ACCESS_DIMENSION                     { $$ = []; $$.push(new AccessArray(this._$.first_line,this._$.first_column,$1,$2)); }
        ;

ACCESS_DIMENSION: ACCESS_DIMENSION cor_izq E cor_der { $$ = $1; $$.push($3); }
                | cor_izq E cor_der                  { $$ = []; $$.push($2); }
                ;

// TODO make type

/* TODO make sentences of control
        if - else
        while
        do-while
        switch - case
        for 
        for in
        for of
*/



/* EXPRESIONES */
E   : E '+'   E          { $$ = new Arithmetic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.PLUS),$1,$3); }
    | E '-'   E          { $$ = new Arithmetic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.MINUS),$1,$3); }
    | E '**'  E          { $$ = new Arithmetic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.POWER),$1,$3); }
    | E '*'   E          { $$ = new Arithmetic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.MULTIPLICATION),$1,$3); }
    | E '/'   E          { $$ = new Arithmetic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.DIVISION),$1,$3); }
    | E '%'   E          { $$ = new Arithmetic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.MODULE),$1,$3); }
    | E '&&'  E          { $$ = new Logic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.AND),$1,$3); }
    | E '||'  E          { $$ = new Logic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.OR),$1,$3); }
    | '!'     E          { $$ = new Unary(this._$.first_line, this._$.first_column, new OperationType(EnumOperationType.NOT), $2); }
    | '-' E %prec UMENOS { $$ = new Unary(this._$.first_line, this._$.first_column, new OperationType(EnumOperationType.NEGATIVE), $2);}
    | E '!='  E          { $$ = new Relational(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.DIFFERENT_THAN),$1,$3); }
    | E '=='  E          { $$ = new Relational(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.LIKE_THAN),$1,$3); }
    
    | E '>='  E          { $$ = new Relational(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.MORE_EQUAL_TO),$1,$3); }
    | E '>'   E          { $$ = new Relational(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.MORE_THAN),$1,$3); }
    
    | E '<='  E          { $$ = new Relational(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.LESS_EQUAL_TO),$1,$3); }
    | E '<'   E          { $$ = new Relational(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.LESS_THAN),$1,$3); }
    | val_number         { $$ = new Value(new Type(EnumType.NUMBER,""),$1); }
    | val_string         { $$ = new Value(new Type(EnumType.STRING,""),$1); }
    | val_verdadero      { $$ = new Value(new Type(EnumType.BOOLEAN,""),$1); }
    | val_falso          { $$ = new Value(new Type(EnumType.BOOLEAN,""),$1); }
    | val_nulo           { $$ = new Value(new Type(EnumType.NULL,""),$1); }
    | par_izq E par_der  { $$ = $2; $$.parentesis = true; }
    | cor_izq L_E cor_der{ $$ = $2; }
    | E '?' E dos_puntos E                { $$ = new Ternary(this._$.first_line,this._$.first_column,$1,$3,$5); }
    | ACCESS POST_FIXED                   { $$ = new Unary(this._$.first_line,this._$.first_column,$2,new Access(this._$.first_line,this._$.first_column,$1)); }
    | ACCESS punto pop par_izq par_der    { $$ = new ArrayFunction(this._$.first_line,this._$.first_column,new TypeArrayMethod(EnumTypeArrayMethod.POP),new Access(this._$.first_line,this._$.first_column,$1),""); }
    | ACCESS punto length par_izq par_der { $$ = new ArrayFunction(this._$.first_line,this._$.first_column,new TypeArrayMethod(EnumTypeArrayMethod.LENGTH),new Access(this._$.first_line,this._$.first_column,$1),""); }
    | ACCESS punto push par_izq E par_der { $$ = new ArrayFunction(this._$.first_line,this._$.first_column,new TypeArrayMethod(EnumTypeArrayMethod.PUSH),new Access(this._$.first_line,this._$.first_column,$1),$5); }
    | ACCESS                              { $$ = new Access(this._$.first_line,this._$.first_column,$1); }
    ;

ACCESS: ACCESS punto identificador                       { $$ = $1; $$.push(new Id(this._$.first_line,this._$.first_column,$3)); }
        | ACCESS punto identificador ACCESS_DIMENSION    { $$ = $1; $$.push(new AccessArray(this._$.first_line,this._$.first_column,$3,$4)); }
        | ACCESS punto identificador par_izq par_der     { $$ = $1; $$.push(new CallFunction(this._$.first_line,this._$.first_column,$3,[])); }
        | ACCESS punto identificador par_izq L_E par_der { $$ = $1; $$.push(new CallFunction(this._$.first_line,this._$.first_column,$3,$5)); }
        //SIMPLES
        | identificador                                  { $$ = []; $$.push(new Id(this._$.first_line,this._$.first_column,$1)); }
        | identificador ACCESS_DIMENSION                 { $$ = []; $$.push(new AccessArray(this._$.first_line,this._$.first_column,$1,$2)); }
        | identificador par_izq par_der                  { $$ = []; $$.push(new CallFunction(this._$.first_line,this._$.first_column,$1,[])); }
        | identificador par_izq L_E par_der              { $$ = []; $$.push(new CallFunction(this._$.first_line,this._$.first_column,$1,$3)); }
        ;

POST_FIXED: '--' { $$ = new OperationType(EnumOperationType.MINUS_MINUS); }
        | '++'   { $$ = new OperationType(EnumOperationType.PLUS_PLUS); }
        ;

L_E: L_E coma E { $$ = $1; $$.push($3);}
        | E     { $$ = []; $$.push($1); }
        ;