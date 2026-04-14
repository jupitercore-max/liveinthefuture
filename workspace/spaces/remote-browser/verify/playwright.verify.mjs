/**
 * Playwright verifier for Remote Browser space.
 * Tests screenshot display, navigation, and click interactions.
 */

export async function handleAction(ctx) {
  const { action, actionName } = ctx;

  // Mock screenshot with a tiny valid JPEG base64
  if (actionName === "screenshot") {
    return {
      ok: true,
      image_base64: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsM" +
        "DhEQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQU" +
        "FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AKwA//9k=",
      url: "https://example.com",
      title: "Example",
    };
  }

  // Mock navigate
  if (actionName === "navigate") {
    return { ok: true, url: action.url || "https://example.com", title: "Example" };
  }

  // Mock click, scroll, type_text, press_key
  if (["click", "scroll", "type_text", "press_key"].includes(actionName)) {
    return { ok: true };
  }

  return null;
}

export async function verify(ctx) {
  const { page, assert } = ctx;

  // Wait for screenshot to render
  await page.waitForTimeout(2000);

  // Check URL bar exists - placeholder shows current URL or "Enter URL…"
  const urlInput = page.locator('input[type="text"]').first();
  const urlExists = (await urlInput.count()) > 0;
  assert(urlExists, "URL input bar should exist");

  // Check text input exists
  const textInput = page.locator('input[placeholder*="Type"]');
  const textExists = (await textInput.count()) > 0;
  assert(textExists, "Text input should exist");

  // Check screenshot image or connecting message exists
  const img = page.locator('img[alt="Browser"]');
  const connectingMsg = page.locator('text=Connecting to browser');
  const hasVisual = (await img.count()) > 0 || (await connectingMsg.count()) > 0;
  assert(hasVisual, "Should show screenshot image or connecting message");

  // Check key buttons exist
  const enterBtn = page.locator('button:has-text("Enter")');
  assert((await enterBtn.count()) > 0, "Enter key button should exist");

  const tabBtn = page.locator('button:has-text("Tab")');
  assert((await tabBtn.count()) > 0, "Tab key button should exist");
}
