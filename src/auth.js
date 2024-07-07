import NextAuth from 'next-auth'
import Github from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/db'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITGUB_CLIENT_SECRET = process.env.GITGUB_CLEINT_SECRET

if (!GITHUB_CLIENT_ID || !GITGUB_CLIENT_SECRET) {
	throw new Error('Missgin github oauth credentials')
}

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut
} = NextAuth({
	adapter: PrismaAdapter(db),
	providers: [
		Github({
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITGUB_CLIENT_SECRET
		})
	],
	callbacks: {
		// usually not needed, here we are fixing a bug in nextauth
		async session({ session }) {
			if (session && user) {
				session.user.id = user.id
			}

			return session
		}
	}
})
