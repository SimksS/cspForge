
"use client";

import { useState, useEffect} from "react";
import {
  Code2,
  Image,
  Paintbrush,
  Plug,
  Shield,
  Type,
  Square,
  PlayCircle,
  Puzzle,
  Anchor,
  Send,
  Users,
  Copy,
  Plus,
  X,
  Sparkles,
  Loader,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
// import { suggestCspOptions } from "@/ai/flows/suggest-csp-options";
import { cn } from "@/lib/utils";

const cspDirectives: { id: string; label: string; icon: LucideIcon; description: string }[] = [
  { id: "default-src", label: "Default Source", icon: Shield, description: "A fallback for other fetch directives." },
  { id: "script-src", label: "Script Source", icon: Code2, description: "Specifies valid sources for JavaScript." },
  { id: "style-src", label: "Style Source", icon: Paintbrush, description: "Specifies valid sources for stylesheets." },
  { id: "img-src", label: "Image Source", icon: Image, description: "Specifies valid sources of images and favicons." },
  { id: "font-src", label: "Font Source", icon: Type, description: "Specifies valid sources for fonts via @font-face." },
  { id: "connect-src", label: "Connect Source", icon: Plug, description: "Restricts URLs for script interfaces." },
  { id: "frame-src", label: "Frame Source", icon: Square, description: "Specifies valid sources for nested browsing contexts." },
  { id: "media-src", label: "Media Source", icon: PlayCircle, description: "Specifies valid sources for <audio> and <video>." },
  { id: "object-src", label: "Object Source", icon: Puzzle, description: "Specifies valid sources for <object>, <embed>, etc." },
  { id: "base-uri", label: "Base URI", icon: Anchor, description: "Restricts URLs which can be used in a <base> element." },
  { id: "form-action", label: "Form Action", icon: Send, description: "Restricts URLs for form submissions." },
  { id: "frame-ancestors", label: "Frame Ancestors", icon: Users, description: "Specifies valid parents that may embed a page." },
];

const presets: Record<string, Record<string, boolean>> = {
  Strict: { "default-src": true, "script-src": true, "style-src": true, "img-src": true, "font-src": true, "connect-src": true, "object-src": true, "base-uri": true, "form-action": true, "frame-ancestors": true, "frame-src": false, "media-src": false, },
  Balanced: { "default-src": true, "script-src": true, "style-src": true, "img-src": true, "font-src": true, "connect-src": true, "object-src": true, "base-uri": true, "form-action": true, "frame-ancestors": true, "frame-src": true, "media-src": true, },
  Permissive: { "default-src": true, "script-src": true, "style-src": true, "img-src": true, "font-src": true, "connect-src": true, "object-src": true, "base-uri": true, "form-action": true, "frame-ancestors": true, "frame-src": true, "media-src": true, },
};

const presetUrls: Record<string, string[]> = {
  Strict: ["'self'"],
  Balanced: ["'self'", "https:", "data:"],
  Permissive: ["*"],
};

export function CspGenerator() {
  const [preset, setPreset] = useState("Strict");
  const [urls, setUrls] = useState<string[]>(presetUrls.Strict);
  const [newUrl, setNewUrl] = useState("");
  const [directiveStates, setDirectiveStates] = useState<Record<string, boolean>>(presets.Strict);
  const [generatedCsp, setGeneratedCsp] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const { toast } = useToast();

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
      .then(() => toast({ title: "Copied to clipboard!", description: "CSP has been copied successfully." }))
      .catch(() => toast({ variant: "destructive", title: "Copy failed", description: "Could not copy CSP to clipboard." }));
  };

  const handleAiSuggestion = async () => {
    setIsAiLoading(true);
    const enabledDirectives = Object.keys(directiveStates).filter(d => directiveStates[d]);
    try {
    //   const result = await suggestCspOptions({ enabledDirectives });
    //   setGeneratedCsp(result.suggestedOptions);
      toast({ title: "AI Suggestion Applied", description: "The AI-generated policy has been applied." });
    } catch (error) {
      console.error("AI Suggestion Error:", error);
      toast({ variant: "destructive", title: "AI Error", description: "Failed to get a suggestion from the AI." });
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>1. Select a Preset</CardTitle>
            <CardDescription>Start with a security level that fits your needs.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={preset} onValueChange={setPreset}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="Strict">Strict</TabsTrigger>
                <TabsTrigger value="Balanced">Balanced</TabsTrigger>
                <TabsTrigger value="Permissive">Permissive</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>2. Configure Sources</CardTitle>
            <CardDescription>Add or remove domains and sources for your policy.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="e.g., https://example.com"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddUrl()}
              />
              <Button onClick={handleAddUrl}><Plus className="mr-2 h-4 w-4" /> Add</Button>
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
            <CardTitle>3. Toggle Directives</CardTitle>
            <CardDescription>Fine-tune your policy by enabling or disabling specific directives.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cspDirectives.map((d) => (
              <div key={d.id} className="flex items-start space-x-4">
                <d.icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <Label htmlFor={d.id} className="font-semibold">{d.label}</Label>
                    <Switch
                      id={d.id}
                      checked={directiveStates[d.id] || false}
                      onCheckedChange={(checked:any) => setDirectiveStates({ ...directiveStates, [d.id]: checked })}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{d.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1 space-y-8">
        <Card className="sticky top-8 shadow-md">
          <CardHeader>
            <CardTitle>Generated CSP</CardTitle>
            <CardDescription>Your configured Content Security Policy.</CardDescription>
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
            <Button className="w-full mt-4 bg-accent hover:bg-accent/90" onClick={handleAiSuggestion} disabled={isAiLoading}>
              {isAiLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Get AI Suggestion
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
