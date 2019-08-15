import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
export default class CategoryList extends Component {
    state = {
        categories: []
    }
    componentDidMount() {
        this.fetchAllCategories()
    }
    fetchAllCategories = () => {
        axios.get('/api/v1/categories/')
            .then((res) => {
                this.setState({categories: res.data})
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        let categoryList = this.state.categories.map((category) => {
            return (
                <div>
                    <Link to ={`/categories/${category.id}/`}>
                        <h2>{category.cate_title}</h2>
                        <img src={category.photo_url} alt={category.description} />
                    </Link>
                </div>
            )
        })
        return (
            <div>
                <Navbar bg="light" expand="lg">
                <NavDropdown title="≡" id="basic-nav-dropdown">
                <NavDropdown.Item href="/categories">Categories</NavDropdown.Item>
                </NavDropdown>
                <Navbar.Brand href="#home">ZIP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                <Link to={'/categories/new/'}>Create New Category</Link>
                {categoryList}
            </div>
        )
    }
}
