import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import {Navbar, Nav, NavDropdown, Card, Button} from 'react-bootstrap';
const navBar = {backgroundColor: 'black'};
export default class NewCategoryForm extends Component {
    state = {
        newCategory: {
            cate_title: '',
            description: '',
            photo_url: ''
        },
        redirectToHome: false
    }

    handleChange = (evt) => {
        let copiedCategory = {...this.state.newCategory}

        copiedCategory[evt.target.name] = evt.target.value
        this.setState({
            newCategory: copiedCategory
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        axios.post('/api/v1/categories/', this.state.newCategory)
            .then(() => {
                this.setState({
                    redirectToHome: true
                })
            })
    }
    render() {
        if(this.state.redirectToHome) {
            return <Redirect to="/categories" />
        }
        return (
            <div>
                <Navbar className="nav-test" style = {navBar} expand="lg">
                <NavDropdown title="≡" id="basic-nav-dropdown">
                <NavDropdown.Item href="/">Home</NavDropdown.Item>
                <NavDropdown.Item href="/categories">Categories</NavDropdown.Item>
                </NavDropdown>
                <Navbar.Brand href="/categories" className="nav"><span className="nav">ZIP</span> <i class="fa fa-bolt"></i></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                </Navbar.Collapse>
                </Navbar>

                <h2 className="comment-header">Add New Category</h2>
                <div className="comment-form">
                <form onSubmit={this.handleSubmit} className="title">
                    <div>
                        <div  className="txtb">
                            <label htmlFor="category-title">Title:</label>
                            <input
                            type="text"
                            name="cate_title"
                            id="category-title"
                            onChange={this.handleChange}
                            value={this.state.newCategory.cate_title}
                            />
                        </div>
                        <div className="txtb">
                            <label htmlFor="category-description">Description:</label>
                            <input
                            type="text"
                            name="description"
                            id="category-description"
                            onChange={this.handleChange}
                            value={this.state.newCategory.description}
                            />
                        </div>
                        <div className="txtb">
                            <label htmlFor="category-photo">Photo:</label>
                            <input
                            type="text"
                            name="photo_url"
                            id="category-photo"
                            onChange={this.handleChange}
                            value={this.state.newCategory.photo_url}
                            />
                            <div>
                            <input 
                            type='submit'
                            value='create category'
                            />
                            </div>
                            </div>
                        </div>
                    </form>
                    </div>
            </div>
        )
    }
}

