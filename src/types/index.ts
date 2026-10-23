export type ToolCategory =
  | 'seo'
  | 'text'
  | 'media'
  | 'developer'
  | 'finance'
  | 'health'
  | 'utility';

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolMetadata {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  category: ToolCategory;
  badge?: string;
  icon: string;
  description: string;
  searchVolume: string;
  estimatedCpc: string;
  highIntentKeywords: string[];
  howToSteps: string[];
  faqs: ToolFaq[];
  metaTitle: string;
  metaDescription: string;
}
