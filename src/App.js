import React from 'react';
import Auth from './Auth'
import UserData from './UserData';


const App = () => {
  return (
    <div>
      <Auth>
        <UserData />
      </Auth>
    </div>
  )
}


export default App
