import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

    const navigate = useNavigate()

    // Logout Implementation

    const handleSignOut = () => {
        signOut(auth).
            then(
                navigate('/')
            ).catch(err => {
                alert(err.message)
            })
    }


    return (
        <>


            <h1>DashBoard</h1>

            <button
                onClick={handleSignOut}
            >
                SignOut</button>
        </>
    )

}

export default Dashboard