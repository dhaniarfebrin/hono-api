import { Context } from "hono";

import prisma from "../../prisma/client";

export const getPosts = async (c: Context) => {
    try {
        // Fetch all posts from the database in descending order by id
        // using Prisma's `findMany` method.
        //
        // The `orderBy` option specifies the field to order by and the
        // ordering direction. Here, we order by `id` in descending order.
        //
        // The `findMany` method returns a Promise that resolves to an array
        // of posts.
        //
        // The `await` keyword is used to wait for the Promise to resolve and
        // retrieve the posts.
        const posts = await prisma.post.findMany({
            orderBy: {
                id: 'desc' // Order by id in descending order
            }
        });

        return c.json({
            success: true,
            message: "List Data Posts!",
            data: posts
        }, 200)
    } catch (err) {
        return c.json({ success: false, message: "Server error" }, 500)
    }
}

export const createPosts = async (c: Context) => {
    try {
        // Parse the request body and extract the 'title' and 'content' fields

        // `parseBody` returns a Promise that resolves to the parsed request body.
        const body = await c.req.parseBody()

        // Retrieve the 'title' field from the request body.
        // If the field is present and its value is a string, assign it to the 'title' variable.
        // Otherwise, assign an empty string to the 'title' variable.
        const title = typeof body['title'] === 'string' ? body['title'] : ''

        // Retrieve the 'content' field from the request body.
        // If the field is present and its value is a string, assign it to the 'content' variable.
        // Otherwise, assign an empty string to the 'content' variable.
        const content = typeof body['content'] === 'string' ? body['content'] : ''

        // The docstring for the `createPosts` function:
        // Create a new post in the database with the given 'title' and 'content'.
        //
        // Parameters:
        // - c: The `Context` object representing the HTTP request and response.
        //
        // Returns:
        // A Promise that resolves to the JSON response indicating the success of the post creation.
        // If successful, the response contains the created post.
        // If an error occurs, the response contains the error message.

        const post = await prisma.post.create({
            data: {
                title,
                content
            }
        })

        return c.json({
            success: true,
            message: "Post Created Successfully",
            data: post
        }, 201)
    } catch (err) {
        return c.json({ success: false, message: "Server error" }, 500)
    }
}

export const getPostById = async (c: Context) => { 
    try {
        const postId = parseInt(c.req.param('id'))

        const post = await prisma.post.findUnique({
            where: {id: postId}
        })

        if (!post) {
            return c.json({
                success: false,
                message: 'Post not found'
            }, 404)
        }

        return c.json({ success: true, message:`Detail data post by id: ${postId}`, data: post }, 200)
    } catch (err: unknown) {
        return c.json({ success: false, message: "Server Error" }, 500)
    }
}

export const updatePost = async (c: Context) => {
    try {
        const postId = parseInt(c.req.param('id'))

        const body = await c.req.parseBody()

        const title = typeof body['title'] === 'string' ? body['title'] : ''
        const content = typeof body['content'] === 'string' ? body['content'] : ''

        const post = await prisma.post.update({
            where: { id: postId },
            data: {
                title: title,
                content: content,
                updatedAt: new Date()
            }
        })

        return c.json({
            success: true,
            message: 'Post updated Successfully!',
            data: post
        }, 200)
    } catch (err) {
        return c.json({ success: false, message: "Server Error" }, 500)
    }
}