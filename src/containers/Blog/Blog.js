import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    };

    async componentDidMount() {
        const posts = await this.fetchPosts();
        posts && this.setState({ posts });
    }

    async fetchPosts() {
        try {
            const response = await axios.get('/posts');
            return response.data;
        } catch (error) {
            this.setState({ error: true });
        }
    }

    postSelectedHandler(id) {
        this.setState({selectedPostId: id});
    }

    render () {
        let posts;

        if (this.state.error) {
            posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        }

        posts = this.state.posts.map(post => {
            return (
                <Post 
                    key={post.id} 
                    title={post.title}
                    clicked={() => this.postSelectedHandler(post.id)} />
            );
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;