import { auth } from "@clerk/nextjs/server"; // ✅ server-only
import prisma from "@/lib/prisma";
import { Button } from "../ui/button";

interface Props {
  firstValue: string;
  secondValue: string;
}

export default async function ServerSideButton({ firstValue, secondValue }: Props) {
  async function handleSubmit() {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    await prisma.rating.create({
      data: {
        value: Number(firstValue + secondValue),
        clerkId: userId,
        date: new Date(),
      },
    });
  }

  return (
    <Button onClick={handleSubmit} className="bg-indigo-500 text-white">
      Confirmar
    </Button>
  );
}