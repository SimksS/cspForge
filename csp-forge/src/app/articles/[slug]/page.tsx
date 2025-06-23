import { readFile } from 'fs/promises';
import { Metadata } from 'next';
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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const locale = await getUserLocale();
  const filePath = join(process.cwd(), 'content', 'articles', `${params.slug}.${locale}.mdx`);

  try {
    const raw = await readFile(filePath, 'utf-8');
    const { data } = matter(raw);

    return {
      title: `${data.title} - CSP Forge` || 'Artigo - CSP Forge',
      description: data.description || 'Conteúdo sobre segurança web e políticas de CSP.'
    };
  } catch {
    return {
      title: 'Artigo não encontrado - CSP Forge',
      description: 'Não conseguimos encontrar o conteúdo solicitado.'
    };
  }
}

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
        <main className='flex-1 min-h-screen px-4 py-28 lg:p-36 '>
                <article className="prose prose-code:before:hidden prose-code:after:hidden dark:prose-invert max-w-screen-lg mx-auto py-8">
                    <h1>{data.title}</h1>
                {mdxSource.content}
                </article>
              
        </main>
    );
  } catch (e) {
    notFound();
  }
}
