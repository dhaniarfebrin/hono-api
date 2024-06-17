import { Hono } from "hono";

import { getPosts, createPosts, getPostById, updatePost } from "../controllers/PostController";

const router = new Hono() // initialize Router

router.get('/', (c) => getPosts(c))
router.post('/', (c) => createPosts(c))
router.get('/:id', (c) => getPostById(c))
router.patch('/:id', (c) => updatePost(c))

export const Routes = router