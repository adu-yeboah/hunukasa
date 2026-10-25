import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/* Offline-first local store. Progress is written here first and synced to
   Supabase when online (last-write-wins per lesson completion). */

export const profiles = sqliteTable("profiles", {
  id: text("id").primaryKey(), // Google subject id (offline stub: "local")
  displayName: text("display_name").notNull(),
  activeLang: text("active_lang").notNull().default("twi"),
  xp: integer("xp").notNull().default(0),
  streakDays: integer("streak_days").notNull().default(0),
  lastPracticedAt: integer("last_practiced_at"), // unix ms
  updatedAt: integer("updated_at").notNull(),
});

export const lessonCompletions = sqliteTable("lesson_completions", {
  id: text("id").primaryKey(), // `${lang}/${sectionIdx}/${unitIdx}/${lessonIdx}`
  lang: text("lang").notNull(),
  accuracy: integer("accuracy").notNull().default(100),
  xpEarned: integer("xp_earned").notNull().default(0),
  completedAt: integer("completed_at").notNull(), // unix ms
  syncedAt: integer("synced_at"), // null = pending upload
});

export type Profile = typeof profiles.$inferSelect;
export type LessonCompletion = typeof lessonCompletions.$inferSelect;
