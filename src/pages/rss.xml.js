import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const [archiveEntries, worldEntries, noteEntries] = await Promise.all([
		getCollection('archive', ({ data }) => !data.draft),
		getCollection('world', ({ data }) => !data.draft),
		getCollection('notes', ({ data }) => !data.draft),
	]);

	const items = [
		...archiveEntries.map((entry) => ({ ...entry.data, link: `/archive/${entry.id}/` })),
		...worldEntries.map((entry) => ({ ...entry.data, link: `/world/${entry.id}/` })),
		...noteEntries.map((entry) => ({ ...entry.data, link: `/notes/${entry.id}/` })),
	].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
	});
}
