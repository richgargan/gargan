const postTemplate = path.resolve("./src/templates/post.js")

exports.createPages = ({graphql, boundActionCreators}) => {
    const {createPage} = boundActionCreators
    return new Promise((resolve, reject) => {
        resolve(
            graphql(
                `
          {
            posts: allMarkdownRemark() {
              edges {
                node {
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
            ).then(result => {
                const posts = result.data.posts.edges
                posts.forEach(post => {
                    createPage({
                        path: post.node.fields.slug,
                        component: blogPostTemplate,
                        context: {
                            slug: post.node.fields.slug,
                        },
                    })
                })
            })
        )
    })
}/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
