import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions/user"
import React from "react";
import App from "../App";
import AppBar from "../components/AppBar";
import Home from "../components/Home";
import Country from "../components/Country";
import Login from "../components/Login";
import SignUp from "../components/SignUp"

class Index extends React.Component { 
    componentWillMount() {
        this.props.fetchUser();
      }

    render(){ 
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                    <AppBar>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/country/:id' component={Country} />
                    </AppBar>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default connect(
  null,
  { fetchUser }
)(Index);
