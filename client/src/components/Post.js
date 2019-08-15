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

                                <Card>
                <Card.Header as="h5">{this.state.post.username}</Card.Header>
                <Card.Img variant="top" src={this.state.post.user_photo} />
                <Card.Body>
                    <Card.Title>{this.state.post.title}</Card.Title>
                    <Card.Text>
                    {this.state.post.text}
                    </Card.Text>
                    <Card.Img variant="top" src={this.state.post.text_photo} />
                    <div>
                    <button onClick={this.handleDeletePost}>Delete Post</button>
                    </div>
                    <Card.Header as="h5">Posted On: {this.state.post.date}</Card.Header>
                </Card.Body>
                </Card>
                
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
