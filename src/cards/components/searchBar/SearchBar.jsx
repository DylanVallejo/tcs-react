import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import './searchBar.css'
export const SearchBar = ( { findItemByName } ) => {
    
    
    const navigate = useNavigate()
    
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
        <div className="search-bar-container">
            <form onSubmit={ ( e ) => onSubmit( e )  }>
                <input 
                    type="text"
                    placeholder="Buscar Item"
                    value={inputValue}
                    onChange={  onInputChange }
                />  
            </form>
            <button className='add-btn' onClick={()=>{navigate('register')}}>
                Agregar
            </button>
        
        </div>
        
    )
}
