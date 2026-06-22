# Source Docs — Index & Download-Link Map

Two client documents define content the live site does not yet have. The verbatim text is in the `.txt` extracts (faithful `textutil` conversion of the `.docx` originals). Downstream agents read the `.txt` files directly for verbatim copy; this README is the index + the resource-link map.

| File | What it defines |
|---|---|
| `Wedding Mates Booking Portal Copy.docx` / `booking-portal-copy.txt` | The 7-step booking + payment portal (does NOT exist on the live site). Exact fields, the 4 paid extras + prices, step-7 email contents. |
| `FINAL Course Layout.docx` / `course-layout.txt` | The complete gated course: Introduction + 8 modules, with verbatim website body copy per module, time allocations, support contact, and the resource download links below. |

## Booking flow (7 steps) — summary
1. **Your Wedding Date** (legal note if < 4 weeks away).
2. **Your Details** — Full Name, Partner's Full Name, Email, Mobile, Home Suburb (for the legal face-to-face), Preferred Contact (Email/Phone).
3. **Your Chosen Celebrant (optional)** — Name, Email, Phone, or "We haven't chosen one yet".
4. **Ceremony Location (optional)** — free text.
5. **Optional Extras** — Official Marriage Certificate **$69**, Celebrant in Attendance **$299**, Zoom Rehearsal **$99**, Custom Script Review **$129**.
6. **Payment** — Base package + extras; secure checkout (Stripe); automated email receipt.
7. **Confirmation & Access** — redirect to confirmation; email with course login details, timeline checklist download, onboarding-call booking link, optional celebrant welcome pack (if celebrant contact provided).

> Base package price is **$950 AUD** (from the homepage; the booking doc says "Base Package" without a number).

## Course structure (Introduction + 8 modules)
| # | Module title (per doc) | Download(s) | Link status |
|---|---|---|---|
| Intro | Welcome to the Wedding Mates Ceremony Blueprint | Checklist (Canva) | `DAGcOBFP1Lk` ✅ |
| 1 | Interviewing your couple | Interview Questions Template (Canva) | `DAGcOV8Z8O8` ✅ |
| 2 | Structuring the Ceremony & The Welcome | Wedding ceremony template 1 & 2 (Google Drive folder) | `drive/folders/14oM7ZuXjSFuUJ9bta5vcshr2BQGFQmIt` ✅ |
| 3 | Writing your ceremony / love story | The Narrative Builder (Canva) | `DAGxsC9FZ_E` ✅ |
| 4 | Adding heart and personality | (none) | — |
| 5 | Adding music, readings, rituals and vows | Guide to writing vows; Readings library ×5 | vows guide **PENDING (no URL)**; readings ✅ (below) |
| 6 | Adding instructions, prompts and other people | The ultimate vows blueprint (Canva) | `DAGzL9j1cB4` ✅ |
| 7 | Presentation — delivering with confidence | Tips to calm nerves on the day | **PENDING (no URL)** |
| 8 | The Wrap Up | (uses the Module-1 checklist final section) | — |

**Readings library (Module 5), all Canva:**
- Readings for young people — `DAGwBhSeQGI`
- Song Lyrics — `DAGwBctn0uI`
- Literary and poetic — `DAGwBOBF5sA`
- Romantic Readings — `DAGwAUQ3ha4`
- Funny and light-hearted — `DAGwBK7H6QA`

Full Canva URL shape: `https://www.canva.com/design/<ID>/<token>/edit?...` (full URLs preserved in `course-layout.txt`).

### Flags for the client (do not fabricate)
- **2 download links missing:** Module 5 "Guide to writing vows", Module 7 "Tips to calm nerves on the day".
- **Source-doc inconsistency:** the vows content lives in Module 5, but the "ultimate vows blueprint" download (`DAGzL9j1cB4`) is listed under Module 6 in the doc header. Confirm intended placement.
- **All 8 module videos + the intro video do not exist yet.** The doc describes "8 short videos" + per-module overview videos; none are available. Build with video placeholder slots (single `videoUrl` swap-point, default null).
- **Canva/Drive sharing:** confirm every link is set to public "anyone with the link can view"; consider mirroring critical files (checklist, templates, narrative builder) to our own storage as a fallback.

### Support contact (from the course doc — REAL, overrides the live-site placeholders)
- Email: **sarah@letsgetwed.com.au**
- WhatsApp / phone: **0410 820 300**
