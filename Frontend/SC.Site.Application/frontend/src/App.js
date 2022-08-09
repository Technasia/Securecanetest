import React from 'react';
import './css/main.css';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Header from "./components/HeaderComponent";
import PrivateRoute from './utils/PrivateRoute';
import Home from "./pages/HomePage";
import Footer from "./components/FooterComponent";
//import Login from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";
import Nav from './components/Nav';

/** tuto keycloak https://blog.logrocket.com/implement-keycloak-authentication-react/ 
 *  doc keycloak-js https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter
*/

function App() {
    return (
        <ReactKeycloakProvider authClient={keycloak}>
            <BrowserRouter>
                <Nav />
                <div>
                    <Routes>
                        <Route exact path="/" element={
                            <Home />
                        } />

                        <Route exact path="/profile" element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        } />
                        {/* <Route exact path="/login" element={
                            <Login />
                        } /> */}
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </ReactKeycloakProvider>
    );
}

export default App;
