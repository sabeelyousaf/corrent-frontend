import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ isAuthenticated, children, redirect }) => {

    const navigate = useNavigate()
    return (
        isAuthenticated ? children : navigate(redirect)
    )
}

export default ProtectedRoute
