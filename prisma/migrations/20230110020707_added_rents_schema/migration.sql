-- CreateTable
CREATE TABLE "rents" (
    "id" TEXT NOT NULL,
    "monthly_cost" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "square_feets" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "rent" BOOLEAN NOT NULL DEFAULT true,
    "contact" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rents" ADD CONSTRAINT "rents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
