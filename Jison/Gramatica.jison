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
"++" return '++';
"--" return '--';
"**" return '**';
"+"  return '+';
"-"  return '-';
"*"  return '*';
"/"  return '/';
"%"  return '%';

//valores
"null"  return 'val_nulo';
"true"  return 'val_verdadero';
"false" return 'val_falso';

//relacionales
">=" return '>=';
">"  return '>';
"<=" return '<=';
"<"  return '<';

//comparacion
"=="  return '==';
"!="  return '!=';
"="   return '=';

//logicos
"&&" return '&&';
"||" return '||';
"!" return '!';

//simbolos
";"  return 'punto_y_coma';
":"  return 'dos_puntos';
"."  return 'punto';
"("  return 'par_izq';
")"  return 'par_der';
"{"  return 'llave_izq';
"}"  return 'llave_der';
"["  return 'cor_izq';
"]"  return 'cor_der';
","  return 'coma';
"?"  return '?';

//PALABRAS RESERVADAS
"string"      return 'string'
"number"      return 'number';
"void"        return 'void';
"boolean"     return 'boolean';
"type"        return 'type';

"const"       return 'const';
"let"         return 'let';
"push"        return 'push';
"pop"         return 'pop';
"length"      return 'length';

"if"          return 'if';
"else"        return 'else';
"switch"      return 'switch';
"case"        return 'case';
"default"     return 'default';
"break"       return 'break';
"continue"    return 'continue';
"return"      return 'return';
"for"         return 'for';
"of"          return 'of';
"in"          return 'in';
"while"       return 'while';
"do"          return 'do';

"console.log" return 'print';
"graficar_ts"  return 'graficar_ts';
"function"    return 'function';

//valores expresiones regulares
{lex_number}        return 'val_number';
{lex_string}        return 'val_string';
{lex_identificador} return 'identificador';
<<EOF>> return 'EOF';

/* ERROR */
. { ErrorList.addError(new ErrorNode(yylloc.first_line,yylloc.first_column,new ErrorType(EnumErrorType.LEXICO),`El caracter: "${yytext}" no pertenece al lenguaje`,new EnvironmentType(EnumEnvironmentType.NULL, ""))); }

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

RETURN:  return punto_y_coma    { $$ = new Return(this._$.first_line,this._$.first_column,null,false); }
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

PARAMETRO: identificador dos_puntos TYPE             { $$ = new Parameter(this._$.first_line,this._$.first_column,$1,$3,null,false,0); }
        | identificador dos_puntos TYPE L_DIMENSION  { $$ = new Parameter(this._$.first_line,this._$.first_column,$1,$3,null,true,$4); }
        ;

TYPE: void          { $$ = new Type(EnumType.VOID,""); }
    | number        { $$ = new Type(EnumType.NUMBER,""); }
    | string        { $$ = new Type(EnumType.STRING,""); }
    | boolean       { $$ = new Type(EnumType.BOOLEAN,""); }
    | identificador { $$ = new Type(EnumType.TYPE,$1); }
    ;

PRINT: print par_izq L_E par_der PUNTO_Y_COMA { $$ = new Print(this._$.first_line,this._$.first_column,$3); }
    ;

GRAPH_TS: graficar_ts par_izq par_der PUNTO_Y_COMA { $$ = new GraphTs(this._$.first_line,this.$.first_column); } 
        ;

//FIXME con let a = 0, b=0; update en gramatica de grafo
DECLARATION: TYPE_DECLARATION  L_ID TYPE_VARIABLE PUNTO_Y_COMA                         { $$ = new Declaration(this._$.first_line,this._$.first_column,$1,$2,$3,null); }
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE '=' E PUNTO_Y_COMA                   { $$ = new Declaration(this._$.first_line,this._$.first_column,$1,$2,$3,$5); }
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE L_DIMENSION PUNTO_Y_COMA             { $$ = new DeclarationArray(this._$.first_line,this._$.first_column,$1,$2,$3,$4,null); }
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE L_DIMENSION '=' L_ARRAY PUNTO_Y_COMA { $$ = new DeclarationArray(this._$.first_line,this._$.first_column,$1,$2,$3,$4,new Value(new Type(EnumType.ARRAY,""),$6)); }
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE '=' llave_izq L_E_TYPE llave_der PUNTO_Y_COMA { $$ = new DeclarationTypes(this._$.first_line,this._$.first_column,$1,$2,$3,$6); }
        // TODO add arrays of types update en gramatica de grafo
        ;

L_E_TYPE: L_E_TYPE coma E_TYPE         { $$ = $1; $$.push($3); }
        | L_E_TYPE punto_y_coma E_TYPE { $$ = $1; $$.push($3); }
        | E_TYPE                       { $$ = []; $$.push($1); }
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
        | cor_izq cor_der                 { $$ = []; $$.push(new Value(new Type(EnumType.NULL),"")); }
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
        | ID_ASSIGNMENT '=' cor_izq cor_der PUNTO_Y_COMA
        {
                for(var i = 0; i < $1.length;i++){
                        if($1[i] instanceof AccessArray){
                                $$ = new AssignmentArray(this._$.first_line,this.$.first_column,$1,new Value(new Type(EnumType.NULL),""));
                                return;
                        }
                }
                $$ = new Assignment(this._$.first_line,this.$.first_column,$1,new Value(new Type(EnumType.NULL),""));
        }
        | ID_ASSIGNMENT POST_FIXED PUNTO_Y_COMA { $$ = new Unary(this._$.first_line,this._$.first_column,$2,new Access(this._$.first_line,this._$.first_column,$1),true); }
        | ID_ASSIGNMENT '=' llave_izq L_E_TYPE llave_der PUNTO_Y_COMA { $$ = new AssignmentType(this._$.first_line,this._$.first_column,$1,$4); }
        ;

