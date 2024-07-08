'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { auth } from './../auth'

import { db } from './../db'
import paths from './../paths'

const createCommentSchema = z.object({
	content: z.string().min(10)
})
export async function createComment(postId, slug, formState, formData) {
	const result = createCommentSchema.safeParse({
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
				_form: ['You must be signed in to do this.']
			}
		}
	}

	console.log(slug)

	const topic = await db.topic.findFirst({
		where: { slug: slug }
	})

	if (!topic) {
		return {
			errors: {
				_form: ['Cannot find topic']
			}
		}
	}

	try {
		let comment = await db.comment.create({
			data: {
				content: result.data.content,
				userId: session.user.id,
				// parentId: topic.id,
				postId: postId
			}
		})

		console.log(comment)
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
					_form: ['Something went wrong']
				}
			}
		}
	}
	// TODO: revalidate post show page

	revalidatePath(paths.postShow(slug, postId))
	redirect(paths.postShow(slug, postId))
}
