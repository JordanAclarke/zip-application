import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {Navbar, Nav, NavDropdown, Card, Button} from 'react-bootstrap';
export default class NewCommentForm extends Component {
    state = {
        newComment: {
            username: '',
            user_photo: '',
            date: '',
            response: '',
            user_location: '',
            post: this.props.match.params.id
        },
        redirectToHome: false
    }

    // componentDidMount = () => {
    //     const route = {...this.state.newComment}
    //     route.postId = this.props.match.params.postId
    //     this.setState({newComment: route})
    //     // axios.get(`/api/v1/posts/${this.props.match.params.id}/`)
    //     //     .then((res) => {
    //     //         this.setState({posts: this.state.id})
    //     //     })
    // }

    handleChange = (evt) => {
        let copiedComment = {...this.state.newComment}

        copiedComment[evt.target.name] = evt.target.value
        this.setState({
            newComment: copiedComment
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        axios.post(`/api/v1/comments/`, this.state.newComment)
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
        return (
            <div>
                <h2>Add A New Comment</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                    <label htmlFor='comment-username'>Username:</label>
                    <input 
                    type='text'
                    name='username'
                    id='comment-username'
                    onChange={this.handleChange}
                    value={this.state.newComment.username}
                    />
                    </div>

                    <div>
                    <label htmlFor='comment-user-photo'>User Photo:</label>
                    <input 
                    type='text'
                    name='user_photo'
                    id='comment-user-photo'
                    onChange={this.handleChange}
                    value={this.state.newComment.user_photo}
                    />
                    </div>

                    <div>
                    <label htmlFor='comment-date'>Date:</label>
                    <input 
                    type='text'
                    name='date'
                    id='comment-date'
                    onChange={this.handleChange}
                    value={this.state.newComment.date}
                    />
                    </div>

                    <div>
                    <label htmlFor='comment-response'>Response:</label>
                    <input 
                    type='text'
                    name='response'
                    id='comment-response'
                    onChange={this.handleChange}
                    value={this.state.newComment.response}
                    />
                    </div>

                    <div>
                    <label htmlFor='comment-user-location'>Location:</label>
                    <input 
                    type='text'
                    name='user_location'
                    id='comment-user-location'
                    onChange={this.handleChange}
                    value={this.state.newComment.user_location}
                    />
                    <input
                    type='submit'
                    value='Add Comment'
                    />
                    </div>

                </form>
                
            </div>
        )
    }
}
