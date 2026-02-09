# Specification

## Summary
**Goal:** Make `https://pccomputerandcommunication.com` the primary/canonical live URL shown to users across the site, while keeping the IC-provided URL working as an alternate access URL.

**Planned changes:**
- Update any user-visible references to the live website URL (UI text, links, documentation) to use `https://pccomputerandcommunication.com` as the default.
- Update custom-domain setup documentation to reflect `https://pccomputerandcommunication.com` as the primary URL and note the IC-provided URL remains available.
- Add a canonical URL hint for search engines by including `<link rel="canonical" href="https://pccomputerandcommunication.com" />` in `frontend/index.html`.
- Verify that navigation, deep links (including any hash-based navigation), and section scrolling behavior continue to work as before.

**User-visible outcome:** Visitors will see and use `https://pccomputerandcommunication.com` as the default website link throughout the site, and search engines will be guided to treat it as the canonical URL (while the IC-provided URL still works).
