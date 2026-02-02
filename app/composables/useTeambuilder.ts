import type { CardId } from '~/types/card';
import type { Agent } from '~/types/agent';
import type { Team } from '~/types/team';

export const useTeambuilder = () => {
  const state = useState<Team>('teambuilder', () => ({}));

  const cost = computed<number>(() => (
    Object.entries(state.value).reduce((total, [ , card ]) => {
      if (!card) {
        return total;
      }

      return total + card.costInt;
    }, 0)
  ));

  const clear = () => {
    state.value = {};
  };

  const clone = (): Team => ({
    ...state.value,
  });

  const setAgent = (agent: Agent) => {
    state.value[agent.id] = agent;
  };

  const getAgent = (id: CardId): Agent | null => (
    state.value[id] ?? null
  );

  const hasAgent = (agent: Agent): boolean => getAgent(agent.id) !== null;

  const removeAgent = (agent: Agent) => {
    state.value[agent.id] = null;
  };

  return {
    state,
    cost,
    clear,
    clone,
    getAgent,
    setAgent,
    hasAgent,
    removeAgent,
  };
};
