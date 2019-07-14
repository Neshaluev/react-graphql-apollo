import React, {useContext} from 'react'
import {useQuery} from '@apollo/react-hooks'
import { Grid, Transition } from 'semantic-ui-react'

import {AuthContext} from '../context/auth'
import {FETCH_POST_QUERY} from '../utils/graphql'


import PostCard from '../component/PostCard';
import PostForm from '../component/PostForm';

function Home() {
    const {user} = useContext(AuthContext);

    const {loading, data: {getPosts: posts} } = useQuery(FETCH_POST_QUERY);
    if(posts) {
        console.log(posts)
    }
    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}

                {loading ? (
                    <h1>Loading posts...</h1>
                ) : (
                    <Transition.Group>
                    {
                        posts && posts.map(post => (
                            
                                <Grid.Column key={post.id} style={{marginBottom: 20}}>
                                    <PostCard post={post}/>
                                </Grid.Column>
                            
                        ))
                    } 
                    </Transition.Group>   
                )}
            </Grid.Row>
        </Grid>
    )
}

export default Home;
