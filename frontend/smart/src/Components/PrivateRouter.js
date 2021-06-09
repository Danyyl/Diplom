import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRouter(props){
    const {component: Component, path, isLoggedIn, ...rest} = props;
    return (
        <div>
            {isLoggedIn ? (
                <Route
                    {...rest}
                    path={path}>
                    <Component {...props}/>
                </Route>
            ) : (
                <Redirect to={"auth"} />
            )}
        </div>
    )
}