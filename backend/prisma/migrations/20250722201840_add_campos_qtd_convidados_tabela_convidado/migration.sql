-- AlterTable
ALTER TABLE `Presenca` ADD COLUMN `qtdConvidados` INTEGER NULL;

-- CreateTable
CREATE TABLE `Convidado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `presencaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Convidado` ADD CONSTRAINT `Convidado_presencaId_fkey` FOREIGN KEY (`presencaId`) REFERENCES `Presenca`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
