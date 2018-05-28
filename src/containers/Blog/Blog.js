import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: []
    };

    async componentDidMount() {
        const posts = await this.fetchPosts();
        this.setState({ posts });
    }

    async fetchPosts() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return response.data;
    }

    render () {
        const posts = this.state.posts.map(post => {
            return <Post key={post.id} title={post.title} />;
        });
        
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;