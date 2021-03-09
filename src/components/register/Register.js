import React, { useState } from 'react'
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';

// styled components
const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

//todo:
// * change to hooks
// * delete name as an input field
// * after successful registration the user is redirected to user profile
// * creation date is saved in the backend

class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            name: null,
            username: null,
            password: null
        };
    }

    async register() {
        try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                name: this.state.name,
                password: this.state.password
            });
            const response = await api.post('/users', requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            localStorage.setItem('token', user.token);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push(`/game`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }


    componentDidMount() {}

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <Label>Username</Label>
                        <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />
                        <Label>Name</Label>
                        <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('name', e.target.value);
                            }}
                        />
                        <Label>Password</Label>
                        <InputField
                            type = 'password'
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('password', e.target.value);
                            }}
                        />
                        <ButtonContainer>
                            <Button
                                disabled={!this.state.username || !this.state.name || !this.state.password}
                                width="50%"
                                onClick={() => {
                                    this.register();
                                }}
                            >
                                Login
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

/*
const Register = () => {
    const [name, setName] = useState('') //todo:delete
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const register = async () => {
        try{
            const requestBody = JSON.stringify({
                name: name, //todo:delete
                username: username,
                password: password
            });
            const response = await api.post('/users', requestBody);
            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            localStorage.setItem('token', user.token);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push(`/game`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }
//todo:delete name
    return(
        <BaseContainer>
            <FormContainer>
                <Form>

                    <Label>Name</Label>
                    <InputField
                        placeholder="Enter here.."
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Label>Username</Label>
                    <InputField
                        placeholder="Enter here.."
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Label>Password</Label>
                    <InputField
                        type = 'password'
                        placeholder="Enter here.."
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <ButtonContainer>
                        <Button
                            disabled={!username || !password}
                            width="50%"
                            onClick={() =>{
                                register();
                            }}
                        >
                            Register
                        </Button>
                    </ButtonContainer>
                </Form>
            </FormContainer>
        </BaseContainer>
    )
}

 */

export default withRouter(Register);