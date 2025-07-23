-- AlterTable
ALTER TABLE `Jogo` ADD COLUMN `campeonato` VARCHAR(191) NULL,
    ADD COLUMN `jaPassou` BOOLEAN NOT NULL DEFAULT false;
