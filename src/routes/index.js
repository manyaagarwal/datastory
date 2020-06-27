import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";
import App from "../App";
import AppBar from "../components/AppBar";

class Index extends React.Component { 
    render(){ 
        return(
            <BrowserRouter>
                <Switch>
                    <AppBar>
                        
                    </AppBar>
                    {/* <Route exact path='/' component={App} /> */}
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Index; 