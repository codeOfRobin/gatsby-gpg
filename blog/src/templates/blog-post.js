import * as React from "react"
import { Link, graphql } from "gatsby"
//TODO: #1 Replace with `import * as openpgp from 'openpgp/lightweight';` 
import * as openpgp from "openpgp";

import { useState, useEffect } from 'react';

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ArticleBody = ({html}) => {

  (async () => {
    const message = await openpgp.createMessage({ text: 'Hello, World!' })
    const encrypted = await openpgp.encrypt({
        message, // input as Message object
        passwords: ['secret stuff'], // multiple passwords possible
        format: 'binary' // don't ASCII armor (for Uint8Array output)
    });
    console.log(encrypted); // Uint8Array

    const encryptedMessage = await openpgp.readMessage({
        binaryMessage: encrypted // parse encrypted bytes
    });
    const { data: decrypted } = await openpgp.decrypt({
        message: encryptedMessage,
        passwords: ['secret stuff'], // decrypt with password
        format: 'binary' // output as Uint8Array
    });
    console.log(decrypted); // Uint8Array([0x01, 0x01, 0x01])
  })();



  return (<section
    dangerouslySetInnerHTML={{ __html: html }}
    itemProp="articleBody"
  />)
}

const ArticleContent = ({post}) => {
  return (
    <article
      className="blog-post"
      itemScope
      itemType="http://schema.org/Article"
    >
      <header>
        <h1 itemProp="headline">{post.frontmatter.title}</h1>
        <p>{post.frontmatter.date}</p>
      </header>
      <ArticleBody html={post.html} />
      <hr />
      <footer>
        <Bio />
      </footer>
    </article>
  )
}

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <ArticleContent post={post} />
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
