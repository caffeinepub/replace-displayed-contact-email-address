# Specification

## Summary
**Goal:** Add a Facebook social link in the site footer that points to the provided Facebook profile.

**Planned changes:**
- Update the footer “Follow Us” (or equivalent) social links to include a Facebook link pointing to https://www.facebook.com/profile.php?id=61575271824165.
- Ensure the Facebook link opens in a new tab with `rel="noopener noreferrer"` and includes accessible labeling (e.g., `aria-label="Facebook"`).
- Ensure the Facebook link appears anywhere the footer is rendered (including the main site and payment status pages).

**User-visible outcome:** Visitors see a Facebook icon/link in the footer and can open the specified Facebook profile in a new tab.
