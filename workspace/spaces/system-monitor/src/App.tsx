import { SpaceRoot } from "@hatch/sdk/components";
import type { JSX } from "react";
import "./theme.css";

export default function App(): JSX.Element {
  return (
    <SpaceRoot>
      <main className="px-5 py-6 sm:px-6 sm:py-8 md:px-8" style={{ color: "var(--text)" }}>
        <div className="mx-auto grid max-w-5xl gap-4 sm:gap-6">
          <header
            className="grid gap-3 border px-5 py-5 shadow-sm sm:px-6 sm:py-6 md:px-8 md:py-8"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              borderRadius: "calc(var(--radius) * 4)",
            }}
          >
            <p
              className="text-sm font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--accent)" }}
            >
              Space scaffold
            </p>
            <h1 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
              Your new space starts here
            </h1>
            <p className="max-w-2xl text-base leading-7" style={{ color: "var(--dim)" }}>
              Add Python actions under <code>actions/</code>, run
              <code> spaces build-actions --space ...</code> to
              generate <code>src/actions.ts</code>, wire the frontend in <code>src/App.tsx</code>,
              and then use <code> spaces build-space --space ...</code>
              to publish the current build snapshot.
            </p>
          </header>

          <section className="grid gap-4 md:grid-cols-2">
            <article
              className="grid gap-2 border px-5 py-5 sm:gap-3"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                borderRadius: "calc(var(--radius) * 3.5)",
              }}
            >
              <h2 className="text-lg font-semibold leading-tight tracking-tight">Actions</h2>
              <p className="text-base leading-7" style={{ color: "var(--dim)" }}>
                Scaffold typed actions with
                <code> spaces create-action --space ...</code>. Import
                <code> BaseModel</code> from <code>pydantic</code> and define handlers like
                <code> async def main(ctx, request: Request)</code>. Then run
                <code> spaces build-actions --space ...</code>,
                import <code>Space</code> from <code> ./actions</code>, and call typed helpers like
                <code> await Space.helloWorld(request)</code>.
              </p>
            </article>

            <article
              className="grid gap-2 border px-5 py-5 sm:gap-3"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                borderRadius: "calc(var(--radius) * 3.5)",
              }}
            >
              <h2 className="text-lg font-semibold leading-tight tracking-tight">Storage</h2>
              <p className="text-base leading-7" style={{ color: "var(--dim)" }}>
                Each space gets its own <code>app.db</code>. In Python actions, use
                <code> ctx.app_db_path()</code> or <code>ctx.open_app_db()</code> instead of hardcoding
                database paths.
              </p>
            </article>
          </section>
        </div>
      </main>
    </SpaceRoot>
  );
}
