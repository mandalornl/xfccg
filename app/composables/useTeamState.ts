import type { CardId } from '~/types/card';
import type { Agent } from '~/types/agent';

export const useTeamState = () => {
  const teamState = useState<Record<CardId, Agent | null>>('team', () => ({}));

  const totalCost = computed<number>(() => (
    Object.entries(teamState.value).reduce((total, [ , card ]) => {
      if (!card) {
        return total;
      }

      return total + card.costInt;
    }, 0)
  ));

  const clearTeam = () => {
    teamState.value = {};
  };

  return {
    teamState,
    totalCost,
    clearTeam,
  };
};