ID_ASSIGNMENT: ID_ASSIGNMENT punto identificador             { $$ = $1; $$.push(new Id(this._$.first_line,this._$.first_column,$3)); }
        | ID_ASSIGNMENT punto identificador ACCESS_DIMENSION { $$ = $1; $$.push(new AccessArray(this._$.first_line,this._$.first_column,$3,$4)); }
        | identificador                                      { $$ = []; $$.push(new Id(this._$.first_line,this._$.first_column,$1)); }
        | identificador ACCESS_DIMENSION                     { $$ = []; $$.push(new AccessArray(this._$.first_line,this._$.first_column,$1,$2)); }
        ;

ACCESS_DIMENSION: ACCESS_DIMENSION cor_izq E cor_der { $$ = $1; $$.push($3); }
                | cor_izq E cor_der                  { $$ = []; $$.push($2); }
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
E   : E '+'   E          { $$ = new Arithmetic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.PLUS),$1,$3); }
    | E '-'   E          { $$ = new Arithmetic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.MINUS),$1,$3); }
    | E '**'  E          { $$ = new Arithmetic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.POWER),$1,$3); }
    | E '*'   E          { $$ = new Arithmetic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.MULTIPLICATION),$1,$3); }
    | E '/'   E          { $$ = new Arithmetic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.DIVISION),$1,$3); }
    | E '%'   E          { $$ = new Arithmetic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.MODULE),$1,$3); }
    | E '&&'  E          { $$ = new Logic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.AND),$1,$3); }
    | E '||'  E          { $$ = new Logic(this._$.first_line,this._$.first_column,new OperationType(EnumOperationType.OR),$1,$3); }
    | '!'     E          { $$ = new Unary(this._$.first_line, this._$.first_column, new OperationType(EnumOperationType.NOT), $2,false); }
    | '-' E %prec UMENOS { $$ = new Unary(this._$.first_line, this._$.first_column, new OperationType(EnumOperationType.NEGATIVE), $2,false);}
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

    | par_izq E par_der   { $$ = $2; $$.parentesis = true; }
    | cor_izq L_E cor_der { $$ = $2; }

    | E '?' E dos_puntos E                { $$ = new Ternary(this._$.first_line,this._$.first_column,$1,$3,$5); }

    | identificador par_izq par_der                  { $$.push(new CallFunction(this._$.first_line,this._$.first_column,$1,[],false)); }
    | identificador par_izq L_E par_der              { $$.push(new CallFunction(this._$.first_line,this._$.first_column,$1,$3,false)); }

    | ACCESS POST_FIXED                   { $$ = new Unary(this._$.first_line,this._$.first_column,$2,new Access(this._$.first_line,this._$.first_column,$1),false); }
    | ACCESS punto pop par_izq par_der    { $$ = new ArrayFunction(this._$.first_line,this._$.first_column,new TypeArrayMethod(EnumTypeArrayMethod.POP),new Access(this._$.first_line,this._$.first_column,$1),""); }
    | ACCESS punto length                 { $$ = new ArrayFunction(this._$.first_line,this._$.first_column,new TypeArrayMethod(EnumTypeArrayMethod.LENGTH),new Access(this._$.first_line,this._$.first_column,$1),""); }
    | ACCESS punto push par_izq E par_der { $$ = new ArrayFunction(this._$.first_line,this._$.first_column,new TypeArrayMethod(EnumTypeArrayMethod.PUSH),new Access(this._$.first_line,this._$.first_column,$1),$5); }
    | ACCESS                              { $$ = new Access(this._$.first_line,this._$.first_column,$1); }
    ;

ACCESS: ACCESS punto identificador                       { $$ = $1; $$.push(new Id(this._$.first_line,this._$.first_column,$3)); }
        | ACCESS punto identificador ACCESS_DIMENSION    { $$ = $1; $$.push(new AccessArray(this._$.first_line,this._$.first_column,$3,$4)); }
        | identificador                                  { $$ = []; $$.push(new Id(this._$.first_line,this._$.first_column,$1)); }
        | identificador ACCESS_DIMENSION                 { $$ = []; $$.push(new AccessArray(this._$.first_line,this._$.first_column,$1,$2)); }
        ;

POST_FIXED: '--' { $$ = new OperationType(EnumOperationType.MINUS_MINUS); }
        | '++'   { $$ = new OperationType(EnumOperationType.PLUS_PLUS); }
        ;

L_E: L_E coma E { $$ = $1; $$.push($3);}
        | E     { $$ = []; $$.push($1); }
        ;