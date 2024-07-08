const paths = {
	home() {
		return '/'
	},
	topicShow(topicSlug) {
		return `/topics/${topicSlug}`
	},
	postCreate(topicSlug) {
		return `/topics/${topicSlug}/posts/new`
	},
	postShow(topicSlug, postId) {
		return `/topics/${topicSlug}/posts/${postId}`
	}
}

export default paths
