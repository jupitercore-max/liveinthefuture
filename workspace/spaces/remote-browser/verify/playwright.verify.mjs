/**
 * Playwright verifier for Remote Browser space.
 * Verifies the core UI renders and action contract works.
 */

export async function handleAction(ctx) {
  const { action } = ctx;

  // Mock all actions since they need a real browser instance
  if (action === "ensure_browser") {
    return {
      ok: true,
      chrome_running: true,
      proxy_running: true,
      ip: "23.93.249.189",
    };
  }

  if (action === "screenshot") {
    return {
      ok: true,
      image_url: "",
      url: "https://example.com",
      title: "Example Domain",
      timestamp: Date.now() / 1000,
    };
  }

  if (action === "navigate") {
    return {
      ok: true,
      url: ctx.args?.url || "https://example.com",
      title: "Example Domain",
    };
  }

  if (action === "get_info") {
    return {
      ok: true,
      url: "https://example.com",
      title: "Example Domain",
    };
  }

  if (action === "click") {
    return { ok: true };
  }

  if (action === "type_text") {
    return { ok: true };
  }

  if (action === "press_key") {
    return { ok: true };
  }

  if (action === "scroll") {
    return { ok: true };
  }

  if (action === "extract_cookies") {
    return { ok: true, cookie_count: 5, domains: ["facebook.com"] };
  }

  return null;
}

export async function verify(ctx) {
  const { page, assert } = ctx;

  // Wait for initialization to complete
  await page.waitForTimeout(2000);

  // Check that the URL bar exists
  const urlInput = await page.locator('input[placeholder*="URL"]').first();
  const urlInputVisible = await urlInput.isVisible().catch(() => false);
  assert(urlInputVisible, "URL input bar should be visible");

  // Check that key buttons exist
  const enterBtn = await page.locator('button:has-text("Enter")').first();
  const enterVisible = await enterBtn.isVisible().catch(() => false);
  assert(enterVisible, "Enter key button should be visible");

  // Check status indicators rendered
  const statusDot = await page.locator('.rounded-full').first();
  const statusVisible = await statusDot.isVisible().catch(() => false);
  assert(statusVisible, "Status indicator should be visible");
}
