import React, { useState } from 'react'

export const SearchBar = ( { findItemByName } ) => {
    
    const [inputValue, setInputValue] = useState('')
    
    const onInputChange = ({ target }) => { 
        setInputValue(target.value);
    }
    
    const onSubmit = (e) => { 
        e.preventDefault();
        if( inputValue.trim().length <= 1) return;
        findItemByName(inputValue.trim() );
        setInputValue('');

    }
    
    return (
        <>
            <form onSubmit={ ( e ) => onSubmit( e )  }>
                <input 
                    type="text"
                    placeholder="Buscar Item"
                    value={inputValue}
                    onChange={  onInputChange }
                />  
            </form>
            
            <button className='add-btn'>
                Agregar
            </button>
        
        </>
        
    )
}
