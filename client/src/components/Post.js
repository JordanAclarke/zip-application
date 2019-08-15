import React, { Component } from 'react'
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'
import NewCommentForm from '../components/NewCommentForm'
import {Navbar, Nav, NavDropdown, Card, Button} from 'react-bootstrap';
export default class Post extends Component {
    state = {
        post: {},
        comments: [],
        redirectToHome: false
    }

    componentDidMount() {
        this.getPost(this.props.match.params.id)
    }

    getPost = () => {
        axios.get(`/api/v1/posts/${this.props.match.params.id}/`)
            .then((res) => {
                this.setState({post: res.data,
                comments: res.data.comments
            })
            })
    }
    handleDeletePost = () => {
        axios.delete(`/api/v1/posts/${this.state.post.id}/`, this.state.post)
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
        let commentList = this.state.comments.map((comment) => {
            return (
                <Link to={`/comments/${comment.id}/`}>
                    {comment.username}
                    {comment.userphoto}
                    {comment.date}
                    {comment.response}
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
                <h2>{this.state.post.username}</h2>
                <img src={this.state.post.user_photo} />
                <p>{this.state.post.date}</p>
                <p>{this.state.post.title}</p>
                <p>{this.state.post.text}</p>
                <h3>{this.state.post.location}</h3>
                <p>{this.state.post.mood}</p>
                <img src={this.state.post.text_photo} />
                <button onClick={this.handleDeletePost}>Delete Post</button>

                <h2>Comments:</h2>
                {/* <Link 
                        to={{pathname: '/comments/new', state: {post: this.state.post.id}}}>
                            Add A New Comment
                        </Link> */}
                {/* <Link to={`/posts/${this.props.match.params.id}/comments/new`}>Add a Comment</Link> */}
                {commentList}
                <NewCommentForm 
                match={this.props.match}
                />
            </div>
        )
    }
}
