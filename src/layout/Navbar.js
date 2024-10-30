import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>

<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand" to = "/">
        Full Stack Application FIRST_LABA_ORM
        </Link>
    <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
        >
      
    </button>

    <Link className="btn btn-success" to = "/adduser">Добавить пользователя</Link>

  </div>
</nav>
    </div>
  )
}
