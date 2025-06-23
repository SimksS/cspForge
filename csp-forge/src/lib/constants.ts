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
  type LucideIcon,
} from "lucide-react";


export const cspDirectives: { id: string; label: string; icon: LucideIcon; description: string }[] = [
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

export const presets: Record<string, Record<string, boolean>> = {
  Strict: { "default-src": true, "script-src": true, "style-src": true, "img-src": true, "font-src": true, "connect-src": true, "object-src": true, "base-uri": true, "form-action": true, "frame-ancestors": true, "frame-src": false, "media-src": false, },
  Balanced: { "default-src": true, "script-src": true, "style-src": true, "img-src": true, "font-src": true, "connect-src": true, "object-src": true, "base-uri": true, "form-action": true, "frame-ancestors": true, "frame-src": true, "media-src": true, },
  Permissive: { "default-src": true, "script-src": true, "style-src": true, "img-src": true, "font-src": true, "connect-src": true, "object-src": true, "base-uri": true, "form-action": true, "frame-ancestors": true, "frame-src": true, "media-src": true, },
};

export const presetUrls: Record<string, string[]> = {
  Strict: ["'self'"],
  Balanced: ["'self'", "https:", "data:"],
  Permissive: ["*"],
};


  export const navItems = [
    {
      name: "home",
      link: "/",
    },
    {
      name: "howto",
      link: "/how-to-use",
    },
    {
      name: "whatsIs",
      link: "/articles/what-is-csp",
    },
  ];