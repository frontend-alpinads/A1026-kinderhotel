import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import config from '../config.json';

export const metadata: Metadata = {
  title: `${config.hero.text} | ${config.hotel.name}`,
  description: config.hero.description,
  icons: {
    icon: config.hotel.favicon || '/favicon.ico',
    apple: config.hotel.favicon || '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colors, fonts } = config.theme;

  const fontFamilies = [fonts.heading, fonts.body]
    .filter(Boolean)
    .map((f) => f.replace(/ /g, '+') + ':wght@300;400;600;700')
    .join('&family=');
  const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`;

  const cssVariables = `
    :root {
      --cfg-primary: ${colors.primary};
      --cfg-secondary: ${colors.secondary};
      --cfg-accent: ${colors.accent};
      --cfg-text: ${colors.text};
      --cfg-text-light: ${colors.textLight};
      --cfg-bg: ${colors.background};
      --cfg-bg-alt: ${colors.backgroundAlt};
      --cfg-font-heading: '${fonts.heading}';
      --cfg-font-body: '${fonts.body}';
    }
  `;

  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href={googleFontsUrl} rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
