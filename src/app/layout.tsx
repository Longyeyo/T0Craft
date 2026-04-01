import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { XiduCanvas } from "@/components/xidu/xidu-canvas";
import { LanguageProvider } from "@/components/language-provider";

export const metadata: Metadata = {
  title: {
    default: "T0Craft Studio｜APP开发_小程序开发_PC网站开发_接口开发_软件系统开发",
    template: "%s｜T0Craft Studio",
  },
  description:
    "专业的软件开发公司，提供APP开发、小程序开发、PC网站开发、接口开发、软件系统开发等一站式解决方案，帮助企业快速实现数字化转型。",
  keywords: "APP开发,小程序开发,PC网站开发,接口开发,软件系统开发,软件开发公司",
  openGraph: {
    title: "T0Craft Studio｜专业软件开发服务",
    description: "提供APP、小程序、PC网站、接口和软件系统开发等一站式解决方案",
    type: "website",
    url: "https://t0craft.com",
  },
  twitter: {
    title: "T0Craft Studio｜专业软件开发服务",
    description: "提供APP、小程序、PC网站、接口和软件系统开发等一站式解决方案",
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://t0craft.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <XiduCanvas />
        <ThemeProvider>
          <LanguageProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
