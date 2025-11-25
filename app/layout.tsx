import "@/styles/tailwind.css";
import { Providers } from "./providers";
import { roboto, bebas_neue } from "@/fonts";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bebas_neue.variable} ${roboto.variable}`}>
      <body className="font-roboto text-gray-800 antialiased dark:bg-black dark:text-gray-400">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
