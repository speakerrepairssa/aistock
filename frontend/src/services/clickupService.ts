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

// Helper to get API key from settings
const getApiKey = (): string => {
  // Try to get from localStorage settings
  const settingsJson = localStorage.getItem('aistock-settings');
  if (settingsJson) {
    try {
      const settings = JSON.parse(settingsJson);
      const clickupIntegration = settings.state?.integrations?.find(
        (i: any) => i.name === 'ClickUp'
      );
      return clickupIntegration?.apiKey || '';
    } catch (e) {
      console.error('Error parsing settings:', e);
    }
  }
  return '';
};

export const clickupService = {

  // Validate API key and fetch available teams/workspaces
  async validateAndGetTeams(apiKey: string): Promise<ClickUpTeam[]> {
    try {
      if (!apiKey?.trim()) {
        throw new Error('API key is required');
      }

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

  // Fetch all lists for a team/workspace
  async getLists(teamId: string): Promise<ClickUpList[]> {
    try {
      const apiKey = getApiKey();
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

  // Fetch tasks from a specific list
  async getTasksFromList(listId: string): Promise<ClickUpTask[]> {
    try {
      const apiKey = getApiKey();
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
  async getTeamTasks(teamId: string): Promise<ClickUpTask[]> {
    try {
      const apiKey = getApiKey();
      if (!apiKey) {
        throw new Error('ClickUp API key not configured. Please add it in Settings > Integrations');
      }

      const response = await fetch(
        `https://api.clickup.com/api/v2/team/${teamId}/task?include_custom_fields=true`,
        {
          headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch team tasks: ${response.statusText}`);
      }

      const data = await response.json();
      const tasks = data.tasks || [];
      
      // Extract job number from custom fields
      return tasks.map((task: ClickUpTask) => {
        const jobNumberField = task.custom_fields?.find(
          (field) => field.name.toLowerCase() === 'job number'
        );
        return {
          ...task,
          jobNumber: jobNumberField?.value?.toString() || undefined,
        };
      });
    } catch (error) {
      console.error('Error fetching team ClickUp tasks:', error);
      throw error;
    }
  },
};
