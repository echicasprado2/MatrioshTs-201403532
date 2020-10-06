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
lex_comentariounilinea   "/""/".*(\r|\n|\r\n|<<EOF>>)
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
"string"      return 'string'
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
"graficar_ts" return 'graficar_ts'
"function"    return 'function'

//valores expresiones regulares
{lex_number}        return 'val_number'
{lex_string}        return 'val_string'
{lex_identificador} return 'identificador'
<<EOF>>             return 'EOF'

/* ERROR */
.   ;

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
        | ARRAY_FUNCION      { $$ = $1; }
        | error punto_y_coma { $$ = new NodeGraphAST("ERROR",NumberNode.getNumber()); }
        | error llave_der    { $$ = new NodeGraphAST("ERROR",NumberNode.getNumber()); }
        ;

ARRAY_FUNCION: ID_ASSIGNMENT punto pop par_izq par_der PUNTO_Y_COMA    { $$ = new NodeGraphAST("FUNCTION_ARRAY",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST($3,NumberNode.getNumber())); }
             | ID_ASSIGNMENT punto length PUNTO_Y_COMA                 { $$ = new NodeGraphAST("FUNCTION_ARRAY",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST($3,NumberNode.getNumber())); }
             | ID_ASSIGNMENT punto push par_izq E par_der PUNTO_Y_COMA { $$ = new NodeGraphAST("FUNCTION_ARRAY",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST($3,NumberNode.getNumber()),$5); }
             ;

CALL_FUNCTION:    identificador par_izq L_E par_der PUNTO_Y_COMA { $$ = new NodeGraphAST("LLAMADA_FUNCION",NumberNode.getNumber()); $$.children.push(new NodeGraphAST($1,NumberNode.getNumber()),$3); }
                | identificador par_izq par_der     PUNTO_Y_COMA { $$ = new NodeGraphAST("LLAMADA_FUNCION",NumberNode.getNumber()); $$.children.push(new NodeGraphAST($1,NumberNode.getNumber())); }
                ;

BREAK: break PUNTO_Y_COMA { $$ = new NodeGraphAST("BREAK",NumberNode.getNumber()); }
        ;

CONITNUE: continue PUNTO_Y_COMA { $$ = new NodeGraphAST("CONTINUE",NumberNode.getNumber()); }
        ;

RETURN:  return punto_y_coma    { $$ = new NodeGraphAST("RETURN",NumberNode.getNumber()); }
        | return E punto_y_coma { $$ = new NodeGraphAST("RETURN",NumberNode.getNumber()); $$.children.push($2); }
        ;



PUNTO_Y_COMA: punto_y_coma { $$ = ";"; }
            |/* epsilon */ { $$ = ";"; }
            ;

FUNCTION: FUNCTION_HEAD llave_izq FUNCTION_SENTENCES llave_der { $$ = $1; $$.children.push($3); }
        | FUNCTION_HEAD llave_izq llave_der                    { $$ = $1; }
        ;

FUNCTION_HEAD: function identificador par_izq par_der dos_puntos TYPE_FUNCTION         { $$ = new NodeGraphAST("FUNCION",NumberNode.getNumber()); $$.children.push(new NodeGraphAST($2,NumberNode.getNumber()),$6); }
        | function identificador par_izq L_PARAMETROS par_der dos_puntos TYPE_FUNCTION { $$ = new NodeGraphAST("FUNCION",NumberNode.getNumber()); $$.children.push(new NodeGraphAST($2,NumberNode.getNumber()),$4,$7); }
        | function identificador par_izq par_der                                       { $$ = new NodeGraphAST("FUNCION",NumberNode.getNumber()); $$.children.push(new NodeGraphAST($2,NumberNode.getNumber())); }
        | function identificador par_izq L_PARAMETROS par_der                          { $$ = new NodeGraphAST("FUNCION",NumberNode.getNumber()); $$.children.push(new NodeGraphAST($2,NumberNode.getNumber()),$4); }
        ;

TYPE_FUNCTION: TYPE { $$ = $1; }
             | TYPE L_DIMENSION { $$ = $1; $$.children.push($2); } 
             ;

FUNCTION_SENTENCES: FUNCTION_SENTENCE FUNCTION_SENTENCES   { $$ = new NodeGraphAST("SENTENCIAS_FUNCION",NumberNode.getNumber()); $$.children.push($1,$2); }
                | FUNCTION_SENTENCE                        { $$ = $1; }
                ;
    
