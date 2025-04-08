import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { imageUrlFor } from "../lib/image-url";
import { buildImageObj } from "../lib/helpers";
import favicon from '../images/favicon.ico'

export const SEO = ({ title, description, pathname, children }) => {
  const { title: defaultTitle, description: defaultDescription, logo } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    logo: imageUrlFor(buildImageObj(logo))
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.logo} />
      <link rel="icon" type="image/x-icon" href={favicon}/>
      {children}
    </>
  )
}