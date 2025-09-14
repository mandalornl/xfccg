import { BasicSkill, InvestigationSkill } from '~/types/skill';

export const getIconBySkill = (value: InvestigationSkill | BasicSkill | string): string | undefined => ({
  [InvestigationSkill.AlienInvestigation]: 'mdi-alien-outline',
  [InvestigationSkill.Behavioral]: 'mdi-head-cog-outline',
  [InvestigationSkill.Bureaucracy]: 'mdi-bank',
  [InvestigationSkill.Computer]: 'mdi-desktop-classic',
  [InvestigationSkill.CriminalInvestigation]: 'mdi-account-search',
  [InvestigationSkill.EvidenceCollection]: 'mdi-archive-search-outline',
  [InvestigationSkill.Medical]: 'mdi-hospital-box-outline',
  [InvestigationSkill.Observation]: 'mdi-cctv',
  [InvestigationSkill.OccultInvestigation]: 'mdi-pentagram',
  [InvestigationSkill.Sciences]: 'mdi-flask-outline',
  [InvestigationSkill.Subterfuge]: 'mdi-incognito',
  [BasicSkill.LongRangeCombat]: 'mdi-pistol',
  [BasicSkill.CloseRangeCombat]: 'mdi-knife-military',
  [BasicSkill.Health]: 'mdi-heart-pulse',
  [BasicSkill.Resources]: 'mdi-piggy-bank',
}[value]);