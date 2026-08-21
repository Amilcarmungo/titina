import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { FirebaseAuthSync } from "../components/FirebaseAuthSync";
import { reportLovableError } from "../lib/lovable-error-reporting";
import {
  absoluteUrl,
  HOME_DESCRIPTION,
  HOME_TITLE,
  SHARE_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "../lib/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back
          home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: HOME_TITLE },
        { name: "description", content: HOME_DESCRIPTION },
        { name: "author", content: SITE_NAME },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:locale", content: "pt_PT" },
        {
          property: "og:title",
          content: HOME_TITLE,
        },
        {
          property: "og:description",
          content: HOME_DESCRIPTION,
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: SITE_URL },
        {
          property: "og:image",
          content: SHARE_IMAGE,
        },
        { property: "og:image:alt", content: "Bazarixy" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: HOME_TITLE,
        },
        {
          name: "twitter:description",
          content: HOME_DESCRIPTION,
        },
        {
          name: "twitter:image",
          content: SHARE_IMAGE,
        },
        { name: "twitter:image:alt", content: "Bazarixy" },
      ],
      links: [
        { rel: "canonical", href: SITE_URL },
        { rel: "sitemap", href: "/sitemap.xml", type: "application/xml" },
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "apple-touch-icon", href: "/favicon.ico" },
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;900&display=swap",
        },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <FirebaseAuthSync />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster
        position="top-center"
        offset={0}
        gap={10}
        expand={false}
        visibleToasts={3}
        icons={{
          success: (
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
              ✓
            </span>
          ),
          error: (
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-500 text-white">
              !
            </span>
          ),
          warning: (
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-500 text-white">
              !
            </span>
          ),
          info: (
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-foreground text-background">
              i
            </span>
          ),
        }}
        className="!fixed !inset-x-0 !left-0 !top-1/2 !mx-auto !flex !w-[calc(100vw-24px)] !max-w-[420px] !-translate-y-1/2 !transform !flex-col !items-center"
        toastOptions={{
          unstyled: true,
          duration: 2600,
          classNames: {
            toast:
              "pointer-events-auto mx-auto flex w-full min-w-0 items-center justify-center gap-2.5 rounded-2xl border border-black/5 bg-white/95 px-3.5 py-3 text-center text-foreground shadow-[0_18px_50px_-18px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-4",
            content: "flex min-w-0 flex-1 flex-col items-center gap-0.5",
            title:
              "w-full break-words text-[13px] font-bold leading-snug text-neutral-900 sm:text-[13.5px]",
            description:
              "w-full break-words text-[11.5px] font-medium leading-[1.35] text-neutral-500 sm:text-[12px]",
            actionButton:
              "shrink-0 rounded-full bg-foreground px-3 py-1.5 text-[11px] font-bold text-background",
            cancelButton:
              "shrink-0 rounded-full border border-border px-3 py-1.5 text-[11px] font-bold",
            icon: "shrink-0",
          },
        }}
      />
    </QueryClientProvider>
  );
}
