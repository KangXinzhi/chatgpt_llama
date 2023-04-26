import { useContext } from 'react'

import { ContentContext, Context } from './ContentProvider'

export default (): Context => useContext(ContentContext)
