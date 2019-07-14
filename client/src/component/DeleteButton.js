import React, {useState} from 'react'
import { Button, Icon,  Confirm } from 'semantic-ui-react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import {FETCH_POST_QUERY} from '../utils/graphql'

 function DeleteButton({postId, callback }) {
    const [confirmOpen,setConfirmOpen] = useState(false)

     const [deletePost] = useMutation(DELETE_POST_MUTATION, {
         update(proxy, result){
            setConfirmOpen(false)
            const data = proxy.readQuery({
                query: FETCH_POST_QUERY
            })
            data.getPosts = data.getPosts.filter(p => p.id !== postId);
            proxy.writeQuery({ query: FETCH_POST_QUERY, })
            if(callback()) callback()
         },
         variables: {
             postId
         }
     })
    return (
        <>
            <Button 
            as="div" 
            color="red" 
            floated="right"
            onClick={() => setConfirmOpen(true)}>
            <Icon name="trash" style={{margin: 0}} />
            </Button>
            <Confirm 
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={deletePost}
            />
        </>
    )
}
const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

export default DeleteButton;
