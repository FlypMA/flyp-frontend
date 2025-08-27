export interface CreditDisplayProps {
  credits: number;
  planType: 'creators' | 'free' | 'pro' | 'enterprise' | 'dev';
  showUpgradeButton?: boolean;
  onUpgrade?: () => void;
}
