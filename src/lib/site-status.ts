export async function getSiteStatus(): Promise<{
  available: boolean;
  note: string;
}> {
  // Sanity 接好后，这里会改成从 CMS 拉取。
  // 目前先保证首页“实时状态绿灯”可用且不阻塞启动。
  return {
    available: true,
    note: "通常 1-2 周内可启动",
  };
}