FUNCTION_SENTENCE: PRINT            { $$ = $1; }
                | GRAPH_TS          { $$ = $1; }
                | DECLARATION       { $$ = $1; }
                | ASSIGNMENT        { $$ = $1; }
                | SENTENCE_IF       { $$ = $1; }
                | SENTENCE_WHILE    { $$ = $1; }
                | SENTENCE_DO_WHILE { $$ = $1; }
                | SENTENCE_SWITCH   { $$ = $1; }
                | SENTENCE_FOR      { $$ = $1; }
                | RETURN            { $$ = $1; }
                | BREAK             { $$ = $1; }
                | CONITNUE          { $$ = $1; }
                | CALL_FUNCTION     { $$ = $1; }
                | FUNCTION          { $$ = $1; }
                | ARRAY_FUNCION     { $$ = $1; }
                | error punto_y_coma { $$ = new NodeGraphAST("ERROR",NumberNode.getNumber()); }
                | error llave_der    { $$ = new NodeGraphAST("ERROR",NumberNode.getNumber()); }
                ;

L_PARAMETROS: L_PARAMETROS coma PARAMETRO  { $$ = new NodeGraphAST("L_PARAMETROS",NumberNode.getNumber()); $$.children.push($1,$3); }
            | PARAMETRO                    { $$ = $1; }
            ;

PARAMETRO: identificador dos_puntos TYPE             { $$ = new NodeGraphAST("PARAMETRO",NumberNode.getNumber()); $$.children.push(new NodeGraphAST($1,NumberNode.getNumber()),$3); }
        | identificador dos_puntos TYPE L_DIMENSION  { $$ = new NodeGraphAST("PARAMETRO",NumberNode.getNumber()); $$.children.push(new NodeGraphAST($1,NumberNode.getNumber()),$3,$4); }
        ;



PRINT: print par_izq L_E par_der PUNTO_Y_COMA { $$ = new NodeGraphAST("PRITN",NumberNode.getNumber()); $$.children.push($3); }
    ;

GRAPH_TS: graficar_ts par_izq par_der PUNTO_Y_COMA { $$ = new NodeGraphAST("GRAFICAR_TS",NumberNode.getNumber()); } 
        ;
        
DECLARATION: TYPE_DECLARATION  L_ID TYPE_VARIABLE PUNTO_Y_COMA                                  { $$ = new NodeGraphAST("DECLARACION",NumberNode.getNumber()); $$.children.push($1,$2,$3); }
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE '=' E PUNTO_Y_COMA                            { $$ = new NodeGraphAST("DECLARACION",NumberNode.getNumber()); $$.children.push($1,$2,$3,new NodeGraphAST("=",NumberNode.getNumber()),$5); }
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE L_DIMENSION PUNTO_Y_COMA                      { $$ = new NodeGraphAST("DECLARACION_ARRAY",NumberNode.getNumber()); $$.children.push($1,$2,$3,$4); }
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE L_DIMENSION '=' L_ARRAY PUNTO_Y_COMA          { $$ = new NodeGraphAST("DECLARACION_ARRAY",NumberNode.getNumber()); $$.children.push($1,$2,$3,$4,new NodeGraphAST("=",NumberNode.getNumber()),$6); }
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE '=' llave_izq L_E_TYPE llave_der PUNTO_Y_COMA { $$ = new NodeGraphAST("DECLARACION_TYPE",NumberNode.getNumber()); $$.children.push($1,$2,$3,new NodeGraphAST("=",NumberNode.getNumber()),$6); }
        ;

TYPES: type identificador '=' llave_izq ATTRIBUTES_TYPE llave_der PUNTO_Y_COMA { $$ = new NodeGraphAST("TYPE",NumberNode.getNumber()); $$.children.push(new NodeGraphAST($2,NumberNode.getNumber()),$5); }
        ;

ATTRIBUTES_TYPE: ATTRIBUTES_TYPE ATTRIBUTE_TYPE { $$ = new NodeGraphAST("ATRIBUTOS_TYPE",NumberNode.getNumber()); $$.children.push($1,$2); }
                | ATTRIBUTE_TYPE                { $$ = $1; }
                ; 

