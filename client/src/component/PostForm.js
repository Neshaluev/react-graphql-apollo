import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'

import {useForm} from '../utils/hooks'
import {FETCH_POST_QUERY} from '../utils/graphql'

function PostForm() {

    const {values, onChange, onSubmit} = useForm(createPostCallback, {
        body: ''
    })

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            console.log(result)
            const data = proxy.readQuery({
                query: FETCH_POST_QUERY
            })
            data.getPosts = [result.data.createPost, ...data.getPosts]
            proxy.writeQuery({query: FETCH_POST_QUERY, data})
            values.body = ''
        }
    })

    function createPostCallback() {
        console.log('СОздать пост')
        createPost();
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create a posts:</h2>
                <Form.Field>
                    <Form.Input 
                        placeholder="Hi world"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Button type="submit" color="teal">Submit</Button>
                </Form.Field>
            </Form>
            { error && (
                <div className="ui error message" style={{ marginBottom: 20 }}>
                    <ul className="list" >
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )}
        </>
    )
}

const CREATE_POST_MUTATION =  gql`
mutation createPost($body: String!){
    createPost(body: $body){
        id
        body
        createdAt
        username
        likes{
            id
            username
            createdAt
        }
        likeCount
        comments{
            id
            body
            username
            createdAt
        }
        commentCount
    }
}
`

export default  PostForm;
