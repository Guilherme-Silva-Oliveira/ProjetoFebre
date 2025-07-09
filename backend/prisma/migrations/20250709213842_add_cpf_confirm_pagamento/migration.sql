/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `confirmPagamento` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `cpf` VARCHAR(191) NOT NULL DEFAULT '000.000.000-00';

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_cpf_key` ON `Usuario`(`cpf`);

-- Exemplo: para 3 usuários existentes
UPDATE Usuario SET cpf = '000.000.000-01' WHERE id = 1;
UPDATE Usuario SET cpf = '000.000.000-02' WHERE id = 2;
UPDATE Usuario SET cpf = '000.000.000-03' WHERE id = 3;
UPDATE Usuario SET cpf = '000.000.000-04' WHERE id = 4;
UPDATE Usuario SET cpf = '000.000.000-05' WHERE id = 5;
UPDATE Usuario SET cpf = '000.000.000-06' WHERE id = 6;
UPDATE Usuario SET cpf = '000.000.000-07' WHERE id = 7;
UPDATE Usuario SET cpf = '000.000.000-08' WHERE id = 8;
-- e assim por diante...

