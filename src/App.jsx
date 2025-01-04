import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import ListTodos from './components/ListTodos'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'

function App() {
  const [user, setUser] = useState('Elmer')

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <ListTodos user={user} /> : <SignIn />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
