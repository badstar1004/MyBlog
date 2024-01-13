import React from "react";
import AppBars from "../components/AppBars";
import Footer from './../components/Footer';


function withLayout(WrappedComponent) {
    return function(props) {
        return(
            <div>
                <AppBars/>
                <WrappedComponent {...props} />
                <Footer/>
            </div>
        );
    };
}

export default withLayout;
