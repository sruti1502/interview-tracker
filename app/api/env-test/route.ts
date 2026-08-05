export async function GET() {
  return Response.json({
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    hasGithubId: !!process.env.GITHUB_ID,
    hasGithubSecret: !!process.env.GITHUB_SECRET,
  });
}