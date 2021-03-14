import {Button} from "../../views/design/Button";
import React from "react";
import {BaseContainer} from "../../helpers/layout";
import styled from "styled-components";


const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const UserInfo = ({user}) => {
    return(
        <Container>
            <p>Id : {user.id}</p>
            <p>Username : {user.username}</p>
            <p>Name: {user.name}</p>
            <p>Creation date : {user.creationDate}</p>
            <p>Birthday : {user.birthDate}</p>
            <p>Status : {user.status}</p>
        </Container>
    )

}
export default UserInfo