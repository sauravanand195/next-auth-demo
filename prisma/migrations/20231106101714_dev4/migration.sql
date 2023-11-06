-- DropForeignKey
ALTER TABLE `Todo` DROP FOREIGN KEY `Todo_authorId_fkey`;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
