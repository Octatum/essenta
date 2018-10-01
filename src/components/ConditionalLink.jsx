import React from 'react'
import Link from 'gatsby-link'

function ConditionalLink({ condition, children, to }) {
  return condition ? <Link to={to}>{children}</Link> : { children }
}

export default ConditionalLink
