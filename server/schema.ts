import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }).notNull(),
    content: text("content").notNull(),
});