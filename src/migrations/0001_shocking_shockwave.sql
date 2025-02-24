DROP INDEX `todos_title_unique`;--> statement-breakpoint
ALTER TABLE `todos` ADD `description` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `todos_description_unique` ON `todos` (`description`);