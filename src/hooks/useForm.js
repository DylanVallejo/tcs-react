import { useState } from "react";


export const useForm = ( initialForm = {} ) => {
    
    const [formState, setFormState] = useState( initialForm );
    
    // userName : '',
    // email: '',
    // password : ""
    
    // react-hook-form  es una libreria que nos ayuda con la manipulacion de formularios
    
    const onResetForm = ( ) => {
        setFormState(initialForm)
    }
    
    const onInputChange = ({ target }) => {
        const {name , value} = target;
        setFormState({
            ...formState,
            [ name ] : value
        });
    }
    
    
    return  {
        ...formState,
        formState,
        onInputChange,
        onResetForm
    };

}
