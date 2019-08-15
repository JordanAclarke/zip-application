import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {Navbar, Nav, NavDropdown, Card, Button} from 'react-bootstrap';
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
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={category.photo_url} />
                        <Card.Body>
                            <Card.Title>{category.cate_title}</Card.Title>
                            <Card.Text>
                            {category.description}
                            </Card.Text>
                            <Button variant="primary">View {category.cate_title} Posts</Button>
                        </Card.Body>
                        </Card>
                    </Link>
                        {/* <h2>{category.cate_title}</h2>
                        <img src={category.photo_url} alt={category.description} /> */}
                    
                </div>
            )
        })
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

                <h1>Topics</h1>
                <Link to={'/categories/new/'}>Create New Category</Link>
                {categoryList}
            </div>
        )
    }
}
