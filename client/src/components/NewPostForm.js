import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

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
            category: this.props.match.params.id
        },
        redirectToHome: false
    }
    componentDidMount = () => {
        axios.get('/api/v1/categories/')
            .then((res) => {
                this.setState({categories: res.data})
            })
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
    
    render() {
        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <h2>Add A New Post</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div>
                        <label htmlFor="post-username">UserName:</label>
                        <input
                        type='text'
                        name='username'
                        id='post-username'
                        onChange={this.handleChange}
                        value={this.state.newPost.username}
                        />
                        </div>

                        <div>
                        <label htmlFor="post-user-photo">Profile Photo:</label>
                        <input
                        type='text'
                        name='user_photo'
                        id='post-user-photo'
                        onChange={this.handleChange}
                        value={this.state.newPost.user_photo}
                        />
                        </div>

                        <div>
                        <label htmlFor="post-date">Date:</label>
                        <input
                        type='text'
                        name='date'
                        id='post-date'
                        onChange={this.handleChange}
                        value={this.state.newPost.date}
                        />
                        </div>


                        <div>
                        <label htmlFor="post-title">Post Title:</label>
                        <input
                        type='text'
                        name='title'
                        id='post-title'
                        onChange={this.handleChange}
                        value={this.state.newPost.title}
                        />
                        </div>


                        <div>
                        <label htmlFor="post-text">Post:</label>
                        <input
                        type='text'
                        name='text'
                        id='post-text'
                        onChange={this.handleChange}
                        value={this.state.newPost.text}
                        cols="300" 
                        rows="100"
                        />
                        </div>

                        <div>
                        <label htmlFor="post-location">Location:</label>
                        <input
                        type='text'
                        name='location'
                        id='post-location'
                        onChange={this.handleChange}
                        value={this.state.newPost.location}
                        />
                        </div>
                        
                        <div>
                        <label htmlFor="post-mood">Mood:</label>
                        <input
                        type='text'
                        name='mood'
                        id='post-mood'
                        onChange={this.handleChange}
                        value={this.state.newPost.mood}
                        />
                        </div>

                        <label htmlFor="post-text-photo">Post Photo:</label>
                        <input
                        type='text'
                        name='text_photo'
                        id='post-text-photo'
                        onChange={this.handleChange}
                        value={this.state.newPost.text_photo}
                        />
                        <div>
                        <input
                        type='submit'
                        value='Create Post'
                        />
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}
