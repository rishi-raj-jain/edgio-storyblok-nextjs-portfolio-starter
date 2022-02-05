import React from 'react'

function flatten(text, child) {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text)
}

export function HeadingRenderer(props) {
  var children = React.Children.toArray(props.children)
  var text = children.reduce(flatten, '')
  var slug = text.toLowerCase().replace(/\W/g, '-')
  return React.createElement(
    'h' + props.level,
    {
      id: slug,
      href: `#${slug}`,
      onMouseOver: function (e) {
        // Change style cursor to pointer on hover
        e.target.style.cursor = 'pointer'
        // Remove underline on hover in
        e.target.style.textDecoration = 'underline'
      },
      onMouseOut: function (e) {
        // Remove underline on hover out
        e.target.style.textDecoration = 'none'
      },
      onClick: function () {
        // Push to the same element
        window.location.href = `${window.location.origin}${window.location.pathname}#${slug}`
      },
    },
    props.children
  )
}
