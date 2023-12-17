-- CreateTable
CREATE TABLE "Users" (
    "id" CHAR(36) NOT NULL,
    "login_id" VARCHAR(255) NOT NULL,
    "password" CHAR(60) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Characters" (
    "id" SERIAL NOT NULL,
    "name" CHAR(10) NOT NULL,
    "model_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharactersUsers" (
    "user_id" CHAR(36) NOT NULL,
    "character_id" SMALLINT NOT NULL,
    "nostalgicLevel" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CharactersUsers_pkey" PRIMARY KEY ("user_id","character_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_login_id_key" ON "Users"("login_id");

-- AddForeignKey
ALTER TABLE "CharactersUsers" ADD CONSTRAINT "CharactersUsers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharactersUsers" ADD CONSTRAINT "CharactersUsers_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "Characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
