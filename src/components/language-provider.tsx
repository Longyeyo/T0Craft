"use client";

import * as React from "react";

// 定义语言类型
export type Language = "zh" | "en";

// 定义语言上下文类型
interface LanguageContextType {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

// 创建语言上下文
export const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

// 语言提供者组件属性
interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

// 语言提供者组件
export function LanguageProvider({ children, defaultLanguage = "zh" }: LanguageProviderProps) {
  const [language, setLanguage] = React.useState<Language>(defaultLanguage);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 自定义钩子，用于在组件中获取语言上下文
export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}