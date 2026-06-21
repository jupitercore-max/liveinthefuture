export async function handleAction(ctx) {
  const { actionName } = ctx;

  if (actionName === "get_cron_jobs") {
    return {
      jobs: [
        {
          id: "heartbeat",
          enabled: true,
          mode: "heartbeat",
          schedule_kind: "interval",
          schedule_display: "Every 30min",
          cadence_group: "minutely",
          file_path: "minutely/heartbeat__interval@30m.md",
          body_preview: "",
          schedule_time: null,
          schedule_every: "30m",
          schedule_dow: null,
          schedule_dom: null,
        },
        {
          id: "scanner-poller",
          enabled: true,
          mode: "task",
          schedule_kind: "interval",
          schedule_display: "Every 5min",
          cadence_group: "minutely",
          file_path: "minutely/scanner-poller__interval@5m.md",
          body_preview: "Poll the scanner for security alerts.",
          schedule_time: null,
          schedule_every: "5m",
          schedule_dow: null,
          schedule_dom: null,
        },
        {
          id: "article-litf",
          enabled: true,
          mode: "task",
          schedule_kind: "interval",
          schedule_display: "Every 2hr",
          cadence_group: "hourly",
          file_path: "hourly/article-litf__interval@2h.md",
          body_preview: "Article pipeline for LITF.",
          schedule_time: null,
          schedule_every: "2h",
          schedule_dow: null,
          schedule_dom: null,
        },
        {
          id: "memory-dream",
          enabled: true,
          mode: "task",
          schedule_kind: "daily",
          schedule_display: "Daily 10:00 UTC",
          cadence_group: "daily",
          file_path: "daily/memory-dream__daily@10:00:00.md",
          body_preview: "Dream review of memories.",
          schedule_time: "10:00:00",
          schedule_every: null,
          schedule_dow: null,
          schedule_dom: null,
        },
        {
          id: "github-backup",
          enabled: true,
          mode: "task",
          schedule_kind: "daily",
          schedule_display: "Daily 07:00 UTC",
          cadence_group: "daily",
          file_path: "daily/github-backup__daily@07:00:00.md",
          body_preview: "Backup GitHub repos.",
          schedule_time: "07:00:00",
          schedule_every: null,
          schedule_dow: null,
          schedule_dom: null,
        },
        {
          id: "litf-ig-post",
          enabled: false,
          mode: "heartbeat",
          schedule_kind: "interval",
          schedule_display: "Every 30min",
          cadence_group: "minutely",
          file_path: "minutely/litf-ig-post__interval@30m.md",
          body_preview: "Post the next article from the LITF Instagram queue.",
          schedule_time: null,
          schedule_every: "30m",
          schedule_dow: null,
          schedule_dom: null,
        },
        {
          id: "weekly-ai-roundup",
          enabled: true,
          mode: "task",
          schedule_kind: "weekly",
          schedule_display: "Mon 01:00 UTC",
          cadence_group: "weekly",
          file_path: "weekly/weekly-ai-roundup__weekly@Mon-01:00:00.md",
          body_preview: "Weekly AI roundup.",
          schedule_time: "01:00:00",
          schedule_every: null,
          schedule_dow: ["Mon"],
          schedule_dom: null,
        },
      ],
      total: 7,
      active: 6,
      disabled: 1,
    };
  }

  return { error: "Unknown action" };
}

export async function verify(ctx) {
  const { page, entryUrl, assert } = ctx;

  // Navigate to the space
  await page.goto(entryUrl);
  await page.waitForTimeout(2000);

  // Check header is visible
  const header = page.locator("h1");
  await assert(await header.isVisible(), "Dashboard header should be visible");
  const headerText = await header.textContent();
  await assert(
    headerText?.includes("Cron Dashboard"),
    "Header should say 'Cron Dashboard'"
  );

  // Check stats are visible
  const statsText = await page.textContent("body");
  await assert(statsText?.includes("Total Jobs"), "Should show 'Total Jobs' stat");
  await assert(statsText?.includes("Active"), "Should show 'Active' stat");
  await assert(statsText?.includes("Disabled"), "Should show 'Disabled' stat");

  // Check at least some job names are visible
  await assert(statsText?.includes("heartbeat"), "Should show 'heartbeat' job");
  await assert(statsText?.includes("memory-dream"), "Should show 'memory-dream' job");

  // Check cadence sections
  await assert(statsText?.includes("Minutely"), "Should show 'Minutely' cadence section");
  await assert(statsText?.includes("Daily"), "Should show 'Daily' cadence section");
  await assert(statsText?.includes("Weekly"), "Should show 'Weekly' cadence section");

  // Check timeline strip
  await assert(statsText?.includes("24h Fire Timeline"), "Should show timeline strip");

  // Check mode badges
  await assert(statsText?.includes("heartbeat") || statsText?.includes("HEARTBEAT"), "Should show heartbeat mode badge");
  await assert(statsText?.includes("task") || statsText?.includes("TASK"), "Should show task mode badge");

  // Check refresh button
  const refreshBtn = page.locator("button", { hasText: "Refresh" });
  await assert(await refreshBtn.isVisible(), "Refresh button should be visible");
}
