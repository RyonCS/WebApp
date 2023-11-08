import React from 'react';
import { googleLogout } from '@react-oauth/google';
import Button from 'react-bootstrap/button';

function Logout({ setUser }) {
    const onClick = () => {
        googleLogout();
        setUser(null);
        localStorage.setItem('login', null);
        console.log("Logout successful!");
    };

    return (
        <div>
            <Button
            variant = 'light'
            onClick={onClick}
            >Logout</Button>
        </div>
    );
}

export default Logout;