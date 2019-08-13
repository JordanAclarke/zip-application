import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default class NewCategoryForm extends Component {
    state = {
        newCategory: {
            cate_title: '',
            description: '',
            photo_url: ''
        },
        redirectToHome: false
    }

    handleChange = (evt) => {
        let copiedCategory = {...this.state.newCategory}

        copiedCategory[evt.target.name] = evt.target.value
        this.setState({
            newCategory: copiedCategory
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        axios.post(`/api/v1/categories/`, this.state.category)
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
                <h2>Add New Category</h2>
                <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="category-title">Title:</label>
                            <input
                            type="text"
                            name="cate_title"
                            id="category-title"
                            onChange={this.handleChange}
                            value={this.state.newCategory.cate_title}
                            />
                        </div>
                        <div>
                            <label htmlFor="category-description">Description:</label>
                            <input
                            type="text"
                            name="description"
                            id="category-description"
                            onChange={this.handleChange}
                            value={this.state.newCategory.description}
                            />
                        </div>
                        <div>
                            <label htmlFor="category-photo">Photo:</label>
                            <input
                            type="text"
                            name="photo_url"
                            id="category-photo"
                            onChange={this.handleChange}
                            value={this.state.newCategory.photo_url}
                            />
                        </div>
                    </form>
            </div>
        )
    }
}