ATTRIBUTE_TYPE: identificador dos_puntos TYPE END_ATTRIBUTE_TYPE               { $$ = new NodeGraphAST($1,NumberNode.getNumber()); $$.children.push($3); }
                | identificador dos_puntos TYPE L_DIMENSION END_ATTRIBUTE_TYPE { $$ = new NodeGraphAST($1,NumberNode.getNumber()); $$.children.push($3,$4); }
                ;

END_ATTRIBUTE_TYPE: coma        { $$ = $1; }
                | punto_y_coma  { $$ = $1; }
                | /* epsilon */ { $$ = ';';}
                ;

L_ARRAY: L_ARRAY coma cor_izq L_E cor_der { $4.tag = `[${$4.tag}]`; $$ = new NodeGraphAST("L_ARRAY",NumberNode.getNumber()); $$.children.push($1,$4); }
        | cor_izq L_E cor_der             { $2.tag = `[${$2.tag}]`; $$ = $2; }
        | cor_izq cor_der                 { $$ = new NodeGraphAST("[]",NumberNode.getNumber()); }
        ;

TYPE_VARIABLE:   dos_puntos TYPE { $$ = $2; }
                | /* epsilon */  { $$ = new NodeGraphAST("NULL",NumberNode.getNumber()); }
                ;

TYPE: void          { $$ = new NodeGraphAST($1,NumberNode.getNumber()); }
    | number        { $$ = new NodeGraphAST($1,NumberNode.getNumber()); }
    | string        { $$ = new NodeGraphAST($1,NumberNode.getNumber()); }
    | boolean       { $$ = new NodeGraphAST($1,NumberNode.getNumber()); }
    | identificador { $$ = new NodeGraphAST($1,NumberNode.getNumber()); }
    ;

L_DIMENSION: L_DIMENSION cor_izq cor_der { var t = new NodeGraphAST("[]",NumberNode.getNumber()); $$ = new NodeGraphAST("L_DIMENSION",NumberNode.getNumber()); $$.children.push($1,t); }
        | cor_izq cor_der                { $$ = new NodeGraphAST("[]",NumberNode.getNumber()); }
        ;

ASSIGNMENT: ID_ASSIGNMENT '=' E PUNTO_Y_COMA                          { $$ = new NodeGraphAST("ASIGNACION",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST("=",NumberNode.getNumber()),$3); }
        | ID_ASSIGNMENT '=' cor_izq cor_der PUNTO_Y_COMA              { $$ = new NodeGraphAST("ASIGNACION",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST("=",NumberNode.getNumber()), new NodeGraphAST("[]",NumberNode.getNumber())); }
        | ID_ASSIGNMENT POST_FIXED PUNTO_Y_COMA                       { $$ = new NodeGraphAST("ASIGNACION",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST($2,NumberNode.getNumber())); }
        | ID_ASSIGNMENT '=' llave_izq L_E_TYPE llave_der PUNTO_Y_COMA { $$ = new NodeGraphAST("ASIGNACION_TYPE",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST("=",NumberNode.getNumber()),$4); }
        ;

L_E_TYPE: L_E_TYPE coma E_TYPE { $$ = new NodeGraphAST("L_E_TYPE",NumberNode.getNumber()); $$.children.push($1,$3); }
        | E_TYPE               { $$ = $1; }
        ;

E_TYPE: identificador dos_puntos E                              { $$ = new NodeGraphAST($1,NumberNode.getNumber()); $$.children.push($3); }
        | identificador dos_puntos llave_izq L_E_TYPE llave_der { $$ = new NodeGraphAST($1,NumberNode.getNumber()); $$.children.push($4); }
        ;   

SENTENCE_IF: ELSE_IF else BLOCK { $$ = $1; var temp = new NodeGraphAST("ELSE",NumberNode.getNumber()); temp.children.push($3); $$.children.push(temp); }
        | ELSE_IF               { $$ = $1; }
        ;

ELSE_IF: ELSE_IF else if par_izq E par_der BLOCK { $$ = new NodeGraphAST("ELSE_IF",NumberNode.getNumber()); $$.children.push($1,$5,$7); }
        | if par_izq E par_der BLOCK             { $$ = new NodeGraphAST("IF",NumberNode.getNumber()); $$.children.push($3,$5); }
        ;

SENTENCE_WHILE: while par_izq E par_der BLOCK PUNTO_Y_COMA {$$ = new NodeGraphAST("WHILE",NumberNode.getNumber()); $$.children.push($3,$5); }
                ;

