import { Hono } from "hono";

import { getPosts, createPosts } from "../controllers/PostController";

const router = new Hono()

router.get('/', (c) => getPosts(c))
router.post('/', (c) => createPosts(c))

export const Routes = router