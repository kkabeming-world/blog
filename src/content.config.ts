import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const baseSchema = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	draft: z.boolean().default(false),
	tags: z.array(z.string()).default([]),
	category: z.string().optional(),
});

const archive = defineCollection({
	loader: glob({ base: './src/content/archive', pattern: '**/*.{md,mdx}' }),
	schema: baseSchema,
});

const world = defineCollection({
	loader: glob({ base: './src/content/world', pattern: '**/*.{md,mdx}' }),
	schema: baseSchema.extend({
		section: z.string().optional(),
	}),
});

const notes = defineCollection({
	loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
	schema: baseSchema.extend({
		project: z.string().optional(),
		status: z.enum(['idea', 'active', 'paused', 'done']).optional(),
	}),
});

export const collections = { archive, world, notes };
