'use client'

import { useFormState } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { Textarea, Button } from '@nextui-org/react'
import FormButton from './../common/form-button'
import * as actions from './../../actions'

export default function CommentCreateForm({ postId, slug, startOpen }) {
	const [open, setOpen] = useState(startOpen)
	const ref = useRef()

	console.log(slug)
	const [formState, action] = useFormState(
		actions.createComment.bind(null, postId, slug),
		{ errors: {} }
	)

	useEffect(() => {
		if (formState.success) {
			ref.current?.reset()

			if (!startOpen) {
				setOpen(false)
			}
		}
	}, [formState, startOpen])

	console.log(formState)

	const form = (
		<form action={action} ref={ref}>
			<div className="space-y-2 px-1">
				<Textarea
					name="content"
					label="Reply"
					placeholder="Enter your comment"
					isInvalid={!!formState.errors.content}
					errorMessage={formState.errors.content?.join(', ')}
				/>

				{formState.errors._form ? (
					<div className="p-2 bg-red-200 border rounded border-red-400">
						{formState.errors._form?.join(', ')}
					</div>
				) : null}

				<FormButton>Create Comment</FormButton>
			</div>
		</form>
	)

	return (
		<div>
			<Button size="sm" variant="light" onClick={() => setOpen(!open)}>
				Reply
			</Button>
			{open && form}
		</div>
	)
}
