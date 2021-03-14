import {BaseContainer} from "../../helpers/layout";
import React, {useState}  from "react";
import styled from "styled-components";
import {Button} from "../../views/design/Button";
import {api} from "../../helpers/api";

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

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;


const EditUser = () => {
    const [username,setUsername] = useState('') // setText is the method to update the state
    const [name, setName]= useState('')
    const [birthDate, setBirthDate] = useState('')


    const updateUser = async () => {
        const requestBody = JSON.stringify({
            username: username,
            name: name,
            birthDate: birthDate
        })

        console.log(requestBody)
        await api.put('/users/' + localStorage.getItem('id'), requestBody)
        console.log(requestBody)

        //refresh page
        window.location.reload();

    }

    return(
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <Label>Username</Label>
                        <InputField
                            placeholder="Enter here.."
                            onChange={(e) => setUsername(e.target.value)}/>


                        <Label>Name</Label>
                        <InputField
                            placeholder="Enter here.."
                            onChange={(e) => setName(e.target.value)}/>

                        <Label>Birthday</Label>
                        <InputField type="date"
                                    onChange={(e) => setBirthDate(e.target.value)}/>

                        <ButtonContainer>
                            <Button
                                width="100%"
                                onClick={() => {updateUser()}}
                            >
                                Save Changes
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
    )

}

export default EditUser