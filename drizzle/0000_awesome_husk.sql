CREATE TABLE IF NOT EXISTS "portfolio" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"content" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
