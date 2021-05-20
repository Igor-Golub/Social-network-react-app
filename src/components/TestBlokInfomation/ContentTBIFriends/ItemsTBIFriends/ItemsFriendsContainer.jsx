import React from "react";
import {connect} from "react-redux";
import ItemsFriends from "./ItemsFriends";


let mapStateToProps = (state) => {
    return {
        friendsInformation: state.friendsInformation
    }
}

let mapDispatchToProps = (dispatch) => {
    return{

    }
}


let ItemsFriendsContainer = connect(mapStateToProps, mapDispatchToProps)(ItemsFriends);

export default ItemsFriendsContainer;