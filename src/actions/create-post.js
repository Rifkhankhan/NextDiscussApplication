'use server'

import { Post } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { auth } from './../auth'
import { db } from './../db'
import paths from './../paths'

const createPostSchema = z.object({
	title: z.string().min(3),
	content: z.string().min(10)
})

export async function createPost(slug, formState, formData) {
	const result = createPostSchema.safeParse({
		title: formData.get('title'),
		content: formData.get('content')
	})

	if (!result.success) {
		return {
			errors: result.error.flatten().fieldErrors
		}
	}

	const session = await auth()
	if (!session || !session.user) {
		return {
			errors: {
				_form: ['You must be signed in to do this']
			}
		}
	}

	const topic = await db.topic.findFirst({
		where: { slug }
	})

	if (!topic) {
		return {
			errors: {
				_form: ['Cannot find topic']
			}
		}
	}

	let post
	try {
		post = await db.post.create({
			data: {
				title: result.data.title,
				content: result.data.content,
				userId: session.user.id,
				topicId: topic.id
			}
		})
	} catch (err) {
		if (err instanceof Error) {
			return {
				errors: {
					_form: [err.message]
				}
			}
		} else {
			return {
				errors: {
					_form: ['Failed to create post']
				}
			}
		}
	}

	revalidatePath(paths.topicShow(slug))
	redirect(paths.postShow(slug, post.id))
}
