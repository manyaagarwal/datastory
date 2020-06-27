import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";

class Index extends React.Component { 
    render(){ 
        return(
            <BrowserRouter>
                <Switch>
                    {/* <Route exact path='/' component={App} /> */}
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Index; 