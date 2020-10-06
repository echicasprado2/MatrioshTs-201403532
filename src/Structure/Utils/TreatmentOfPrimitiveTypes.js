class TreatmentOfPrimitiveTypes {

    /**
     * 
     * @param {*} exp1 
     * @param {*} exp2 
     */
    static getTopType(exp1, exp2){
        if(exp1.type.enumType === EnumType.STRING || exp2.type.enumType === EnumType.STRING){
            return EnumType.STRING;

        }else if(exp1.type.enumType === EnumType.NUMBER && exp2.type.enumType == EnumType.NUMBER){
            return EnumType.NUMBER;
        
        }else if(exp1.type.enumType === EnumType.BOOLEAN && exp2.type.enumType === EnumType.BOOLEAN){
            return EnumType.BOOLEAN;
        
        }else if(exp1.type.enumType === EnumType.TYPE || exp2.type.enumType === EnumType.TYPE){
            return EnumType.TYPE;
        
        }else{
            return EnumType.ERROR;
        }
    }
    
}