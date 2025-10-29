ALTER TABLE "userItems" ALTER COLUMN "genres" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "userItems" ALTER COLUMN "genres" SET DEFAULT 'все'::text;--> statement-breakpoint
DROP TYPE "public"."genres";--> statement-breakpoint
CREATE TYPE "public"."genres" AS ENUM('все', 'мультфильм', 'боевик', 'детектив', 'драма', 'мьюзикл', 'семейный', 'триллер', 'ужасы', 'фантастика', 'фэнтези');--> statement-breakpoint
ALTER TABLE "userItems" ALTER COLUMN "genres" SET DEFAULT 'все'::"public"."genres";--> statement-breakpoint
ALTER TABLE "userItems" ALTER COLUMN "genres" SET DATA TYPE "public"."genres" USING "genres"::"public"."genres";