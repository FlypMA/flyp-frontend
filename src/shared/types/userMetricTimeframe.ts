export enum UserMetricTimeframeType {
  Today = 'today',
  Yesterday = 'yesterday',
  ThisWeek = 'thisWeek',
  LastWeek = 'lastWeek',
  ThisMonth = 'thisMonth',
  LastMonth = 'lastMonth',
  AllTime = 'all_time',
}

export interface UserMetricTimeframe {
  type: UserMetricTimeframeType;
  value: number;
}
