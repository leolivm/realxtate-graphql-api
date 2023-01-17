-- AlterTable
ALTER TABLE "rents" ADD COLUMN     "cost" INTEGER,
ALTER COLUMN "monthly_cost" DROP NOT NULL;
