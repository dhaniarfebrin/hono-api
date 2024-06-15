import { Context } from "hono";

import prisma from "../../prisma/client";

export const getPosts = async (c: Context) => {
    try {
        const posts = await prisma.post.findMany({ orderBy: { id: 'desc' } })
        
        return c.json({
            success: true,
            message: "List Data Posts!",
            data: posts
        }, 200)
    } catch (err) {
        console.error('error getting posts', err);   
    }
}