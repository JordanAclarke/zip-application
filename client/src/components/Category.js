import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import NewPostForm from '../components/NewPostForm'
import CategoryList from '../components/CategoryList'
import {Navbar, Nav, NavDropdown, Card, Button} from 'react-bootstrap';
import Image from 'react-graceful-image'
const navBar = {backgroundColor: 'black'};
export default class Category extends Component {
    state = {
        category: {},
        posts: [],
        redirectToHome: false,
        isEditCategoryFormDisplay: false
    }
    componentDidMount() {
        this.getCategory(this.props.match.params.id)
    }

    getCategory = () => {
        axios.get(`/api/v1/categories/${this.props.match.params.id}/`)
            .then((res) => {
                this.setState({
                    category: res.data,
                    posts: res.data.posts
                })
            })
    }

    handleDeleteCategory = () => {
        axios.delete(`/api/v1/categories/${this.state.category.id}/`, this.state.category)
            .then((res) => {
                this.setState({
                    redirectToHome: true
                })
            })
    }
    handleChange = (evt) => {
        let copiedCategory = {...this.state.category}

        copiedCategory[evt.target.name] = evt.target.value
        this.setState({
            category: copiedCategory
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        axios.put(`/api/v1/categories/${this.state.category.id}/`, this.state.category)
            .then(() => {
                this.setState({
                    redirectToHome: true
                })
            })
            this.getCategory()
    }

    toggleCategoryEditForm = () => {
        this.setState({
            isEditCategoryFormDisplay: true
        })
    }
    render() {
        if(this.state.redirectToHome) {
            return <Redirect to={`/categories`} />
        }
        let postList = this.state.posts.map((post) => {
            return (
                <Link to={`/posts/${post.id}/`} className="inline">
                    <div className="position"></div>
                        <Card  bg="dark" text="black" className="title" >
                        <Card.Header as="h5">
                        Username: {post.username}
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Text>
                            {post.text}
                            </Card.Text>
                            <Card.Header>
                            Posted On: {post.date}
                        </Card.Header>
                            <Button variant="primary" style={{backgroundColor: "transparent", border:'transparent', color: "gold"}}>View Post</Button>
                        </Card.Body>
                        </Card>
                
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

                
                {
                    this.state.isEditCategoryFormDisplay
                    ?
                    <form onSubmit={this.handleSubmit} className="title">
                        <div className="txtb1">
                            <label htmlFor="category-title">Title:</label>
                            <input
                            type="text"
                            name="cate_title"
                            id="category-title"
                            onChange={this.handleChange}
                            value={this.state.category.cate_title}
                            />
                        </div>
                        <div className="txtb1">
                            <label htmlFor="category-description">Description:</label>
                            <input
                            type="text"
                            name="description"
                            id="category-description"
                            onChange={this.handleChange}
                            value={this.state.category.description}
                            />
                        </div>
                        <div className="txtb1">
                            <label htmlFor="category-photo">Photo:</label>
                            <input
                            type="text"
                            name="photo_url"
                            id="category-photo"
                            onChange={this.handleChange}
                            value={this.state.category.photo_url}
                            />
                            <div className="sub">
                            <input 
                            type='submit'
                            value='Update Category'
                            />
                            </div>
                        </div>
                    </form>
                    :
                    <div>
                        <h2 className="title">{this.state.category.cate_title}</h2>
                        <p className="para">Description:{this.state.category.description}</p>
                        {/* <Image src={this.state.category.photo_url} alt="⚡" placeholderColor="gold" height='300' width='400' /> */}
                        <div>
                        <Button variant="success" onClick = {this.toggleCategoryEditForm}>Edit Category <i class="fa fa-key"></i></Button>
                        <Button variant="danger" onClick={this.handleDeleteCategory}>Delete Category <i class="fa fa-scissors"></i></Button>
                        </div>
                        <h3 className="title">{this.state.category.cate_title} Posts:</h3>
                        <Button style={{backgroundColor: "black", border:'transparent'}}>
                        <Link 
                        className="title"
                        to={{pathname: `/categories/${this.props.match.params.id}/posts/new`, state: {category: this.state.category.id}}}>
                            Create A Post <i class="fa fa-plus-square-o"></i>
                        </Link >
                        </Button>
                        <div className='position1'>
                        {postList} 
                        </div>
                        {/* <Link 
                        to={{pathname: '/posts/new', state: {category: this.state.category.id}}}>
                            Add A New Post
                        </Link> */}
            
                        
                    </div>
                }
            </div>
        )
    }
}
