-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido1" TEXT NOT NULL,
    "apellido2" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultimaConexion" TIMESTAMP(3),
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "rol" TEXT NOT NULL DEFAULT 'usuario',
    "carpeta" TEXT NOT NULL,
    "espacioMaximoMB" INTEGER NOT NULL DEFAULT 100,
    "archivosMaximos" INTEGER NOT NULL DEFAULT 100,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
