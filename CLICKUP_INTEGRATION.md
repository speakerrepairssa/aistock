# ClickUp Integration Implementation

## Overview
The ClickUp integration allows users to import tasks from their ClickUp workspace directly into repair job forms, with automatic job number matching and field mapping.

## Architecture

### Component Structure
```
┌─────────────────────────────────────────────────────────────┐
│                     Repair.tsx (UI)                         │
│  - Manages dialog state                                     │
│  - Handles user interactions                                │
│  - Passes API key from Firebase to service                  │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ├─── Reads API Key from ───┐
                   │                           │
                   ▼                           ▼
┌──────────────────────────────┐   ┌─────────────────────────┐
│  settingsStore.ts            │   │  Firebase Firestore     │
│  - Zustand store             │   │  userSettings/{userId}  │
│  - Loads integrations        │   │  - integrations.clickup │
│  - Provides current API key  │   │    - apiKey             │
└──────────────────────────────┘   │    - teamId             │
                   │                │    - enabled            │
                   │                └─────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│              clickupService.ts (API Layer)                  │
│  - Makes API calls to ClickUp                               │
│  - Receives API key as parameter                            │
│  - No localStorage dependency                               │
└─────────────────────────────────────────────────────────────┘
```

## API Integration Flow

### 1. ClickUp API Hierarchy
ClickUp organizes data in this hierarchy:
```
Team (Workspace)
  └── Spaces
       ├── Folders
       │    └── Lists
       │         └── Tasks
       └── Lists (folderless)
            └── Tasks
```

### 2. Task Fetching Process
```typescript
getTeamTasks(teamId: string, apiKey: string) {
  1. Fetch all Spaces in the team
     GET /api/v2/team/{teamId}/space?archived=false
  
  2. For each Space:
     a. Fetch Folders
        GET /api/v2/space/{spaceId}/folder?archived=false
     
     b. For each Folder:
        GET /api/v2/folder/{folderId}/list?archived=false
     
     c. Fetch folderless Lists
        GET /api/v2/space/{spaceId}/list?archived=false
  
  3. For each List:
     GET /api/v2/list/{listId}/task?archived=false&include_closed=true&subtasks=true
  
  4. Extract job numbers from custom fields
  
  5. Return combined tasks array
}
```

### 3. Authentication
```typescript
// Header format for all requests
headers: {
  'Authorization': apiKey,  // Personal token (pk_...)
  'Content-Type': 'application/json'
}
```

## Critical Implementation Details

### ⚠️ API Key Source (THE FIX)
**Problem Encountered:** Initially, the API key was being retrieved from localStorage, which became stale when users updated their token in Firebase.

**Solution:** API key is now passed as a parameter from Firebase settings:
```typescript
// In Repair.tsx
const clickupIntegration = integrations?.find(i => i.name.toLowerCase() === 'clickup');
const apiKey = clickupIntegration?.apiKey;
const tasks = await clickupService.getTeamTasks(teamIdToUse, apiKey);

// In clickupService.ts
async getTeamTasks(teamId: string, apiKey?: string): Promise<ClickUpTask[]> {
  // API key comes from Firebase via parameter, NOT localStorage
  const key = apiKey;
  // ... rest of implementation
}
```

### 🧹 localStorage Cleanup
To prevent future conflicts, the app automatically removes old ClickUp data from localStorage on load:
```typescript
// In App.tsx
useEffect(() => {
  const settingsJson = localStorage.getItem('aistock-settings');
  if (settingsJson) {
    const settings = JSON.parse(settingsJson);
    if (settings.state?.integrations) {
      const filteredIntegrations = settings.state.integrations.filter(
        (i: any) => i.name?.toLowerCase() !== 'clickup'
      );
      if (filteredIntegrations.length !== settings.state.integrations.length) {
        settings.state.integrations = filteredIntegrations;
        localStorage.setItem('aistock-settings', JSON.stringify(settings));
        console.log('[App] Cleaned up old ClickUp data from localStorage');
      }
    }
  }
}, []);
```

## Job Number Matching

### Custom Field Extraction
```typescript
// Extract job number from ClickUp custom fields
const jobNumberField = task.custom_fields?.find(
  (field) => field.name.toLowerCase().includes('job') && 
             field.name.toLowerCase().includes('number')
);

let jobNumber: string | undefined = undefined;
if (jobNumberField?.value != null) {
  jobNumber = String(jobNumberField.value).trim();
}
```

