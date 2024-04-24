import React, { useEffect } from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

    const navigate = useNavigate()


    // handle protection of unauthorised access of auth route
    useEffect(() => {

        auth.onAuthStateChanged(user => {
            if (!user) {
                navigate('/')
            }
        })
    })

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