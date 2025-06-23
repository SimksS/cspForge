import { readFile } from 'fs/promises';
import { join } from 'path';
import { notFound } from 'next/navigation';
import { getUserLocale } from '@/services/locale';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import Callout from '@/components/Callout';
import Link from 'next/link';
import Section from '@/components/Section';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
    const { slug } = await params; 
    const locale = await getUserLocale();

  const filePath = join(process.cwd(), 'content', 'articles', `${slug}.${locale}.mdx`);

  try {
    const rawContent = await readFile(filePath, 'utf-8');
    const { content, data } = matter(rawContent);
    const mdxSource = await compileMDX({
        source: content,
         components: {
             Callout,
             Link,
             Section
        },
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
      <article className="prose prose-code:before:hidden prose-code:after:hidden dark:prose-invert max-w-screen-lg mx-auto py-8">
        <h1>{data.title}</h1>
       {mdxSource.content}
      </article>
    );
  } catch (e) {
    notFound();
  }
}
