import type { CardId } from '~/types/card';
import type { Agent } from '~/types/agent';

export type Team = Record<CardId, Agent | null>;
