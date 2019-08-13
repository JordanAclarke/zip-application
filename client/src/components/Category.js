import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

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

    handleDeleteCookbook = () => {
        axios.delete(`/api/v1/categories/${this.props.match.params.id}/`, this.state.category)
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

        axios.post(`/api/v1/categories/${this.state.category.id}`, this.state.category)
            .then((res) => {
                this.setState({
                    redirectToHome: true
                })
            })
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
                    <h2>{post.title}</h2>
                </Link>
            )
        })
        return (
            <div>
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
                        </div>
                    </form>
                    :
                    <div>
                        <h2>{this.state.category.cate_title}</h2>
                        <p>Description:{this.state.category.description}</p>
                        <img src={this.state.category.photo_url} />

                        <h3>{this.state.category.cate_title} Posts:</h3>
                        {postList}
                        <Link 
                        to={{pathname: '/recipes/new', state: {category: this.state.category.id}}}>
                            Add A New Post
                        </Link>
                        <button onClick = {this.toggleCategoryEditForm}>Edit Category</button>
                        <button onClick={this.handleDeleteCookbook}>Delete Category</button>
                    </div>
                }
            </div>
        )
    }
}