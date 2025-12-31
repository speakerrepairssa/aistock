// ClickUp API Service
// Requires API key to be set in Settings > Integrations

interface ClickUpTask {
  id: string;
  name: string;
  description?: string;
  status?: {
    status: string;
  };
  priority?: {
    priority: string;
  };
  due_date?: number;
  custom_fields?: {
    id: string;
    name: string;
    value: string | number | null;
  }[];
  jobNumber?: string; // Extracted from custom fields
}

interface ClickUpList {
  id: string;
  name: string;
}

interface ClickUpTeam {
  id: string;
  name: string;
}

export const clickupService = {

  // Validate API key and fetch available teams/workspaces
  async validateAndGetTeams(apiKey: string): Promise<ClickUpTeam[]> {
    try {
      if (!apiKey?.trim()) {
        throw new Error('API key is required');
      }

      console.log('[ClickUp] validateAndGetTeams - API Key:', apiKey);

      const response = await fetch('https://api.clickup.com/api/v2/team', {
        headers: {
          'Authorization': apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your ClickUp API key.');
        }
        throw new Error(`Failed to fetch teams: ${response.statusText}`);
      }

      const data = await response.json();
      return data.teams || [];
    } catch (error) {
      console.error('Error validating ClickUp API key:', error);
      throw error;
    }
  },

  // Fetch all lists for a team/workspace (deprecated - use getTeamTasks instead)
  async getLists(teamId: string, apiKey: string): Promise<ClickUpList[]> {
    try {
      if (!apiKey) {
        throw new Error('ClickUp API key not configured. Please add it in Settings > Integrations');
      }

      const response = await fetch(
        `https://api.clickup.com/api/v2/team/${teamId}/list`,
        {
          headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch lists: ${response.statusText}`);
      }

      const data = await response.json();
      return data.lists || [];
    } catch (error) {
      console.error('Error fetching ClickUp lists:', error);
      throw error;
    }
  },

  // Fetch tasks from a specific list (deprecated - use getTeamTasks instead)
  async getTasksFromList(listId: string, apiKey: string): Promise<ClickUpTask[]> {
    try {
      if (!apiKey) {
        throw new Error('ClickUp API key not configured. Please add it in Settings > Integrations');
      }

      const response = await fetch(
        `https://api.clickup.com/api/v2/list/${listId}/task`,
        {
          headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.statusText}`);
      }

      const data = await response.json();
      return data.tasks || [];
    } catch (error) {
      console.error('Error fetching ClickUp tasks:', error);
      throw error;
    }
  },

  // Fetch tasks for a team (all tasks)
  async getTeamTasks(teamId: string, apiKey?: string): Promise<ClickUpTask[]> {
    try {
      console.log('[ClickUp] Fetching tasks for team:', teamId);
      console.log('[ClickUp] API Key found:', apiKey ? 'Yes' : 'No');
      console.log('[ClickUp] API Key value:', apiKey);
      
      if (!apiKey) {
        throw new Error('ClickUp API key not configured. Please add it in Settings > Integrations');
      }
      
      const key = apiKey;

      // Step 1: Get all spaces in the team
      console.log('[ClickUp] Step 1: Fetching spaces from:', `https://api.clickup.com/api/v2/team/${teamId}/space?archived=false`);
      const spacesResponse = await fetch(`https://api.clickup.com/api/v2/team/${teamId}/space?archived=false`, {
        headers: {
          'Authorization': key,
          'Content-Type': 'application/json',
        },
      });

      console.log('[ClickUp] Spaces response status:', spacesResponse.status);
      
      if (!spacesResponse.ok) {
        const errorText = await spacesResponse.text();
        console.error('[ClickUp] Spaces API error:', errorText);
        console.error('[ClickUp] Full response:', { status: spacesResponse.status, statusText: spacesResponse.statusText });
        
        if (spacesResponse.status === 401) {
          throw new Error('ClickUp API key is invalid or expired. Please go to Settings → Integrations and update your ClickUp API key.');
        }
        throw new Error(`Failed to fetch spaces: ${spacesResponse.statusText}`);
      }

      const spacesData = await spacesResponse.json();
      const spaces = spacesData.spaces || [];
      console.log('[ClickUp] Found spaces:', spaces.length);

      // Step 2: Get all folders and lists from each space
      const allLists: any[] = [];
      
      for (const space of spaces) {
        console.log(`[ClickUp] Fetching folders for space: ${space.name}`);
        
        // Get folders in space
        const foldersResponse = await fetch(`https://api.clickup.com/api/v2/space/${space.id}/folder?archived=false`, {
          headers: {
            'Authorization': key,
            'Content-Type': 'application/json',
          },
        });

        if (foldersResponse.ok) {
          const foldersData = await foldersResponse.json();
          const folders = foldersData.folders || [];
          
          // Get lists from each folder
          for (const folder of folders) {
            const folderListsResponse = await fetch(`https://api.clickup.com/api/v2/folder/${folder.id}/list?archived=false`, {
              headers: {
                'Authorization': key,
                'Content-Type': 'application/json',
              },
            });
            
            if (folderListsResponse.ok) {
              const folderListsData = await folderListsResponse.json();
              allLists.push(...(folderListsData.lists || []));
            }
          }
        }
        
        // Also get folderless lists directly in the space
        const spaceListsResponse = await fetch(`https://api.clickup.com/api/v2/space/${space.id}/list?archived=false`, {
          headers: {
            'Authorization': key,
            'Content-Type': 'application/json',
          },
        });
        
        if (spaceListsResponse.ok) {
          const spaceListsData = await spaceListsResponse.json();
          allLists.push(...(spaceListsData.lists || []));
        }
      }

      console.log('[ClickUp] Found total lists:', allLists.length);

      // Step 3: Fetch tasks from all lists
      const allTasks: ClickUpTask[] = [];
      
      for (const list of allLists) {
        console.log(`[ClickUp] Fetching tasks from list: ${list.name}`);
        
        const tasksResponse = await fetch(`https://api.clickup.com/api/v2/list/${list.id}/task?archived=false&include_closed=true&subtasks=true`, {
          headers: {
            'Authorization': key,
            'Content-Type': 'application/json',
          },
        });

        if (tasksResponse.ok) {
          const tasksData = await tasksResponse.json();
          const tasks = tasksData.tasks || [];
          
          // Extract job number from custom fields
          const tasksWithJobNumber = tasks.map((task: ClickUpTask) => {
            const jobNumberField = task.custom_fields?.find(
              (field) => field.name.toLowerCase().includes('job') && field.name.toLowerCase().includes('number')
            );
            
            let jobNumber: string | undefined = undefined;
            if (jobNumberField?.value != null) {
              jobNumber = String(jobNumberField.value).trim();
            }
            
            return {
              ...task,
              jobNumber,
            };
          });
          
          allTasks.push(...tasksWithJobNumber);
        }
      }

      console.log('[ClickUp] Total tasks fetched:', allTasks.length);
      return allTasks;
      
    } catch (error) {
      console.error('Error fetching team ClickUp tasks:', error);
      throw error;
    }
  },
};
