import { db } from './../../db'

export const fetchPostsByTopicSlug = slug => {
	return db.post.findMany({
		where: { topic: { slug } },
		include: {
			topic: { select: { slug: true } },
			user: { select: { name: true } },
			_count: { select: { comments: true } }
		}
	})
}
