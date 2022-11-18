import {
    Switch,
    Route,
    Redirect, BrowserRouter,
} from "react-router-dom";
import {Header} from "./components/Header";
import {ItemView} from "./components/ItemView";
import {List} from "./components/List";
import React from 'react'


function App() {

    return (
        <BrowserRouter>
            <React.StrictMode>
            <div className="App">
                <div className="container">
                    <Header/>
                    <Switch>
                        <Route component={List} exact path="/items"/>
                        <Route component={ItemView}  path="/items/:id"/>
                        <Redirect to="/items" />
                    </Switch>
                </div>
            </div>
            </React.StrictMode>
        </BrowserRouter>
    );
}

export default App;