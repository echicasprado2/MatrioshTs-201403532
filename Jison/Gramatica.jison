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
"?"  return 'ternario'

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

SENTENCE: PRINT { $$ = $1; } 
        ;

PRINT: print par_izq E par_der punto_y_coma { $$ = new Print(this._$.first_line,this._$.first_column,$3); }
    ;

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
    | E '>'   E          { $$ = new Relational(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.LESS_EQUAL_TO),$1,$3); }
    | E '<='  E          { $$ = new Relational(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.LESS_THAN),$1,$3); }
    | E '<'   E          { $$ = new Relational(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.MORE_THAN),$1,$3); }
    | val_number         { $$ = new Value(new Type(EnumType.NUMBER),$1); }
    | val_string         { $$ = new Value(new Type(EnumType.STRING),$1); }
    | val_verdadero      { $$ = new Value(new Type(EnumType.BOOLEAN),$1); }
    | val_falso          { $$ = new Value(new Type(EnumType.BOOLEAN),$1); }
    | val_nulo           { $$ = new Value(new Type(EnumType.NULL),$1); }
    | par_izq E par_der  { $2.translatedCode = "("+ $2.translatedCode +")"; $$ = $2; }
    ;
