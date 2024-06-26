// import { useState } from 'react'
import { useState } from 'react';
import { BankList } from './cards/components/list/BankList'
import { SearchBar } from './cards/components/searchBar/SearchBar'
import { RegisterForm } from './cards/components/register/RegisterForm';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function Banco() {
  
  const [item, setItem] = useState('');
  
  const findItem = ( itemValue ) => {
    setItem(itemValue)
  }

  return (
    <>
      <h1>Banco pichincha</h1>
      <hr/>
      <SearchBar  findItemByName = { (value) => findItem(value) }/>
      <hr/>
      <BankList  searchItem = {item} />
      <hr/>
      
      <RegisterForm/>
    </>
  )
}

export default Banco
