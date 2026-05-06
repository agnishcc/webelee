
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, serial, integer } from 'drizzle-orm/pg-core';
import { transaction } from './transaction';
import { home, userHomeBridge } from './home';
import { user } from '../..';

export const TokenType = ['MAGIC_LINK', 'VERIFY', 'REFRESH'] as const;
export const tokens = pgTable('tokens', {
    id: serial('id').primaryKey().notNull(),
    type: text('type', { enum: TokenType }).notNull(),
    value: text('value').notNull(),
    userId: integer('user_id').notNull().references(() => user.id),
    createdAt: timestamp('createdAt', { precision: 3, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' })
        .notNull()
        .defaultNow()
        .$onUpdateFn(() => new Date().toISOString()),
});


export type Token = typeof tokens.$inferSelect;
export type NewToken = typeof tokens.$inferInsert;

export const tokenRelation = relations(tokens, ({ one }) => {
    return {
        user: one(user, {
            fields: [tokens.userId],
            references: [user.id],
        }),
    };
});