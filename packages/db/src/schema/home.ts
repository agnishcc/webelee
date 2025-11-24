import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";
import { categories } from "./categories";

export const home = pgTable('home', {
    id: serial('id').primaryKey().notNull(),
    title: text('title').notNull(),
    createdAt: timestamp('createdAt', { precision: 3, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).defaultNow().notNull().$onUpdateFn(() => new Date().toISOString()),
});

export type Home = typeof home.$inferSelect;
export type NewHome = typeof home.$inferInsert;

export const homeRelation = relations(home, ({ many }) => {
    return {
        users: many(user),
        categories: many(categories),
        userHomeBridges: many(userHomeBridge),
    };
});

export const userHomeBridge = pgTable('user_home_bridge', {
    id: serial('id').primaryKey().notNull(),
    userId: integer('user_id').notNull().references(() => user.id),
    homeId: integer('home_id').notNull().references(() => home.id),
});

export type UserHomeBridge = typeof userHomeBridge.$inferSelect;
export type NewUserHomeBridge = typeof userHomeBridge.$inferInsert;

export const userHomeBridgeRelation = relations(userHomeBridge, ({ one }) => {
    return {
        user: one(user, {
            fields: [userHomeBridge.userId],
            references: [user.id],
        }),
        home: one(home, {
            fields: [userHomeBridge.homeId],
            references: [home.id],
        }),
    };
});