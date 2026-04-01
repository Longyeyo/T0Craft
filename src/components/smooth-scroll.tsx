"use client";

import * as React from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // 页面加载时滚动到顶部
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return <>{children}</>;
}

