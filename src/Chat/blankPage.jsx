import React from "react";
import logoDarkWhite from '../img/logo_dark-white-removebg-preview.png'

const BlankPage = () => {
    return (
        <div className="blankPageContainer">
            <div className="blankPageCenter">
                <img src={logoDarkWhite} alt="" />
                <h8>Chat App for Windows</h8>
                <p>Send and receive messages without keeping your phone online.</p>
            </div>
        </div>
    )
}

export default BlankPage;