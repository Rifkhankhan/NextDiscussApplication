import { notFound } from 'next/navigation'
import { db } from './../../db'

export default async function PostShow({ postId }) {
	const post = await db.post.findFirst({
		where: {
			id: postId
		}
	})

	if (!post) {
		notFound()
	}

	return (
		<div className="m-4">
			<h1 className="text-2xl font-bold my-2">{post.title}</h1>
			<p className="p-4 border rounded">{post.content}</p>
		</div>
	)
}
