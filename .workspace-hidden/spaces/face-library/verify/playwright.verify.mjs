export async function handleAction(ctx) {
  const { actionName } = ctx;
  if (actionName === "get_people") {
    return { people: [], total: 0 };
  }
  if (actionName === "get_photos") {
    return { photos: [], total: 0 };
  }
  return {};
}

export async function verify(ctx) {
  const { page, entryUrl, assert } = ctx;
  await page.goto(entryUrl);
  await page.waitForTimeout(2000);

  // Check header renders
  const header = await page.locator("text=Face Library").first();
  assert(await header.isVisible(), "Header 'Face Library' should be visible");

  // Check nav buttons exist
  const uploadBtn = await page.locator("text=Upload").first();
  assert(await uploadBtn.isVisible(), "Upload nav button visible");

  // Check upload zone exists
  const dropZone = await page.locator("text=Drop a photo here").first();
  assert(await dropZone.isVisible(), "Upload drop zone visible");
}
