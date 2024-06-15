import { Hono } from 'hono'

import { Routes } from './routes'

const app = new Hono().basePath('/api')

app.route('/posts', Routes)

app.get('/', (c) => {
  return c.text('Hello Hono API!')
})

export default app
