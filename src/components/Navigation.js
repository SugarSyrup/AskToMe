import React from "react";
import {Link} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookieBite, faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => {
    return (
        <nav>
            <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                <li>
                    <Link to="/" style={{ marginRight: 30 , fontSize: 16}}>
                        <FontAwesomeIcon icon={faCookieBite} color={"#FFBABA"} size="2x" />
                    </Link>
                </li>
                <li>
                    <Link
                        to="/profile"
                        style={{
                            marginLeft: 10,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            fontSize: 16,
                        }}
                        >
                            <FontAwesomeIcon icon={faUser} color={"#FFBABA"} size="2x" />
                            {/* <span style={{ marginTop: 10 }}>
                                {userObj.displayName
                                ? `${userObj.displayName}'s Profile`
                                : "Profile"}
                            </span> */}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;