"use client"

import * as React from "react"

/**
 * Dev-time accessibility auditing — logs axe-core violations to the browser
 * console as you navigate during `npm run dev`. No-op in production builds.
 *
 * Mounted once in the root layout. Renders nothing.
 */
export function A11yDevAudit() {
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
      import("react").then((React) =>
        import("react-dom").then((ReactDOM) =>
          import("@axe-core/react")
            .then((axe) => axe.default(React, ReactDOM, 1000))
            .catch((err) => {
              console.warn("[a11y-dev] axe-core/react failed to initialise:", err)
            })
        )
      )
    }
  }, [])

  return null
}
