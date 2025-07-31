export enum BasicSkill {
  LongRangeCombat = 'Long Range Combat',
  CloseRangeCombat = 'Close Range Combat',
  Health = 'Health',
  Resources = 'Resources',
}

export enum InvestigationSkill {
  AlienInvestigation = 'Alien Investigation',
  Behavioral = 'Behavioral',
  Bureaucracy = 'Bureaucracy',
  Computer = 'Computer',
  CriminalInvestigation = 'Criminal Investigation',
  EvidenceCollection = 'Evidence Collection',
  Medical = 'Medical',
  Observation = 'Observation',
  OccultInvestigation = 'Occult Investigation',
  Sciences = 'Sciences',
  Subterfuge = 'Subterfuge',
}

export type SkillValue = number | 'N/A' | 'Special';