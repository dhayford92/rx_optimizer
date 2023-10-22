from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "sales" ADD "payment" VARCHAR(200) NOT NULL  DEFAULT 'PaymentStatus.CreditCard' /* CreditCard: CreditCard\nMobileMoney: MobileMoney\nPaypal: Paypal\nPhysical: Physical */;
        ALTER TABLE "sales" DROP COLUMN "payment_status";"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "sales" ADD "payment_status" VARCHAR(11) NOT NULL  DEFAULT 'PaymentStatus.CreditCard' /* CreditCard: CreditCard\nMobileMoney: MobileMoney\nPaypal: Paypal\nPhysical: Physical */;
        ALTER TABLE "sales" DROP COLUMN "payment";"""
