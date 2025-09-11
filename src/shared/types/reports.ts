export interface PreviewPanelProps {
  content: string;
  enableCharts?: boolean;
  customStyles?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export interface ChartConfiguration {
  type: 'line' | 'bar' | 'pie' | 'scatter';
  data: any;
  options?: any;
}

export interface RenderOptions {
  enableCharts?: boolean;
  customStyles?: string;
  sandboxAttributes?: string[];
  chartConfig?: ChartConfiguration;
}

export interface StyleSheet {
  id: string;
  content: string;
  priority: number;
}
