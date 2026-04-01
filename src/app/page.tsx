import { SiteHeader } from "@/components/site/header";
import { BentoGrid } from "@/components/bento/bento-grid";
import { TerminalForm } from "@/components/contact/terminal-form";
import { Hero } from "@/components/hero/hero";
import { SiteFooter } from "@/components/site/footer";
import { StickyStory } from "@/components/story/sticky-story";
import { SolutionsSection } from "@/components/sections/solutions-section";
import { ServicesRangeSection } from "@/components/sections/services-range-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQSection } from "@/components/faq/faq-section";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[#070708] light:bg-zinc-50">
      <SiteHeader />
      <main className="flex-1">
        {/* 英雄区域 - 保留背景特效 */}
        <Hero />
        
        {/* 服务范围 - 重新设计 */}
        <ServicesRangeSection />
        
        {/* 解决方案 - 重新设计 */}
        <SolutionsSection />
        
        {/* 特色展示 - 重新设计 */}
        <BentoGrid />
        
        {/* 客户故事 - 重新设计 */}
        <StickyStory />
        
        {/* 客户评价 - 重新设计 */}
        <TestimonialsSection />
        
        {/* 常见问题 - 重新设计 */}
        <FAQSection />
        
        {/* 联系表单 - 重新设计 */}
        <TerminalForm />
      </main>
      <SiteFooter />
    </div>
  );
}
