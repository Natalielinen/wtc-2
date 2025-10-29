CREATE TABLE "userItems" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"genre" text NOT NULL,
	"imageUrl" text NOT NULL,
	"lastVisited" timestamp DEFAULT now() NOT NULL,
	"sourceLink" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "userItems" ADD CONSTRAINT "userItems_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;