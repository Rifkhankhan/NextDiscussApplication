import PostCreateForm from './../../../components/posts/post-create-form'
import TopicList from './../../../components/posts/post-list'
import { fetchPostsByTopicSlug } from './../../../db/queries/posts'

export default function TopicShowPage({ params }) {
	const { slug } = params

	return (
		<div className="grid grid-cols-4 gap-4 p-4">
			<div className="col-span-3">
				<h1 className="text-2xl font-bold mb-2">{slug}</h1>

				<TopicList fetchData={() => fetchPostsByTopicSlug(slug)} />
			</div>

			<div>
				<PostCreateForm slug={slug} />
			</div>
		</div>
	)
}
