# ACS Website Agent - Next Steps (Saved)

## Current Status (Working)
- Wix chat overlay opens from header button and runs from `masterPage.js`.
- Website agent calls `backend/aiChat.jsw`.
- Handoff mode submits **one** intake per chat session to Railway `/api/ai/create-intake`, which writes to Zoho Creator.
- UX safeguards added: disables Send while thinking, shows "Typing...", prevents double sends, keeps the on-page chat from growing forever (caps displayed blocks).
- Company instructions set via Wix Secret `WEBSITE_AGENT_INSTRUCTIONS` (short version due to Wix secret size limits).

## Connections / Secrets (Wix Dashboard -> Developer Tools -> Secrets Manager)
Required:
- `OPENAI_API_KEY`
- `ACS_AI_BACKEND_URL` (Railway base URL)

Optional:
- `OPENAI_MODEL` (example: `gpt-4.1-mini`)
- `WEBSITE_AGENT_INSTRUCTIONS` (company rules)

## Skipped (Come Back Later): Service-Specific “Quality Questions”
Goal: Improve lead quality without repeating questions or making the chat annoying.

Plan:
1. Pick 2-3 “must have” questions per service:
   - Restaurant Hood Cleaning
   - Deep Cleaning
   - Commercial Cleaning
   - Carpet Cleaning
   - Lawn Maintenance / Mowing / Shrub Trimming / Mulch Installation
   - Snow Removal
   - Other Services
2. Update `backend/aiChat.jsw` to:
   - Add a small per-service checklist.
   - Ask only the first missing item (one question at a time).
   - Keep structured memory in `knownIntake` so it never repeats questions.

## Suggested Default Question Ideas (Draft Only)
Hood Cleaning:
- How many hoods (or cooking line length)?
- Best access window (after close / before open)?

Deep/Commercial Cleaning:
- Approx sq ft (or number of rooms/areas)?
- Any special focus areas (restrooms, floors, kitchen, etc.)?

Carpet Cleaning:
- How many rooms / approx sq ft?
- Any stains/pets/odor issues?

Lawn Maintenance:
- Lot size (small/medium/large) or approx sq ft?
- Frequency (weekly/biweekly/one-time)?

Snow Removal:
- Type (driveway/parking lot) and size?
- Trigger depth (e.g., 2 inches, 4 inches) and timing preferences?

## Next Enhancement After That
- Add a clean "Close-out" flow after intake submit:
  - Confirm request submitted
  - Provide next steps (team follow-up)
  - Optionally auto-close overlay after a few seconds

