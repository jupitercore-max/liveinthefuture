export async function verify(ctx) {
  const { page, entryUrl, assert } = ctx;
  await page.goto(entryUrl);
  await page.waitForTimeout(3000);

  // Check title rendered
  const title = await page.locator("text=Watch Market").first();
  assert(await title.isVisible(), "Watch Market title should be visible");

  // Check stat cards loaded with real data
  const statCards = page.locator(".surface-card");
  const count = await statCards.count();
  assert(count >= 4, `Should have at least 4 stat cards, got ${count}`);

  // Check that analytics data loaded (not showing dashes)
  const bodyText = await page.textContent("body");
  assert(bodyText.includes("listings tracked"), "Should show listing count");

  // Click on Listings tab
  await page.getByRole("button", { name: "Listings" }).click();
  await page.waitForTimeout(1000);
  
  // Check table rendered
  const tableRows = page.locator("table tbody tr");
  const rowCount = await tableRows.count();
  assert(rowCount > 0, `Listings table should have rows, got ${rowCount}`);

  // Click on Watchlist tab
  await page.getByRole("button", { name: "Watchlist" }).click();
  await page.waitForTimeout(1000);
  
  // Check watchlist targets rendered
  const milgauss = await page.locator("text=Rolex Milgauss").first();
  assert(await milgauss.isVisible(), "Milgauss target should be visible");

  // Navigate back to Dashboard for screenshot
  await page.getByRole("button", { name: "Dashboard" }).click();
  await page.waitForTimeout(2000);
  
  // Verify dashboard charts are visible
  const brandDist = await page.locator("text=Brand Distribution").first();
  assert(await brandDist.isVisible(), "Brand Distribution chart should be visible on dashboard");
  const priceRange = await page.locator("text=Price Range by Brand").first();
  assert(await priceRange.isVisible(), "Price Range chart should be visible on dashboard");
}

export async function handleAction(ctx) {
  // Let all read actions fall through to real backend
  return null;
}
