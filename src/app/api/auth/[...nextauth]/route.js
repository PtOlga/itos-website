import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

const providers = [
  CredentialsProvider({
    name: 'credentials',
    credentials: {
      username: { label: 'Username', type: 'text' },
      password: { label: 'Password', type: 'password' },
    },
    authorize: async (credentials) => {
      // Add your own authentication logic here
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        // Return user object if credentials are valid
        return Promise.resolve({ id: 1, name: 'Admin', email: 'admin@example.com' });
      } else {
        // Return null if credentials are invalid
        return Promise.resolve(null);
      }
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.unshift(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.unshift(
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  );
}

const handler = NextAuth({
  site: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  providers,
});
export { handler as GET, handler as POST };