### Auto-Selection Logic
```typescript
// In Repair.tsx - Auto-select tasks matching current job number
if (currentJobNumberForClickup && currentJobNumberForClickup.trim()) {
  const jobNumberToMatch = currentJobNumberForClickup.trim();
  const matchingTaskIds = tasks
    .filter(task => {
      const taskJobNumber = task.jobNumber ? String(task.jobNumber).trim() : '';
      return taskJobNumber === jobNumberToMatch;
    })
    .map(task => task.id);
  
  setSelectedClickupTasks(matchingTaskIds);
}
```

## User Flow

### Setup Process
1. User goes to Settings → Integrations
2. Clicks "Add Integration" and selects "ClickUp"
3. Enters their ClickUp Personal API Token
4. System validates token by calling GET /api/v2/team
5. User selects their Workspace/Team from dropdown
6. Integration is saved to Firebase: `userSettings/{userId}/integrations/clickup`

### Usage Flow
1. User creates new Repair Job
2. Enters job number (e.g., "436463346")
3. Clicks "Import Tasks from ClickUp"
4. Dialog opens, shows "Fetching tasks for job #436463346..."
5. System fetches ALL tasks from workspace
6. Auto-selects tasks matching the job number
7. User can select additional tasks or remove selections
8. Clicks "Add Tasks" - task data populates form fields

## Firebase Structure

```javascript
userSettings/{userId}
  └── integrations: {
       clickup: {
         apiKey: "pk_49455124_...",  // Personal token from ClickUp
         teamId: "37337874",         // Workspace/Team ID
         enabled: true
       }
     }
```

## Files Modified

### Core Implementation Files
- `frontend/src/services/clickupService.ts` - API service layer
- `frontend/src/pages/Repair.tsx` - UI and integration logic
- `frontend/src/store/settingsStore.ts` - Settings state management
- `frontend/src/App.tsx` - localStorage cleanup

### Key Methods

**clickupService.ts:**
- `validateAndGetTeams(apiKey)` - Validate token and fetch workspaces
- `getTeamTasks(teamId, apiKey)` - Fetch all tasks from workspace
- `getLists(teamId, apiKey)` - Get lists (deprecated, kept for compatibility)
- `getTasksFromList(listId, apiKey)` - Get tasks from specific list (deprecated)

**Repair.tsx:**
- `handleFetchClickupTasks(teamId)` - Triggers task fetch
- `handleAddClickupTasks()` - Processes selected tasks and updates form
- `handleValidateClickupApiKey(apiKey)` - Validates API key during setup

## Error Handling

### Common Errors and Solutions

**401 Unauthorized - Token Invalid:**
- Cause: API token is expired or invalid
- Solution: Regenerate token at https://app.clickup.com/settings/apps
- Error code: OAUTH_025

**Empty Task List:**
- Cause: No tasks exist in workspace or incorrect team ID
- Solution: Verify team ID matches authorized workspace

**API Key Not Found:**
- Cause: Integration not configured
- Solution: Go to Settings → Integrations and set up ClickUp

## Best Practices

### ✅ Do's
- Always pass API key as parameter from Firebase
- Use case-insensitive matching for integration names
- Validate API key before saving
- Fetch tasks from all lists in workspace for comprehensive results
- Log API responses for debugging
- Clean up old localStorage data

### ❌ Don'ts
- Never read API key from localStorage (stale data risk)
- Don't cache API keys client-side beyond current session
- Don't assume team endpoint exists (tasks are in lists, not teams)
- Don't hardcode endpoint URLs

## Debugging

### Console Logs to Check
```javascript
[ClickUp] Fetching tasks for team: {teamId}
[ClickUp] API Key found: Yes
[ClickUp] API Key value: pk_...
[ClickUp] Step 1: Fetching spaces...
[ClickUp] Found spaces: X
[ClickUp] Fetching tasks from list: {listName}
[ClickUp] Total tasks fetched: X
```

### Common Debug Steps
1. Check console for API key value being used
2. Verify team ID matches workspace
3. Check spaces/lists are being fetched
4. Verify tasks have custom fields with job numbers
5. Check browser network tab for actual API calls

## API Documentation Reference
- ClickUp API v2: https://clickup.com/api
- Authentication: https://clickup.com/api/developer-portal/authentication/
- Personal Tokens: Generate at https://app.clickup.com/settings/apps

## Future Improvements
- [ ] Cache workspace structure to reduce API calls
- [ ] Add webhook support for real-time task updates
- [ ] Support for filtering by status, assignee, or date range
- [ ] Bulk task import with progress indicator
- [ ] Two-way sync: Update ClickUp when repair job status changes
