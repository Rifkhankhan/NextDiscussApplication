import Link from 'next/link'
import paths from '../../../../../paths'
import PostShow from './../../../../../components/posts/post-show'
import CommentCreateForm from './../../../../../components/comments/comment-create-form'
import CommentsList from './../../../../../components/comments/comment-list'
import { fetchCommentsByPostId } from './../../../../../db/queries/comments'

export default function PostShowPage({ params }) {
	const { slug, postId } = params

	return (
		<div className="space-y-3">
			<Link
				className="underline decoration-solid "
				href={paths.topicShow(slug)}>
				Back to {slug}
			</Link>

			<PostShow postId={postId} />

			<CommentCreateForm postId={postId} slug={slug} startOpen />

			<CommentsList fetchData={() => fetchCommentsByPostId(postId)} />
		</div>
	)
}
