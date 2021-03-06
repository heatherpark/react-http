import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    };

    async componentDidUpdate() {
        const { loadedPost } = this.state;
        
        if (this.props.id) {
            if (!loadedPost || (loadedPost && this.props.id !== loadedPost.id)) {
                const loadedPost = await this.fetchPost(this.props.id);
                this.setState({ loadedPost });
            }
        }
    }

    async fetchPost(id) {
        try {
            const response = await axios.get('/posts/' + id);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    deletePostHandler = (id) => {
        return axios.delete('/posts/' + id)
            .then(response => console.log(response))
            .catch(error => console.error(error));
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button 
                            onClick={() => this.deletePostHandler(this.props.id)}
                            className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }

        return post;
    }
}

export default FullPost;