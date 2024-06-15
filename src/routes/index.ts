import { Hono } from "hono";

import { getPosts } from "../controllers/PostController";

const router = new Hono()

router.get('/', (c) => getPosts(c))

export const Routes = router