import React, { Component } from 'react'
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom'
import {Navbar, Nav, NavDropdown, Card, Button} from 'react-bootstrap';
export default class Comment extends Component {
    state = {
        comment: {},
        redirectToHome: false
    }
    
    componentDidMount() {
        this.getComment(this.props.match.params.id)
    }
    getComment = () => {
        axios.get(`/api/v1/comments/${this.props.match.params.id}/`)
            .then((res) => {
                this.setState({
                    comment: res.data
                })
            })
    }
    handleDeleteComment = () => {
            axios.delete(`/api/v1/comments/${this.state.comment.id}/`, this.state.comment)
                .then(() => {
                    this.setState({
                        redirectToHome: true
                    })
                })
        }
    render() {
        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <Navbar bg="light" expand="lg">
                <NavDropdown title="≡" id="basic-nav-dropdown">
                <NavDropdown.Item href="/">Home</NavDropdown.Item>
                <NavDropdown.Item href="/categories">Categories</NavDropdown.Item>
                </NavDropdown>
                <Navbar.Brand href="#home">ZIP <i class="fa fa-bolt"></i></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                <h2>Username: {this.state.comment.username}</h2>
                <p>{this.state.comment.response}</p>
                <button onClick={this.handleDeleteComment}>Delete Comment</button>
            </div>
        )
    }
}
