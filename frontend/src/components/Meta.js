import React from 'react'
import { Helmet } from 'react-helmet'

function Meta({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'welcome to Gshop',
  description: 'we sell best products at best quality',
  keywords: 'electroincs',
}

export default Meta
