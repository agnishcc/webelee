import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { user } from "./user";
import { categories } from "./categories";
import { relations } from "drizzle-orm"

export const transaction = pgTable('transaction', {
    id: serial('id').primaryKey().notNull(),
    userId: integer('user_id').notNull().references(() => user.id),
    amount: integer('amount').notNull(),
    currency: integer('currency').notNull(),
    categoryId: integer('category_id').notNull().references(() => categories.id),
    paymentMethod: integer('payment_method'),
    createdAt: integer('createdAt').notNull(),
    updatedAt: integer('updatedAt').notNull(),
});


export type Transaction = typeof transaction.$inferSelect;
export type NewTransaction = typeof transaction.$inferInsert;


export const transactionRelation = relations(transaction, ({ one }) => {
    return {
        user: one(user, {
            fields: [transaction.userId],
            references: [user.id],
        }),
        category: one(categories, {
            fields: [transaction.categoryId],
            references: [categories.id],
        }),
    };
});