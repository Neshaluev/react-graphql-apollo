import React, {useContext} from 'react'
import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import { Grid, Image, Card, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';

import LikeButton from '../component/LikeButton';
import {AuthContext} from '../context/auth';
import DeleteButton from '../component/DeleteButton';

function SinglePost(props) {
    const postId = props.match.params.postId;

    const {user} = useContext(AuthContext);
    const {data: { getPost }} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    function deletePostCallback() {
        props.history.push('/')
    }

    let postMarkup;

    if(!getPost) {
        postMarkup = <p>Loading post...</p>
    } else {
        const {id, body, createdAt, username, comments, likes, likeCount, commentCount} = getPost;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' size="small" fload="right"/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{id,likeCount, likes}}/>
                                <Button 
                                    as="div"
                                    labelPosition="right"
                                    onClick={() => console.log('comment')}
                                >
                                    <Button basic color="blue">
                                        <Icon name="comments" />
                                    </Button>
                                    <Label basic color="blue" pointing="left">{commentCount}</Label>
                                </Button>
                                {user && user.username === username && (
                                    <DeleteButton postId={postId} callback={deletePostCallback}/>
                                )}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )

        return postMarkup
    }
    return (
        <div>
            mda
        </div>
    )

}
const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id
            body
            createdAt
            username
            likeCount
            likes{
                id
                username
            }
            commentCount
            comments{
                id
                username
                createdAt
                body
            }
        }
    }
`
export default SinglePost;