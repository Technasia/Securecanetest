import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { CookieName } from '../model/Config';
import { GetCookieValue } from '../model/Functions';

class AuthorisedPage extends Component{
    constructor(){
        super();
        this.state = {
            username: GetCookieValue(CookieName)
        }
    }
    render(){
        let { username } = this.state;
        return(
            <div className="mdWrapper">
                <img src="./image/logo.png" alt="Keycloak OIDC" />
                <h3>Keycloak - OIDC</h3>
                <h4>React JS - Implicit flow authentication</h4>
                {username ? (<p>Welcome <strong>{username}</strong></p>) : ""}
                <Outlet />
            </div>
        )
    }
}

export default AuthorisedPage;