export const edgeRegions: Record<string, string> = {
  // US
  'us-east-1': 'N. Virginia',
  'us-east-2': 'Ohio',
  'us-west-1': 'N. California',
  'us-west-2': 'Oregon',

  // Europe
  'eu-west-1': 'Ireland',
  'eu-west-2': 'London',
  'eu-west-3': 'Paris',
  'eu-central-1': 'Frankfurt',
  'eu-central-2': 'Zurich',
  'eu-north-1': 'Stockholm',
  'eu-south-1': 'Milan',
  'eu-south-2': 'Spain',

  // Asia Pacific
  'ap-northeast-1': 'Tokyo',
  'ap-northeast-2': 'Seoul',
  'ap-northeast-3': 'Osaka',
  'ap-southeast-1': 'Singapore',
  'ap-southeast-2': 'Sydney',
  'ap-southeast-3': 'Jakarta',
  'ap-southeast-4': 'Melbourne',
  'ap-south-1': 'Mumbai',
  'ap-south-2': 'Hyderabad',
  'ap-east-1': 'Hong Kong',

  // South America
  'sa-east-1': 'São Paulo',

  // Canada
  'ca-central-1': 'Canada',
  'ca-west-1': 'Calgary',

  // Middle East
  'me-south-1': 'Bahrain',
  'me-central-1': 'UAE',

  // Africa
  'af-south-1': 'Cape Town',

  // Israel
  'il-central-1': 'Tel Aviv',
};

export function getEdgeLocationName(code: string | null): string | null {
  if (!code) return null;
  return edgeRegions[code] || code;
}
