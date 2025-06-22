import { readFile } from 'fs/promises';
import { join } from 'path';
import { notFound } from 'next/navigation';
import { getUserLocale } from '@/services/locale';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
    const { slug } = params; 
    const locale = await getUserLocale();

  const filePath = join(process.cwd(), 'content', 'articles', `${slug}.${locale}.mdx`);

  try {
    const rawContent = await readFile(filePath, 'utf-8');
    const { content, data } = matter(rawContent);
    const mdxSource = await compileMDX({
      source: content,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [rehypePrettyCode, { theme: 'github-dark' }]
          ],
        },
      }
    });
    return (
      <article className="prose dark:prose-invert max-w-3xl mx-auto py-8">
        <h1>{data.title}</h1>
       {mdxSource.content}
      </article>
    );
  } catch (e) {
    notFound();
  }
}
