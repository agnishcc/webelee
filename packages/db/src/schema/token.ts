
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, serial, integer } from 'drizzle-orm/pg-core';
import { transaction } from './transaction';
import { home, userHomeBridge } from './home';

export const TokenType = ['MAGIC_LINK', 'VERIFY', 'REFRESH'] as const;
export const user = pgTable('user', {
    id: serial('id').primaryKey().notNull(),
    type: text('type', { enum: TokenType }).notNull(),
    name: text('name').notNull(),
    profilePictureUrl: text('profile_picture_url'),
    createdAt: timestamp('createdAt', { precision: 3, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' })
        .notNull()
        .defaultNow()
        .$onUpdateFn(() => new Date().toISOString()),
});


export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export const userRelation = relations(user, ({ many }) => {
    return {
        transactions: many(transaction),
        homes: many(home),
        userHomeBridges: many(userHomeBridge),
    };
});