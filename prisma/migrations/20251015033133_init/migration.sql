-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" VARCHAR(30) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
