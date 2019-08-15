import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {Navbar, Nav, NavDropdown, Card, Button} from 'react-bootstrap';
import Img from 'react-image'
const navBar = {backgroundColor: 'azure'};
const myComponent = <img src="https://res.cloudinary.com/teepublic/image/private/s--eiJpaZjz--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_191919,e_outline:35/co_191919,e_outline:inner_fill:35/co_ffffff,e_outline:35/co_ffffff,e_outline:inner_fill:35/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1493344513/production/designs/1533556_1.jpg" />
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
                
                <Link to ={`/categories/${category.id}/`} className="inline">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={category.photo_url} alt="⚡" />
                        <Card.Body>
                            <Card.Title>{category.cate_title}</Card.Title>
                            <Card.Text>
                            {category.description}
                            </Card.Text>
                            <Button variant="primary">View {category.cate_title} Posts</Button>
                        </Card.Body>
                        </Card>
                    </Link>
            )
        })
        return (
            <div>
                <Navbar style = {navBar} expand="lg">
                <NavDropdown title="≡" id="basic-nav-dropdown">
                <NavDropdown.Item href="/">Home</NavDropdown.Item>
                <NavDropdown.Item href="/categories">Categories</NavDropdown.Item>
                </NavDropdown>
                <Navbar.Brand href="/categories">ZIP <i class="fa fa-bolt"></i></Navbar.Brand>
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
