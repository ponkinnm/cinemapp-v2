import React  from 'react';
import {Link} from "react-router-dom";

function NoPageView() {

    return (
        <div>
            <h1 className="d-grid w-100 justify-content-center">404</h1>
            <h2>Page not found</h2>
            <Link to="/">Home</Link>
        </div>
    );
}

export default NoPageView;