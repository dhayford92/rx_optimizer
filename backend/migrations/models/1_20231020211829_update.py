from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "sales_item" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "total" REAL NOT NULL  DEFAULT 0,
    "quantity" INT NOT NULL,
    "med_id" INT NOT NULL REFERENCES "meds" ("id") ON DELETE CASCADE
);
        CREATE TABLE IF NOT EXISTS "sales" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "order_id" VARCHAR(200) NOT NULL UNIQUE,
    "status" VARCHAR(10) NOT NULL  DEFAULT 'Pending' /* Pending: Pending\nProcessing: Processing\nCompleted: Completed */,
    "customer_name" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP NOT NULL  DEFAULT CURRENT_TIMESTAMP
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP TABLE IF EXISTS "sales_item";
        DROP TABLE IF EXISTS "sales";"""
