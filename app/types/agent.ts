import type { Card } from '~/types/card';
import type {
  BasicSkill,
  InvestigationSkill,
} from '~/types/skill';

export interface Agent extends Card {
  costInt: number;
}

export interface AgentStat {
  title: InvestigationSkill | BasicSkill;
  total: number;
  icon?: string;
  color?: string;
}