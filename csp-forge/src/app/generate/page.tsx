


import { CspGenerator } from "@/sections/CSPGenerator";
import { getUserLocale } from "@/services/locale";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const locale = await getUserLocale();
  const t = await getTranslations({ locale, namespace: 'CSPGenerate' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function Generate() {


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
       <CspGenerator/>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
       
      </footer>
    </div>
  );
}
