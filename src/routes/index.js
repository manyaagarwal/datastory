import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";
import App from "../App";
import AppBar from "../components/AppBar";
import Home from "../components/Home";
import Country from "../components/Country";

class Index extends React.Component { 
    render(){ 
        return(
            <BrowserRouter>
                <Switch>
                    <AppBar>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/country/:id' component={Country} />
                    </AppBar>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Index; 