SENTENCE_DO_WHILE: do BLOCK while par_izq E par_der punto_y_coma {var temp = new NodeGraphAST("WHILE",NumberNode.getNumber()); $$ = new NodeGraphAST("DO",NumberNode.getNumber()); temp.children.push($5); $$.children.push($2,temp); }
                ;

SENTENCE_SWITCH: switch par_izq E par_der BLOCK_SWITCH { $$ = new NodeGraphAST("SWITCH",NumberNode.getNumber()); $$.children.push($3,$5); }
                ;

BLOCK_SWITCH: llave_izq L_CASE llave_der { $$ = new NodeGraphAST("BLOCK_SWITCH",NumberNode.getNumber()); $$.children.push($2); }
        | llave_izq llave_der            { $$ = new NodeGraphAST("BLOCK_SWITCH",NumberNode.getNumber()); }
        ;

L_CASE: L_CASE CASE { $$ = new NodeGraphAST("L_CASE", NumberNode.getNumber()); $$.children.push($1,$2); }
        | CASE      { $$ = $1; }
        ;

CASE:     case E dos_puntos SENTENCES  { $$ = new NodeGraphAST("CASE",NumberNode.getNumber());  $$.children.push($2,$4); }
        | case E dos_puntos            { $$ = new NodeGraphAST("CASE",NumberNode.getNumber());  $$.children.push($2); }
        | default dos_puntos SENTENCES { $$ = new NodeGraphAST("DEFAULT",NumberNode.getNumber()); $$.children.push($3); }
        | default dos_puntos           { $$ = new NodeGraphAST("DEFAULT",NumberNode.getNumber()); }
        ;

SENTENCE_FOR: for par_izq TYPE_DECLARATION L_ID '=' E punto_y_coma E punto_y_coma E par_der BLOCK { $$ = new NodeGraphAST("FOR",NumberNode.getNumber()); $$.children.push($3,$4,$6,$8,$10,$12); }
        | for par_izq ID_ASSIGNMENT '=' E punto_y_coma E punto_y_coma E par_der BLOCK             { $$ = new NodeGraphAST("FOR",NumberNode.getNumber()); $$.children.push($3,$5,$7,$9,$11); }
        | for par_izq identificador punto_y_coma E punto_y_coma E par_der BLOCK                   { $$ = new NodeGraphAST("FOR",NumberNode.getNumber()); $$.children.push(new NodeGraphAST($3,NumberNode.getNumber()),$5,$7,$9); }
        | for par_izq TYPE_DECLARATION L_ID in E par_der BLOCK                                    { $$ = new NodeGraphAST("FOR IN",NumberNode.getNumber()); $$.children.push($3,$4,$6,$8); }
        | for par_izq TYPE_DECLARATION L_ID of E par_der BLOCK                                    { $$ = new NodeGraphAST("FOR OF",NumberNode.getNumber()); $$.children.push($3,$4,$6,$8); }
        ;

ID_ASSIGNMENT: ID_ASSIGNMENT punto identificador             { $$ = new NodeGraphAST("ID_ASIGNACON", NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST($3,NumberNode.getNumber())); }
        | ID_ASSIGNMENT punto identificador ACCESS_DIMENSION { $$ = new NodeGraphAST("ID_ASIGNACON", NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST($3,NumberNode.getNumber()),$4); }
        | identificador                                      { $$ = new NodeGraphAST("ID_ASIGNACON", NumberNode.getNumber()); $$.children.push(new NodeGraphAST($1,NumberNode.getNumber())); }
        | identificador ACCESS_DIMENSION                     { $$ = new NodeGraphAST("ID_ASIGNACON", NumberNode.getNumber()); $$.children.push(new NodeGraphAST($1,NumberNode.getNumber()),$2); }
        ;

BLOCK:    llave_izq SENTENCES llave_der { $$ = new NodeGraphAST("BLOCK",NumberNode.getNumber()); $$.children.push($2); }
        | llave_izq llave_der           { $$ = new NodeGraphAST("BLOCK",NumberNode.getNumber()); }
        ;

L_ID:     L_ID coma identificador { $$ = new NodeGraphAST("L_ID",NumberNode.getNumber()), $$.children.push($1,$3); }
        | identificador           { $$ = new NodeGraphAST($1,NumberNode.getNumber()); }
        ; 

