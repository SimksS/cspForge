
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Button as MovingButton } from '@/components/ui/moving-border';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { ShieldCheck, BrainCircuit, Wrench } from 'lucide-react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { Badge } from '@/components/ui/badge';
import { Spotlight } from '@/components/ui/spotlight-new';
import { getUserLocale } from '@/services/locale';




export async function generateMetadata() {
    const locale = await getUserLocale();
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function LandingPage() {
  const t = useTranslations('HomePage');

  return (
    <main className="flex-1">
      <section>
         <div className="h-[40rem] lg:h-[55rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
          <Spotlight />
          <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-36 md:pt-0">
            <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent leading-normal bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
              {t('title')}
            </h1>
            <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
              {t('subtitle')}
            </p>
            <div className='container mx-auto mt-12 px-4 md:px-6 flex items-center justify-center my-8'>
              <MovingButton>
                <Link href="/generate" className='font-bold'>{t('getStarted')}</Link>
              </MovingButton>

            </div>
          </div>
        </div>
      </section>
      <section className="w-full lg:max-w-screen-xl mx-auto">
          <div className="flex flex-col justify-center space-y-4 my-16 max-lg:px-4">
                <div className="space-y-2">
                  <p className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none font-headline text-center xl:leading-normal">
                    {t('subtitle')}
                  </p>
                </div>
              </div>
        <ContainerScroll
          titleComponent={
            <>
            
            </>
          }
        >
          <Image
            src={t('image')}
            alt="Hero"
            data-ai-hint="security shield"
            width={937}
            height={527}
            className="mx-auto overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
          />
        </ContainerScroll>

      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center gap-4">
            <div className="space-y-2">
              <Badge variant={'outline'} className='bg-secondary text-secondary-foreground p-2 mb-8'>

                {t('features.tag')}
              </Badge>

              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline mb-8">
                {t('features.title')}
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-12">
                {t('features.description')}
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-4xl items-start gap-8 sm:grid-cols-2 md:gap-12  mt-12">
            <Card className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t('feature1.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('feature1.description')}
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t('feature2.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('feature2.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className='container mx-auto mt-12 px-4 md:px-6 flex items-center justify-center my-8'>
          <MovingButton>
            <Link href="/generate" className='font-bold'>{t('getStarted')}</Link>
          </MovingButton>

        </div>
      </section>
    </main>

  );
}
