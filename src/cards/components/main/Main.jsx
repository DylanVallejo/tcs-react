import React, { useState } from 'react'
import { BankList } from '../list/BankList'
import { SearchBar } from '../searchBar/SearchBar'

export const Main = () => {
    
    const [item, setItem] = useState('');

    const findItem = ( itemValue ) => {
        setItem(itemValue)
    }
    
    return (
        <>
            <SearchBar  findItemByName = { (value) => findItem(value) }/>
            <BankList  searchItem = {item} />
        </>
    )
}
