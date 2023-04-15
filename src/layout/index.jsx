import React from 'react'
import Navbar from '../components/Navbar'

const Index = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default Index
