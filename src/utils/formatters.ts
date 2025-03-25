
// Function to format large numbers with K, M suffixes
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Function to format time since last played
export function formatLastPlayed(timestamp: number): string {
  const now = new Date();
  const lastPlayed = new Date(timestamp);
  const diffMs = now.getTime() - lastPlayed.getTime();
  
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (diffDays > 0) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  }
  
  if (diffHours > 0) {
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  }
  
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
}

// Function to get color class based on mastery level
export function getMasteryColorClass(level: number): string {
  return `mastery-${level}`;
}

// Function to calculate progress percentage
export function calculateProgressPercentage(current: number, total: number): number {
  if (total === 0) return 100; // Already max level
  return Math.min(100, Math.round((current / total) * 100));
}
