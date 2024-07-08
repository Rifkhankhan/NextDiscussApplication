'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@nextui-org/react'

export default function FormButton({ children }) {
	const { pending } = useFormStatus()

	return (
		<Button type="submit" isLoading={pending}>
			{children}
		</Button>
	)
}
