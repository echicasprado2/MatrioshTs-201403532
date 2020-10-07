# MatrioshTs-201403532

# Web
https://everchicas201403532.github.io/MatrioshTs-201403532/

# GRAMMAR

```javascript
INIT: SENTENCES EOF
    | EOF

SENTENCES: SENTENCES SENTENCE
        | SENTENCE

SENTENCE: FUNCTION         
        | PRINT            
        | GRAPH_TS         
        | DECLARATION      
        | ASSIGNMENT       
        | TYPES            
        | SENTENCE_IF      
        | SENTENCE_WHILE   
        | SENTENCE_DO_WHILE
        | SENTENCE_SWITCH 
        | SENTENCE_FOR    
        | RETURN          
        | BREAK           
        | CONITNUE        
        | CALL_FUNCTION   
        | ARRAY_FUNCION   
        | error ';'
        | error '}'

ARRAY_FUNCION: ID_ASSIGNMENT '.' pop '(' ')' ';'
             | ID_ASSIGNMENT '.' length ';'
             | ID_ASSIGNMENT '.' push '(' E ')' ';'

CALL_FUNCTION: id '(' L_E ')' ';'
             | id '(' ')' ';'

BREAK: break ';'

CONITNUE: continue ';'

RETURN: return ';'
      | return E ';'

BLOCK: '{' SENTENCES '}'
     | '{' '}'

'.'_COMA: ';'
          |

FUNCTION: FUNCTION_HEAD '{' FUNCTION_SENTENCES '}'
        | FUNCTION_HEAD '{' '}'

FUNCTION_HEAD: function id '(' ')' ':' TYPE_FUNCTION
             | function id '(' L_PARAMETROS ')' ':' TYPE_FUNCTION
             | function id '(' ')'
             | function id '(' L_PARAMETROS ')'

TYPE_FUNCTION: TYPE
             | TYPE L_DIMENSION

FUNCTION_SENTENCES: FUNCTION_SENTENCE FUNCTION_SENTENCES
                | FUNCTION_SENTENCE
    
FUNCTION_SENTENCE: PRINT
                | GRAPH_TS
                | DECLARATION
                | ASSIGNMENT
                | SENTENCE_IF
                | SENTENCE_WHILE
                | SENTENCE_DO_WHILE
                | SENTENCE_SWITCH
                | SENTENCE_FOR
                | RETURN
                | BREAK
                | CONITNUE
                | CALL_FUNCTION
                | FUNCTION
                | ARRAY_FUNCION
                | error ';'
                | error '}'

L_PARAMETROS: L_PARAMETROS ',' PARAMETRO
            | PARAMETRO

PARAMETRO: id ':' TYPE
        | id ':' TYPE L_DIMENSION

TYPE: void         
    | number       
    | string       
    | boolean      
    | id

PRINT: print '(' L_E ')' ';'

GRAPH_TS: graficar_ts '(' ')' ';'

DECLARATION: TYPE_DECLARATION  L_ID TYPE_VARIABLE ';'
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE '=' E ';'
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE L_DIMENSION ';'
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE L_DIMENSION '=' L_ARRAY ';'
        |    TYPE_DECLARATION  L_ID TYPE_VARIABLE '=' '{' L_E_TYPE '}' ';'

L_E_TYPE: L_E_TYPE ',' E_TYPE
        | L_E_TYPE ';' E_TYPE
        | E_TYPE

E_TYPE: id ':' E
      | id ':' '{' L_E_TYPE '}'

TYPES: type id '=' '{' ATTRIBUTES_TYPE '}' ';'

ATTRIBUTES_TYPE: ATTRIBUTES_TYPE END_ATTRIBUTE_TYPE ATTRIBUTE_TYPE
                | ATTRIBUTE_TYPE

ATTRIBUTE_TYPE: id ':' TYPE

END_ATTRIBUTE_TYPE: ','
                  | ';'

L_ARRAY: L_ARRAY ',' '[' L_E ']'
        | '[' L_E ']'
        | '[' ']'

TYPE_DECLARATION: let
                | const

L_ID: L_ID ',' id
    | id

TYPE_VARIABLE: ':' TYPE
            |

L_DIMENSION: L_DIMENSION '[' ']'
        | '[' ']'

ASSIGNMENT: ID_ASSIGNMENT '=' E ';'
          | ID_ASSIGNMENT '=' '[' ']' ';'
          | ID_ASSIGNMENT POST_FIXED ';'
          | ID_ASSIGNMENT '=' '{' L_E_TYPE '}' ';'

ID_ASSIGNMENT: ID_ASSIGNMENT '.' id
             | ID_ASSIGNMENT '.' id ACCESS_DIMENSION
             | id ACCESS_DIMENSION
             | id

ACCESS_DIMENSION: ACCESS_DIMENSION '[' E ']'
                | '[' E ']'

SENTENCE_IF: ELSE_IF else BLOCK
           | ELSE_IF

ELSE_IF: ELSE_IF else if '(' E ')' BLOCK
       | if '(' E ')' BLOCK

SENTENCE_WHILE: while '(' E ')' BLOCK ';'

SENTENCE_DO_WHILE: do BLOCK while '(' E ')' ';'

SENTENCE_SWITCH: switch '(' E ')' BLOCK_SWITCH

BLOCK_SWITCH: '{' L_CASE '}'
            | '{' '}'   

L_CASE: L_CASE CASE
      | CASE     

CASE: case E ':' SENTENCES 
    | case E ':'           
    | default ':' SENTENCES
    | default ':'          

SENTENCE_FOR: for '(' TYPE_DECLARATION L_ID '=' E ';' E ';' E ')' BLOCK
            | for '(' ID_ASSIGNMENT '=' E ';' E ';' E ')' BLOCK 
            | for '(' id ';' E ';' E ')' BLOCK
            | for '(' TYPE_DECLARATION L_ID in E ')' BLOCK 
            | for '(' TYPE_DECLARATION L_ID of E ')' BLOCK 

E   : E '+'   E 
    | E '-'   E 
    | E '**'  E 
    | E '*'   E 
    | E '/'   E 
    | E '%'   E 
    | E '&&'  E 
    | E '||'  E 
    | '!'     E 
    | '-' E %prec UMENOS
    | E '!='  E 
    | E '=='  E 
    | E '>='  E 
    | E '>'   E 
    | E '<='  E 
    | E '<'   E
    | val_number   
    | val_string   
    | val_verdadero
    | val_falso    
    | val_nulo     
    | '(' E ')' 
    | '[' L_E ']'
    | E '?' E ':' E 
    | id '(' ')'    
    | id '(' L_E ')'
    | ACCESS POST_FIXED
    | ACCESS '.' pop '(' ')' 
    | ACCESS '.' length
    | ACCESS '.' push '(' E ')'
    | ACCESS 

ACCESS: ACCESS '.' id        
      | ACCESS '.' id ACCESS_DIMENSION 
      | id                 
      | id ACCESS_DIMENSION

POST_FIXED: '--'
          | '++'  

L_E: L_E ',' E
    | E    
```