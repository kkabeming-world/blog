/**
 * Astro `base` (예: GitHub Pages 서브패스)를 붙인 내부 URL.
 * `import.meta.env.BASE_URL`은 보통 끝에 `/`가 있다.
 * @param path `archive`, `archive/foo/`, `/world/bar/` 등 선행 슬래시는 있어도 없어도 됨
 */
export function withBase(path: string): string {
	const base = import.meta.env.BASE_URL;
	const p = path.replace(/^\/+/, '');
	return p ? `${base}${p}` : base;
}
