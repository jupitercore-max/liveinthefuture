/**
 * Playwright verifier for Daydream Viewer space.
 * Validates the core UI renders correctly with action data.
 */

export async function handleAction(ctx) {
  const { actionName } = ctx;

  if (actionName === "get_daydream_state") {
    return {
      iteration: 3,
      last_run: "2025-04-05T12:00:00Z",
      last_report: "2025-04-05T12:05:00Z",
      active_thread_names: ["wearables-competition", "content-strategy"],
      questions_ray_would_love: [
        "What second-order effects will spatial computing have on Meta's wearables strategy?",
        "How could Ray's content sites leverage emerging AI search patterns?",
      ],
      seeded_articles: ["AR Glasses Market Analysis 2025", "Home Automation Deep Dive"],
      instructions_version: "v1",
      instructions_content: "# Daydream Instructions v1\n\n## Core Heuristic: Think Like Ray\n\nRay is an engineering leader at Meta who builds things.",
      threads: [
        {
          slug: "wearables-competition",
          filename: "wearables-competition.md",
          content: "# Wearables Competition Thread\n\nTracking competitive landscape for AR glasses and smart wearables across Apple, Google, and Meta platforms.",
          size_bytes: 512,
        },
        {
          slug: "content-strategy",
          filename: "content-strategy.md",
          content: "# Content Strategy Thread\n\nExploring ways to improve audience growth across liveinthefuture.org and vehicle-safety.org.",
          size_bytes: 384,
        },
      ],
      article_seeds_content: "# Article Seeds\n\n- AR glasses comparison: Meta vs Apple\n- Smart home automation trends 2025",
    };
  }

  return {};
}

export async function verify(ctx) {
  const { page, assert } = ctx;

  // Wait for the page to render
  await page.waitForTimeout(2000);

  // Verify the main title renders
  const title = await page.locator("h1").first().textContent();
  assert(title && title.includes("Daydream"), `Expected title to contain "Daydream", got "${title}"`);

  // Verify iteration badge shows
  const iterationBadge = await page.getByText("Iteration 3").count();
  assert(iterationBadge > 0, "Expected iteration badge to show 'Iteration 3'");

  // Verify the "Thinking Heuristics" section exists
  const heuristicsSection = await page.getByText("Thinking Heuristics").count();
  assert(heuristicsSection > 0, "Expected 'Thinking Heuristics' section");

  // Verify the "Active Threads" section exists
  const threadsSection = await page.getByText("Active Threads").count();
  assert(threadsSection > 0, "Expected 'Active Threads' section");

  // Verify thread cards rendered (Active Threads is defaultOpen)
  const threadTitles = await page.getByText("Wearables Competition").count();
  assert(threadTitles > 0, "Expected 'Wearables Competition' thread card");

  // Verify questions section renders
  const questionsSection = await page.getByText("Questions Ray Would Love").count();
  assert(questionsSection > 0, "Expected 'Questions Ray Would Love' section");

  // Verify article seeds section renders
  const seedsSection = await page.getByText("Article Seeds").count();
  assert(seedsSection > 0, "Expected 'Article Seeds' section");
}
