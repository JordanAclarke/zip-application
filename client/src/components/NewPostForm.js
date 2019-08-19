import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import {Navbar, Nav, NavDropdown, Card, Button} from 'react-bootstrap';
export default class NewPostForm extends Component {
    state = {
        newPost: {
            username: '',
            user_photo: '',
            date: '',
            title: '',
            text: '',
            location: '',
            mood: '',
            text_photo: '',
            category: this.props.match.params.id,
        },
        loading: true,
        person: null,
        redirectToHome: false
    }
    componentDidMount = () => {
        axios.get('/api/v1/categories/')
            .then((res) => {
                this.setState({categories: res.data})
            })
            this.createName()
    }

    handleChange = (evt) => {
        let copiedPost = {...this.state.newPost}

        copiedPost[evt.target.name] = evt.target.value
        this.setState({
            newPost: copiedPost
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        axios.post(`/api/v1/posts/`, this.state.newPost)
            .then(() => {
                this.setState({
                    redirectToHome: true
                })
            })
    }

    async createName() {
        const url = "https://api.randomuser.me/";
        const response = await fetch(url);
        const data = await response.json()
        let nickName = {...this.state.newPost}
        nickName.username=data.results[0].login.username
        this.setState({ newPost: nickName, loading: false })
        console.log(data.results[0]);
    }
    
    render() {
        if(this.state.redirectToHome) {
            return <Redirect to={`/categories/${this.state.newPost.category}/`} />
        }
        if(this.state.loading) {
            return <div>Loading.....</div>
        }

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
                <h2 className="comment-header">Add A New Post</h2>
                <div className="comment-form">
                <form onSubmit={this.handleSubmit} className="title">
                    <div>
                        <div className="txtb">
                        <label htmlFor="post-username">UserName:</label>
                        <input
                        type='text'
                        name='username'
                        id='post-username'
                        onChange={this.handleChange}
                        value={this.state.newPost.username}
                    
                        />
                        </div>
                        <div className="txtb">
                        <label htmlFor="post-mood">Mood:</label>
                        <input
                        type='text'
                        name='mood'
                        id='post-mood'
                        placeholder="How are you feeling?"
                        onChange={this.handleChange}
                        value={this.state.newPost.mood}
                        />
                        </div>

                        <div className="txtb">
                        <label htmlFor="post-title">Post Title:</label>
                        <input
                        type='text'
                        name='title'
                        id='post-title'
                        onChange={this.handleChange}
                        value={this.state.newPost.title}
                        />
                        </div>

                        <div className="txtb">
                        <label htmlFor="post-text-photo">Post Photo:</label>
                        <input
                        type='text'
                        name='text_photo'
                        id='post-text-photo'
                        onChange={this.handleChange}
                        value={this.state.newPost.text_photo}
                        />
                        </div>

                        <div className="txtb">
                        <label htmlFor="post-text">Post:</label>
                        <textarea
                        type='text'
                        name='text'
                        id='post-text'
                        onChange={this.handleChange}
                        value={this.state.newPost.text}
                        cols="30" 
                        rows="5"
                        placeholder="Whats on your mind?"
                        />
                        </div>

                        <div className="txtb">
                        <input
                        type='submit'
                        value='Create Post'
                        />
                        </div>
                    </div>

                </form>
                </div>
            </div>
        )
    }
}
