import * as React from "react"
import { Link, graphql } from "gatsby"
//TODO: #1 Replace with `import * as openpgp from 'openpgp/lightweight';` 
import * as openpgp from "openpgp";

import { useState, useEffect } from 'react';

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ArticleBody = ({ html }) => {

  (async () => {
    const publicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
EQp2e7Gv0+JyTdcFydwi/GF7tg==
=H7Ha
-----END PGP PUBLIC KEY BLOCK-----    
    `

    const privateKeyArmored = `-----BEGIN PGP PRIVATE KEY BLOCK-----

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
=asud
-----END PGP PRIVATE KEY BLOCK-----
    `

    const passphrase = `password`;

    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

    console.log(publicKey)

    const privateKey = await openpgp.decryptKey({
      privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
      passphrase
    });

    console.log(privateKey)
    const encrypted = await openpgp.encrypt({
      message: await openpgp.createMessage({ text: 'Hello, Robin!' }), // input as Message object
      encryptionKeys: publicKey,
      signingKeys: privateKey // optional
    });

    console.log(encrypted); // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'

    const message = await openpgp.readMessage({
      armoredMessage: encrypted // parse armored message
    });

    const { data: decrypted, signatures } = await openpgp.decrypt({
      message,
      verificationKeys: publicKey, // optional
      decryptionKeys: privateKey
    });

    console.log(decrypted); // 'Hello, World!'

  })();

  console.log("hellpo")

  return (<section
    dangerouslySetInnerHTML={{ __html: html }}
    itemProp="articleBody"
  />)
}

const ArticleContent = ({ post }) => {
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
                ??? {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} ???
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
