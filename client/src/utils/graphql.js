import gql from 'graphql-tag'

export const FETCH_POST_QUERY = gql`
{
  getPosts{
    id
    body
    createdAt
    username
    comments{
      id
      username
    }
    likeCount
    likes{
        username
    }
    commentCount
    comments{
        id
        username
    }
  }
}
`