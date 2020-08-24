/*Importaciones de clases */
%{

%}

/* Lexico */
%lex
%options case-sensitive

// expresiones regulares
lex_number               [0-9]+("."[0-9]+)?\b
lex_string               [\"\'\`](([^\"\'\`\\])*([\\].)*)*[\"\'\`]
lex_id                   [A-Za-z_\ñ\Ñ][A-Za-z_0-9\ñ\Ñ]*
lex_comentariounilinea   ["/"]["/"].*(\r|\n|\r\n)
lex_comentariomultilinea [/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]

%%

//ignorar de archivo
{lex_comentariounilinea}    /* Omitir */
{lex_comentariomultilinea}  /* Omitir */
[\s\t\r\n]+                 /* Omitir */

//valores
"null"  return 'val_nulo'
"true"  return 'val_verdadero'
"false" return 'val_falso'

//PALABRAS RESERVADAS
"number"      return 'number'
"void"        return 'void'
"boolean"     return 'boolean'
"type"        return 'type'

"const"       return 'const'
"let"         return 'let'

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
"grafica_ts"  return 'graficar_ts'
"function"    return 'function'

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
"?"  return 'ternario'

//aritmeticos
"++" return '++'
"--" return '--'
"+"  return '+'
"-"  return '-'
"*"  return '*'
"/"  return '/'
"**" return '**'
"%"  return '%'


//comparacion
"=="  return '=='
"!="  return '!='
"="   return '='

//relacionales
">=" return '>='
">"  return '>'
"<=" return '<='
"<"  return '<'


//logicos
"&&" return '&&'
"||" return '||'
"!" return '!'

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
%left '++' '--'
%left '||'
%left '&&'
%left '==' 
%left '!='
%nonassoc '>' '>='
%nonassoc '<' '<='
%left '+' '-'
%left '*' '/' '%'
%right '**'
%right UMENOS '!'
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

INIT: VALOR EOF { console.log("desde jison reconoci --> " + $1); }
    | EOF
    ;

VALOR: val_number   { $$ = $1; }
    | val_string    { $$ = $1; }
    | val_verdadero { $$ = $1; }
    | val_falso     { $$ = $1; }
    | val_nulo      { $$ = $1; }
    ;
