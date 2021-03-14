import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import {Link, withRouter} from 'react-router-dom';
import EditUser from "./EditUser";
import UserInfo from "./UserInfo";


const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;


class UserProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            editMode: false,
            canEdit: null,
        };
    }

    async logout() {
        console.log("Logging out")
        const requestBody = JSON.stringify({
            id: localStorage.getItem('id'),
            token: localStorage.getItem('token')
        });
        console.log("Request body: " + requestBody)

        await api.post('/users/'+localStorage.getItem('id'), requestBody);

        localStorage.removeItem('token');
        localStorage.removeItem('id');
        console.log("Local storage info update: " + localStorage.getItem('id'))
        this.props.history.push('/login');
    }

    edit(){
        this.setState({editMode: !this.state.editMode})
        console.log("Editing...")
    }



    async componentDidMount() {
        try {
            const response = await api.get(`/users/${this.props.match.params.id}`);
            // delays continuous execution of an async operation for 1 second.
            // This is just a fake async call, so that the spinner can be displayed
            // feel free to remove it :)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the returned users and update the state.
            this.setState({ user: response.data });
            this.setState({ canEdit: localStorage.getItem('id') === this.state.user.id.toString()})

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <h2>User Profile</h2>
                </Container>

                {!this.state.user ? (
                    <Container>
                        <Spinner />
                    </Container>
                ) : (
                    <div>
                        <Container>
                            {!this.state.editMode ? (
                                    <Button width="30%"
                                            disabled={!this.state.canEdit}
                                            onClick={() => this.edit()
                                            }
                                    >Edit</Button>
                                ) :
                                (<Button width="30%"
                                         onClick ={() => this.edit()
                                         }
                                >Stop Editing</Button>)}

                        </Container>
                        {this.state.editMode ? (
                            <EditUser />
                            ) : (
                                <UserInfo user = {this.state.user}/>
                                )}
                        <Container>
                            <Button
                                width="15%"
                                onClick={() => {
                                    this.logout();
                                }}
                            >
                                Logout
                            </Button>
                            <Button width="15%"
                                    onClick={() => {
                                        this.props.history.push(`/game`);
                                    }}>
                                Back To Game</Button>
                        </Container>
                        <Container>

                        </Container>

                    </div>
                )}
            </div>
        );
    }

}

export default withRouter(UserProfile);

//