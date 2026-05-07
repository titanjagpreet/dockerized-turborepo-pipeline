import { prisma } from "@repo/prisma/client"

export const dynamic = "force-dynamic";

export default async function HOME() {
  const user = await prisma.user.findFirst();

return (
  <div>
    {user?.username}
    {user?.password}
  </div>
)
}