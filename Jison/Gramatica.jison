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

INIT: SENTENCES EOF { return $1; }
    | EOF
    ;

SENTENCES: SENTENCES SENTENCE { $$ = $1; $$.push($2); }
        | SENTENCE            { $$ = []; $$.push($1); }
        ;

SENTENCE: PRINT { $$ = $1; } 
        ;

PRINT: print par_izq VALOR par_der punto_y_coma { $$ = new Print(this._$.first_line,this._$.first_column,$3); }
    ;

/* EXPRESIONES */
E
    // : ARITMETICAS  {$$ = $1; }
    // | RELACIONALES {$$ = $1; }
    // | LOGICAS      {$$ = $1; }
    // | UNARIAS      {$$ = $1; }
    //| VALOR        {$$ = $1; }
    :VALOR {$$ = $1; };

// ARITMETICAS
//     : E '+'  E { $$ = new Aritmetica(this._$.first_line,this._$.first_column,TipoOperacion.SUMA,$1,$3); }
//     | E '-'  E { $$ = new Aritmetica(this._$.first_line,this._$.first_column,TipoOperacion.RESTA,$1,$3); }
//     | E '*'  E { $$ = new Aritmetica(this._$.first_line,this._$.first_column,TipoOperacion.MULTIPLICACION,$1,$3); }
//     | E '/'  E { $$ = new Aritmetica(this._$.first_line,this._$.first_column,TipoOperacion.DIVISION,$1,$3); }
//     | E '^^' E { $$ = new Aritmetica(this._$.first_line,this._$.first_column,TipoOperacion.POTENCIA,$1,$3); }
//     | E '%'  E { $$ = new Aritmetica(this._$.first_line,this._$.first_column,TipoOperacion.MODULO,$1,$3); }
//     | '-' E %prec UMENOS { $$ = new Unario(this._$.first_line,this._$.first_column,TipoOperacion.NEGATIVO,$2);}
//     ;

// RELACIONALES
//     : E '!='  E { $$ = new Relacional(this._$.first_line,this._$.first_column,TipoOperacion.DIFERENTE_QUE,$1,$3); }
//     | E '=='  E { $$ = new Relacional(this._$.first_line,this._$.first_column,TipoOperacion.IGUAL_QUE,$1,$3); }
//     | E '===' E { $$ = new Relacional(this._$.first_line,this._$.first_column,TipoOperacion.IGUAL_REFERENCIA,$1,$3); }
//     | E '>='  E { $$ = new Relacional(this._$.first_line,this._$.first_column,TipoOperacion.MAYOR_IGUAL,$1,$3); }
//     | E '>'   E { $$ = new Relacional(this._$.first_line,this._$.first_column,TipoOperacion.MAYOR_QUE,$1,$3); }
//     | E '<='  E { $$ = new Relacional(this._$.first_line,this._$.first_column,TipoOperacion.MENOR_IGUAL,$1,$3); }
//     | E '<'   E { $$ = new Relacional(this._$.first_line,this._$.first_column,TipoOperacion.MENOR_QUE,$1,$3); }
//     ;

// LOGICAS
//     : E '&&'  E { $$ = new Logica(this._$.first_line,this._$.first_column,TipoOperacion.AND,$1,$3); }
//     | E '||'  E { $$ = new Logica(this._$.first_line,this._$.first_column,TipoOperacion.OR,$1,$3); }
//     | '!'     E { $$ = new Logica(this._$.first_line,this._$.first_column,TipoOperacion.NOT,$1,$3); }
//     ;

// UNARIAS
//     : E '++' { $$ = new Unario(this._$.first_line,this._$.first_column,TipoOperacion.MAS_MAS,$1);}
//     | E '--' { $$ = new Unario(this._$.first_line,this._$.first_column,TipoOperacion.MENOS_MENOS,$1);}
//     ;

/*  valores */
VALOR: val_number       { $$ = new Value(new Type(EnumType.NUMBER),$1); }
    | val_string        { $$ = new Value(new Type(EnumType.STRING),$1); }
    | val_verdadero     { $$ = new Value(new Type(EnumType.BOOLEAN),$1); }
    | val_falso         { $$ = new Value(new Type(EnumType.BOOLEAN),$1); }
    | val_nulo          { $$ = new Value(new Type(EnumType.NULL),$1); }
    | par_izq E par_der { $$ = $2; }
    ;
