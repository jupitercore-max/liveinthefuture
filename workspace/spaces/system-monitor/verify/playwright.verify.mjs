export async function handleAction(ctx) {
  const { actionName, params } = ctx;

  if (actionName === "get_system_metrics") {
    return {
      uptime_seconds: 123456.78,
      uptime_human: "1d 10h 17m",
      cpu: {
        load_1m: 1.23,
        load_5m: 1.45,
        load_15m: 1.12,
        cpu_count: 4,
        usage_percent: 34.5,
      },
      memory: {
        total_gb: 8.0,
        used_gb: 3.2,
        free_gb: 1.5,
        cached_gb: 2.8,
        buffers_gb: 0.5,
        usage_percent: 40.0,
      },
      disks: [
        {
          filesystem: "/dev/sda1",
          mount: "/",
          size: "100G",
          used: "45G",
          available: "55G",
          usage_percent: 45.0,
        },
        {
          filesystem: "/dev/sdb1",
          mount: "/home",
          size: "200G",
          used: "120G",
          available: "80G",
          usage_percent: 60.0,
        },
      ],
      network: [
        {
          interface: "eth0",
          rx_bytes: 1073741824,
          tx_bytes: 536870912,
          rx_mb: 1024.0,
          tx_mb: 512.0,
        },
      ],
      top_cpu_processes: [
        { pid: 1234, user: "root", cpu_percent: 25.3, mem_percent: 4.1, command: "/usr/bin/node server.js" },
        { pid: 5678, user: "root", cpu_percent: 12.1, mem_percent: 8.2, command: "/usr/bin/python3 app.py" },
        { pid: 9012, user: "root", cpu_percent: 8.5, mem_percent: 2.0, command: "nginx: worker process" },
        { pid: 3456, user: "root", cpu_percent: 3.2, mem_percent: 1.5, command: "/usr/sbin/sshd" },
        { pid: 7890, user: "root", cpu_percent: 1.1, mem_percent: 0.8, command: "cron" },
      ],
      top_mem_processes: [
        { pid: 5678, user: "root", cpu_percent: 12.1, mem_percent: 8.2, command: "/usr/bin/python3 app.py" },
        { pid: 1234, user: "root", cpu_percent: 25.3, mem_percent: 4.1, command: "/usr/bin/node server.js" },
        { pid: 9012, user: "root", cpu_percent: 8.5, mem_percent: 2.0, command: "nginx: worker process" },
        { pid: 3456, user: "root", cpu_percent: 3.2, mem_percent: 1.5, command: "/usr/sbin/sshd" },
        { pid: 7890, user: "root", cpu_percent: 1.1, mem_percent: 0.8, command: "cron" },
      ],
      health: "healthy",
    };
  }

  if (actionName === "get_history") {
    const rangeHours = params?.range_hours ?? 1;
    const now = Date.now();
    const rangeMs = rangeHours * 60 * 60 * 1000;
    const points = [];
    const numPoints = 30;
    for (let i = 0; i < numPoints; i++) {
      const ts = now - rangeMs + (i * rangeMs / numPoints);
      points.push({
        ts: Math.floor(ts),
        cpu: 20 + Math.sin(i * 0.3) * 15 + Math.random() * 5,
        mem: 35 + Math.sin(i * 0.2) * 8 + Math.random() * 3,
        disk: 44 + Math.sin(i * 0.1) * 2,
        net_rx: 1073741824 + i * 1048576 * 10,
        net_tx: 536870912 + i * 524288 * 10,
        load_1m: 1.0 + Math.sin(i * 0.3) * 0.5,
        load_5m: 1.2 + Math.sin(i * 0.2) * 0.3,
        load_15m: 1.1 + Math.sin(i * 0.1) * 0.2,
      });
    }
    return {
      points,
      range_hours: rangeHours,
      point_count: points.length,
    };
  }

  return {};
}

export async function verify(ctx) {
  const { page, assert } = ctx;

  // Wait for the dashboard to load
  await page.waitForTimeout(2500);

  // Check that the title is present
  const title = await page.locator("h1").first().textContent();
  assert(title && title.includes("System Monitor"), "Title should contain System Monitor");

  // Check health badge is visible
  const healthText = await page.getByText("Healthy").first().isVisible();
  assert(healthText, "Health badge should show Healthy");

  // Check uptime is displayed
  const uptimeText = await page.getByText("Uptime:").first().isVisible();
  assert(uptimeText, "Uptime should be displayed");

  // Check CPU section exists
  const cpuLabel = await page.getByText("CPU").first().isVisible();
  assert(cpuLabel, "CPU section should be visible");

  // Check Memory section exists
  const memLabel = await page.getByText("MEMORY").first().isVisible();
  assert(memLabel, "Memory section should be visible");

  // Check time range toggle exists
  const oneHourBtn = await page.getByText("1h").first().isVisible();
  assert(oneHourBtn, "Time range 1h toggle should be visible");

  const sixHourBtn = await page.getByText("6h").first().isVisible();
  assert(sixHourBtn, "Time range 6h toggle should be visible");

  const twentyFourBtn = await page.getByText("24h").first().isVisible();
  assert(twentyFourBtn, "Time range 24h toggle should be visible");

  // Check historical chart sections exist
  const cpuMemChart = await page.getByText("CPU & Memory Over Time").first().isVisible();
  assert(cpuMemChart, "CPU & Memory history chart should be visible");

  const loadChart = await page.getByText("Load Average").first().isVisible();
  assert(loadChart, "Load Average history chart should be visible");

  // Check that numeric data is rendered
  const cpuPercent = await page.getByText("34.5").first().isVisible();
  assert(cpuPercent, "CPU usage percent should be displayed");

  // Check process tables
  const pidHeaders = await page.getByText("PID").count();
  assert(pidHeaders >= 2, "Should have at least 2 process tables with PID column");
}
