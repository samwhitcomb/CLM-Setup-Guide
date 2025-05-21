import { useState, useCallback } from 'react';
import { useOnboarding } from '@/lib/onboarding-context';
import { StepState, StepValidation, CompletionStatus } from '@/types/step';

export function useStep(totalPages: number = 1) {
  const { goToNextStep, goToPreviousStep } = useOnboarding();
  const [state, setState] = useState<StepState>({
    isComplete: false,
    currentPage: 0,
  });
  const [completionStatus, setCompletionStatus] = useState<CompletionStatus>({});

  const handleNext = useCallback(() => {
    if (state.currentPage < totalPages - 1) {
      setState(prev => ({ ...prev, currentPage: prev.currentPage + 1 }));
    } else {
      goToNextStep();
    }
  }, [state.currentPage, totalPages, goToNextStep]);

  const handleBack = useCallback(() => {
    if (state.currentPage > 0) {
      setState(prev => ({ ...prev, currentPage: prev.currentPage - 1 }));
    } else {
      goToPreviousStep();
    }
  }, [state.currentPage, goToPreviousStep]);

  const setCompletion = useCallback((key: string, isComplete: boolean) => {
    setCompletionStatus(prev => ({ ...prev, [key]: isComplete }));
  }, []);

  const validateStep = useCallback((): StepValidation => {
    const allComplete = Object.values(completionStatus).every(status => status);
    return {
      isValid: allComplete,
      message: allComplete ? undefined : 'Please complete all required items'
    };
  }, [completionStatus]);

  const setError = useCallback((error: string) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: undefined }));
  }, []);

  return {
    state,
    completionStatus,
    handleNext,
    handleBack,
    setCompletion,
    validateStep,
    setError,
    clearError
  };
} 