import { ReactNode } from 'react';

export interface StepProps {
  onComplete?: () => void;
  onBack?: () => void;
}

export interface StepState {
  isComplete: boolean;
  currentPage: number;
  error?: string;
}

export interface StepItem {
  title: string;
  description: string;
  image?: string;
  checklist?: string[];
}

export interface PageContent {
  key: string;
  content: ReactNode;
}

export type CompletionStatus = {
  [key: string]: boolean;
};

export interface StepValidation {
  isValid: boolean;
  message?: string;
} 