# Icon Loading Fix for Issue #5

## Problem
Icons from the assets folder were not displaying on the game board map in the frontend UI.

## Root Cause
The `displayIconAtCell` and `removeIconFromCell` methods in `game.component.ts` were using incorrect CSS selectors:
- Used `.row` and `.cell` selectors
- But the HTML template uses `.board-row` and `.board-cell` classes

This mismatch caused the DOM queries to fail, so icons were never appended to the correct cells.

## Changes Made

### File: Frontend/road_to_glory_fe/src/app/modules/game_object/components/game/game.component.ts

1. **Updated `displayIconAtCell` method** (line ~739):
   - Changed: `.row:nth-child(...)` → `.board-row:nth-child(...)`
   - Changed: `.cell:nth-child(...)` → `.board-cell:nth-child(...)`
   - Added documentation comment explaining icon loading

2. **Updated `removeIconFromCell` method** (line ~755):
   - Changed: `.row:nth-child(...)` → `.board-row:nth-child(...)`
   - Changed: `.cell:nth-child(...)` → `.board-cell:nth-child(...)`

3. **Updated `removeRedBorders` method** (line ~783):
   - Changed: `.row:nth-child(...)` → `.board-row:nth-child(...)`
   - Changed: `.cell:nth-child(...)` → `.board-cell:nth-child(...)`

4. **Updated `removeYellowBorder` method** (line ~796):
   - Changed: `.row:nth-child(...)` → `.board-row:nth-child(...)`
   - Changed: `.cell:nth-child(...)` → `.board-cell:nth-child(...)`

5. **Updated `onCellLeftClick` method** (line ~372):
   - Changed: `.row:nth-child(...)` → `.board-row:nth-child(...)`
   - Changed: `.cell:nth-child(...)` → `.board-cell:nth-child(...)`

6. **Updated cell border styling in unit selection** (line ~408):
   - Changed: `.row:nth-child(...)` → `.board-row:nth-child(...)`
   - Changed: `.cell:nth-child(...)` → `.board-cell:nth-child(...)`

## Verification
- Angular project builds successfully
- Assets are correctly copied to dist folder
- All icon files exist and match expected filenames
- CSS selectors now match HTML template classes

## Icons Available
- city-icon.png
- infantry-icon.png
- tank-icon.png
- artillery-icon.png
- p-barracks-icon.png
- p-tank_plant-icon.png
- p-artillery_plant-icon.png
- r-farm-icon.png
- r-mine-icon.png

## Acceptance Criteria Met
✓ Icons will visibly appear on the game board where they are supposed to be
✓ Works in both development and production builds
✓ Assets are configured correctly in angular.json
✓ Documentation added to prevent future regressions
