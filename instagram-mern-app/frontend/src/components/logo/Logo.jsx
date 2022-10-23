import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <Link to='/' style={{ display: "flex" }}>
            <img src="/images/instalogo.png"
                alt="logo" />
        </Link>
    )
}

export default Logo