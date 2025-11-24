import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { transaction } from "./transaction";
import { home } from "./home";

export const categories = pgTable('categories', {
    id: serial('id').primaryKey().notNull(),
    name: text('name').notNull(),
    type: text('type', {
        enum: ['income', 'expense'],
    }).notNull(),
    home: integer('home').notNull().references(() => home.id),
    createdAt: timestamp('createdAt', { precision: 3, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' })
        .notNull()
        .defaultNow()
        .$onUpdateFn(() => new Date().toISOString()),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export const categoryRelation = relations(categories, ({ many, one }) => {
    return {
        transactions: many(transaction),
        home: one(home),
    };
});