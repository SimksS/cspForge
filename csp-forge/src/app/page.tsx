
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {useTranslations} from 'next-intl';
import { ShieldCheck, BrainCircuit, Wrench } from 'lucide-react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

export default function LandingPage() {
  const t = useTranslations('HomePage');

  return (
    <main className="flex-1">
      <section className="w-full lg:max-w-screen-xl mx-auto">
         
        <ContainerScroll
          titleComponent={
            <>
             <div className="flex flex-col gap-2 min-[400px]:flex-row items-center justify-center py-10">
                  <Button asChild size="lg">
                    <Link href="/generator">
                      {t('getStarted')}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/how-to-use">
                      {t('learnMore')}
                    </Link>
                  </Button>
                </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  {t('title')}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {t('subtitle')}
                </p>
              </div>
            </div>
            </>
          }
        >
          <Image
            src="https://placehold.co/600x400.png"
            alt="Hero"
            data-ai-hint="security shield"
            width={600}
            height={400}
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
          />
        </ContainerScroll>
         
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                {t('features.tag')}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                {t('features.title')}
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('features.description')}
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
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
      </section>
    </main>

  );
}
