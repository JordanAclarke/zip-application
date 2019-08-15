import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import NewPostForm from '../components/NewPostForm'
import {Navbar, Nav, NavDropdown, Card, Button} from 'react-bootstrap';
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
            return <Redirect to="/" />
        }
        let postList = this.state.posts.map((post) => {
            return (
                <Link to={`/posts/${post.id}/`}>
                    <Card className="text-center">
                    <Card.Header>{post.username}</Card.Header>
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>
                            {post.text}
                        </Card.Text>
                        <Button variant="primary">View Post</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">Posted On:{post.date}</Card.Footer>
                    </Card>
                </Link>
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

                {/* <NewPostForm match={this.props.match}/>  */}
                {
                    this.state.isEditCategoryFormDisplay
                    ?
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="category-title">Title:</label>
                            <input
                            type="text"
                            name="cate_title"
                            id="category-title"
                            onChange={this.handleChange}
                            value={this.state.category.cate_title}
                            />
                        </div>
                        <div>
                            <label htmlFor="category-description">Description:</label>
                            <input
                            type="text"
                            name="description"
                            id="category-description"
                            onChange={this.handleChange}
                            value={this.state.category.description}
                            />
                        </div>
                        <div>
                            <label htmlFor="category-photo">Photo:</label>
                            <input
                            type="text"
                            name="photo_url"
                            id="category-photo"
                            onChange={this.handleChange}
                            value={this.state.category.photo_url}
                            />
                            <input
                            type='submit'
                            value='Update Category'
                            />
                        </div>
                    </form>
                    :
                    <div>
                        <h2>{this.state.category.cate_title}</h2>
                        <p>Description:{this.state.category.description}</p>
                        <img src={this.state.category.photo_url} height='500' width='500' />

                        <h3>{this.state.category.cate_title} Posts:</h3>
                        {postList}
                        {/* <NewPostForm match={this.props.match} /> */}
                        {/* <Link 
                        to={{pathname: '/posts/new', state: {category: this.state.category.id}}}>
                            Add A New Post
                        </Link> */}
                        <Link 
                        to={{pathname: `/categories/${this.props.match.params.id}/posts/new`, state: {category: this.state.category.id}}}>
                            Add A New Post
                        </Link>
                        <button onClick = {this.toggleCategoryEditForm}>Edit Category</button>
                        <button onClick={this.handleDeleteCategory}>Delete Category</button>
                    </div>
                }
            </div>
        )
    }
}
