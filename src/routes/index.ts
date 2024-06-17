import { Hono } from "hono";

import { getPosts, createPosts, getPostById, updatePost, deletePost } from "../controllers/PostController";

const router = new Hono() // initialize Router

router.get('/', (c) => getPosts(c))
router.post('/', (c) => createPosts(c))
router.get('/:id', (c) => getPostById(c))
router.patch('/:id', (c) => updatePost(c))
router.delete('/:id', (c) => deletePost(c))

export const Routes = router