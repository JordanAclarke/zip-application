import React, { Component } from 'react'
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'
import NewCommentForm from '../components/NewCommentForm'
import {Navbar, Nav, NavDropdown, Card, Button, ListGroup} from 'react-bootstrap';
import Image from 'react-graceful-image'
const navBar = {backgroundColor: 'black'};
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
            return <Redirect to={`/categories/${this.state.post.category}/`}/>
        }
        let commentList = this.state.comments.map((comment) => {
            return (
                <Link to={`/comments/${comment.id}/`}>
                <Card bg="dark" text="black">
                        <Card.Header className="title">{this.state.post.title}</Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                            <p className="title">
                                {' '}
                                {comment.response}{' '}
                            </p>
                            <footer className="title">
                                Posted On: {comment.date} By <cite title="Source Title">{comment.username}</cite>
                            </footer>
                            </blockquote>
                            </Card.Body>
                            </Card>
                </Link>
            )
        })
        return (
            <div>
                <Navbar className="nav-test" style = {navBar} expand="lg">
                <NavDropdown className="title" title="≡" id="basic-nav-dropdown">
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

                                <Card  bg="dark" text="black" className="title">
                <Card.Header as="h5">{this.state.post.username} Feeling {this.state.post.mood}</Card.Header>
                <Card.Body>
                    <Card.Title>{this.state.post.title}</Card.Title>
                    <Card.Text>
                    {this.state.post.text}
                    </Card.Text>
                    <Image src={this.state.post.text_photo} placeholderColor= "dark" height="300" width="300"/>
                    <div>
                    <Button variant="danger" onClick={this.handleDeletePost}>Delete Post</Button>
                    </div>
                    <Card.Header as="h5">Posted On: {this.state.post.date}</Card.Header>
                </Card.Body>
                </Card>
                
                <h2 className="title">Comments:</h2>
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
