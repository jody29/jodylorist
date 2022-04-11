const express = require('express')
const router = express.Router()
const graphql = require('@octokit/graphql').graphql
const graphqlAuth = graphql.defaults({
    headers: { authorization: 'token ' + process.env.GITHUB_API_KEY}
})



router.get('/', (req, res) => {
    graphqlAuth(`{
        user(login: "jody29") {
            avatarUrl
            name
            starredRepositories(first: 10, orderBy: {field: STARRED_AT, direction: DESC}) {
                edges {
                  node {
                    name
                    url
                    homepageUrl
                  }
                }
            }
        }
    }`).then(data => {
        res.render('pages/index', {
            picture: data.user.avatarUrl,
            projects: data.user.starredRepositories.edges,
            name: data.user.name
        })
    })
})

module.exports = router