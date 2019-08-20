import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {Navbar, Nav, NavDropdown, Card, Button} from 'react-bootstrap';
import Img from 'react-image'
import Image from 'react-graceful-image'
const navBar = {backgroundColor: 'black'};
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
                    <div className="position">
                    <Card style={{ width: '18rem' }}  bg="dark" text="black" className='title' >
                        <Image src={category.photo_url} alt="⚡" placeholderColor="gold" height="200"/>
                        <Card.Body>
                            <Card.Title >{category.cate_title}</Card.Title>
                            <Card.Text>
                            {category.description}
                            </Card.Text>
                            <Button className="title" variant="primary" style={{backgroundColor: "black", border:'transparent'}}>View {category.cate_title} Posts</Button>
                        </Card.Body>
                        </Card>
                        </div>
                    </Link>
            )
        })
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

                <h1 className="title">Topics <i class="fa fa-hand-o-up"></i></h1>
                <Button variant="success" className="create"><Link className="create" to={'/categories/new/'}>Add A Category <i class="fa fa-check-square-o"></i></Link></Button>
                <div className='position1'>
                {categoryList}
                </div>
            </div>
        )
    }
}
