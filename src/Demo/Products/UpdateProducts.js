import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import firebase from 'firebase';
import { withRouter } from 'react-router';

import Aux from "../../hoc/_Aux";

class AddProducts extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id:'',
            make:'',
            productType:'',
            model:'',
            makelist:[]
        }
    }

    componentDidMount(){
        console.log(this.props.location.aboutProps)
        if(this.props.location.aboutProps){
            this.setState({id:this.props.location.aboutProps.id})
            this.setState({make:this.props.location.aboutProps.make})
            this.setState({productType:this.props.location.aboutProps.productType})
            this.setState({model:this.props.location.aboutProps.model})
        } 
        this.getMake(value=>{
            this.setState({makelist:value})
        })
               
    }

    getMake=(callback)=>{
        let temp =[]
        firebase.database().ref(`/MakeTemplate/`).on("value", snap=>{
            Object.keys(snap.val()).map((data)=>{
                console.log(snap.val()[data])
                temp.push(snap.val()[data].name)
            })
            callback(temp)            
        })       
    }

    setMake = async () => {
        await this.setState({make:this.make.value})
        await console.log(this.state.make)
    }

    setModel = async () => {
        await this.setState({model:this.model.value})
        await console.log(this.state.model)
    }

    setProductType = () => {
        this.setState({productType:this.productType.value})
        console.log(this.state.productType)
    }

    onUpdate= async ()=>{
        if ( this.state.make === '') {
            alert("Selct Make")
        } else if (this.state.model === ''){
            alert("Select Model")
        } else if (this.state.productType === ''){
            alert("Enter Product Type")
        } else {     
            await firebase.database().ref(`/Make/${this.state.make}/${this.state.model}/${this.state.id}/`).set({
                name:this.state.productType 
            }).then(data=>{
                alert("Updated !")
                this.props.history.go(-1)
            })
            .catch(error=>{alert(error)})                
        } 
    }

    render() {
        return (            
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Update Product</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="addStaffForm.UserGroupSelect"  >
                                                <Form.Label>Make</Form.Label>
                                                <Form.Control as="select" ref={(ref) => {this.make = ref}} onChange={this.setMake} value={this.state.make}>
                                                    <option value={null}>Select Make</option>
                                                    {
                                                        // this.state.makelist.lensgth>0&&
                                                        this.state.makelist.map((data,index)=>{
                                                            return(
                                                                <option value={data} key={index}>{data}</option>
                                                            )
                                                        })
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                            
                                            <Form.Group controlId="addStaffForm.Country">
                                                <Form.Label>Model</Form.Label>
                                                <Form.Control as="select" ref={(ref) => {this.model = ref}} onChange={this.setModel} value={this.state.model}>
                                                    <option value={null}>Select Model</option>
                                                    <option value={'Mobile'}>Mobile</option>
                                                    <option value={'Parts'}>Parts</option>
                                                    <option value={'China'}>Accessories</option>
                                                    <option value={'Russia'}>Tablets</option>
                                                    <option value={'Japan'}>PC/Games</option>
                                                    <option value={'Japan'}>Gadgets</option>
                                                </Form.Control>
                                            </Form.Group>                                            

                                            <Form.Group controlId="addStaffForm.Mobile">
                                                <Form.Label>Product Type</Form.Label>
                                                <Form.Control ref={(ref) => {this.productType = ref}} placeholder="Enter Product Type" value={this.state.productType} 
                                                    onChange={this.setProductType}/>
                                            </Form.Group>                                           
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button className="btn-success float-left" name="addNewStaff" onClick={this.onUpdate} >Save</Button>
                                            <Button className="btn-default float-right" name="cancel"  ><NavLink style = {{color:"white"}} to="/products/products">Cancel</NavLink></Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

const AddProductsWithRouter = withRouter(AddProducts)

export default AddProducts;