TYPE_DECLARATION: let   { $$ = new NodeGraphAST("LET",NumberNode.getNumber()); }
                | const { $$ = new NodeGraphAST("COST",NumberNode.getNumber()); }
                ;

/* EXPRESIONES */
E   : E '+'   E                           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '-'   E                           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '**'  E                           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '*'   E                           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '/'   E                           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '%'   E                           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '&&'  E                           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '||'  E                           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | '!'     E                           { $$ = new NodeGraphAST($1,NumberNode.getNumber()); $$.children.push($2); }
    | '-' E %prec UMENOS                  { $$ = new NodeGraphAST($1,NumberNode.getNumber()); $$.children.push($2); }
    | E '!='  E                           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '=='  E                           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '>='  E                           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '>'   E                           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '<='  E                           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | E '<'   E                           { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1,$3); }
    | val_number                          { $$ = new NodeGraphAST($1,NumberNode.getNumber()); }
    | val_string                          { if($1 == ""){$$ = new NodeGraphAST(" ",NumberNode.getNumber());}else{$$ = new NodeGraphAST(`${$1}`,NumberNode.getNumber());} }
    | val_verdadero                       { $$ = new NodeGraphAST($1,NumberNode.getNumber()); }
    | val_falso                           { $$ = new NodeGraphAST($1,NumberNode.getNumber()); }
    | val_nulo                            { $$ = new NodeGraphAST($1,NumberNode.getNumber()); }
    | par_izq E par_der                   { $$ = $2; }
    | cor_izq L_E cor_der                 { $$ = $2; }
    | E '?' E dos_puntos E                { $$ = new NodeGraphAST("TERNARIO",NumberNode.getNumber()); $$.children.push($1,$3,$5); }

    | identificador par_izq par_der                  { $$ = new NodeGraphAST("LLAMADA_FUNCION",NumberNode.getNumber()); $$.children.push(new NodeGraphAST($1,NumberNode.getNumber()));}
    | identificador par_izq L_E par_der              { $$ = new NodeGraphAST("LLAMADA_FUNCION",NumberNode.getNumber()); $$.children.push(new NodeGraphAST($1,NumberNode.getNumber()),$3); }
    
    | ACCESS POST_FIXED                   { $$ = new NodeGraphAST($2,NumberNode.getNumber()); $$.children.push($1); }
    | ACCESS punto pop par_izq par_der    { $$ = new NodeGraphAST("FUNCTION_ARRAY",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST($3,NumberNode.getNumber())); }
    | ACCESS punto length                 { $$ = new NodeGraphAST("FUNCTION_ARRAY",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST($3,NumberNode.getNumber())); }
    | ACCESS punto push par_izq E par_der { $$ = new NodeGraphAST("FUNCTION_ARRAY",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST($3,NumberNode.getNumber()),$5); }
    | ACCESS                              { $$ = $1; }
    ;

ACCESS: ACCESS punto identificador                       { $$ = new NodeGraphAST("ACCESO",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST($3,NumberNode.getNumber()));}
        | ACCESS punto identificador ACCESS_DIMENSION    { $$ = new NodeGraphAST("ACCESO",NumberNode.getNumber()); $$.children.push($1,new NodeGraphAST($3,NumberNode.getNumber()),$4);}
        | identificador                                  { $$ = new NodeGraphAST($1,NumberNode.getNumber()); }
        | identificador ACCESS_DIMENSION                 { $$ = new NodeGraphAST("ACCESO_ARRAY",NumberNode.getNumber()); $$.children.push(new NodeGraphAST($1,NumberNode.getNumber()),$2);}
        ;

ACCESS_DIMENSION: ACCESS_DIMENSION cor_izq E cor_der { $$ = new NodeGraphAST("ACCESO_DIMENSION",NumberNode.getNumber()); $3.tag = `[${$3.tag}]`; $$.children.push($1,$3); }
                | cor_izq E cor_der                  { $2.tag = `[${$2.tag}]`; $$ = $2; }
                ;

POST_FIXED: '--' { $$ = "--"; }
        | '++'   { $$ = "++"; }
        ;

L_E: L_E coma E { $$ = new NodeGraphAST("LISTA_EXP",NumberNode.getNumber()); $$.children.push($1,$3);}
        | E     { $$ = $1; }
        ;