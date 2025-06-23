
"use client";

import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import {
  Copy,
  Plus,
  X
} from "lucide-react";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cspDirectives, presetUrls,presets } from "@/lib/constants";
import { toast } from "sonner"



export function CspGenerator() {
    const t = useTranslations('CspForge');
  const [preset, setPreset] = useState("Strict");
  const [urls, setUrls] = useState<string[]>(presetUrls.Strict);
  const [newUrl, setNewUrl] = useState("");
  const [directiveStates, setDirectiveStates] = useState<Record<string, boolean>>(presets.Strict);
  const [generatedCsp, setGeneratedCsp] = useState("");

  useEffect(() => {
    setDirectiveStates(presets[preset]);
    setUrls(presetUrls[preset]);
  }, [preset]);

  useEffect(() => {
    const policyParts = Object.entries(directiveStates)
      .filter(([, isEnabled]) => isEnabled)
      .map(([directive]) => {
        let sources = [...urls];
        if (preset === 'Strict') {
          if (directive === 'object-src' || directive === 'base-uri' || directive === 'frame-ancestors') sources = ["'none'"];
          if (directive === 'script-src') sources = ["'self'", "'unsafe-inline'"]; // common strict setup
          if (directive === 'style-src') sources = ["'self'", "'unsafe-inline'"];
        }
        if (preset === 'Permissive') {
           sources = ['*'];
        }
        if (sources.length === 0) return `${directive} 'none';`;
        return `${directive} ${[...new Set(sources)].join(" ")};`;
      });
    setGeneratedCsp(policyParts.join("\n"));
  }, [directiveStates, urls, preset]);

  const handleAddUrl = () => {
    if (newUrl && !urls.includes(newUrl)) {
      setUrls([...urls, newUrl]);
      setNewUrl("");
    }
  };

  const handleRemoveUrl = (urlToRemove: string) => {
    setUrls(urls.filter((url) => url !== urlToRemove));
  };
  
  const handleCopy = () => {
 
    navigator.clipboard.writeText(generatedCsp)
      .then(() =>    toast("Copied to clipboard!", {
      description: "CSP has been copied successfully.",
    }))
      .catch(() => toast.error("Copy failed", {description: "Could not copy CSP to clipboard."} ));
  };

 

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>{t("step1.title")}</CardTitle>
            <CardDescription>{t("step1.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={preset} onValueChange={setPreset}>
              <TabsList className="grid w-full lg:grid-cols-3">
                <TabsTrigger value="Strict"  className="flex flex-col items-center">
                  {t("strict.label")}
                  <span className="text-xs  block  whitespace-break-spaces">{t("strict.description")}</span>
                </TabsTrigger>
                <TabsTrigger value="Balanced" className="flex flex-col items-center">
                  {t("balanced.label")}
                  <span className="text-xs  block  whitespace-break-spaces">{t("balanced.description")}</span>
                </TabsTrigger>
                <TabsTrigger value="Permissive" className="flex flex-col items-center">
                  {t("permissive.label")}
                  <span className="text-xs  block whitespace-break-spaces">{t("permissive.description")}</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>{t("step2.title")}</CardTitle>
            <CardDescription>{t("step2.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="e.g., https://example.com"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddUrl()}
              />
              <Button onClick={handleAddUrl}><Plus className="mr-2 h-4 w-4" /> {t('add')}</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {urls.map((url) => (
                <div key={url} className="flex items-center gap-1 bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
                  <span>{url}</span>
                  <button onClick={() => handleRemoveUrl(url)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>{t("step3.title")}</CardTitle>
            <CardDescription>{t("step3.description")}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cspDirectives.map((d) => (
              <div key={d.id} className="flex items-start space-x-4">
                <d.icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <Label htmlFor={d.id} className="font-semibold cursor-pointer">{t(`${d.id}.label`)}</Label>
                    <Switch
                      id={d.id}
                      checked={directiveStates[d.id] || false}
                      onCheckedChange={(checked) => setDirectiveStates({ ...directiveStates, [d.id]: checked })}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{t.rich(`${d.id}.description`, {
                    code: (chunks) => <code className="text-xs bg-muted px-1 rounded">{chunks}</code>
                  })}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1 space-y-8">
        <Card className="sticky top-8 shadow-md">
          <CardHeader>
            <CardTitle>{t("generated.title")}</CardTitle>
            <CardDescription>{t("generated.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Textarea
                readOnly
                value={generatedCsp}
                className="h-96 font-code text-sm bg-gray-50 dark:bg-gray-800 resize-none"
                aria-label="Generated Content Security Policy"
              />
              <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
           
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
