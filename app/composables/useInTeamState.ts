import type { CardId } from '~/types/card';
import type { Agent } from '~/types/agent';

export const useInTeamState = () => (
  useState<Record<CardId, Agent | null>>('inTeam', () => ({}))
);