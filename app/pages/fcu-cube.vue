<script setup lang="ts">
import cards from '~/assets/fcu-cube/cards.json';
import {
  type CardInCube,
  CardSet,
  CardType,
} from '~/types/card';
import { shuffle } from '~/utils/shuffle';

const pool = await usePool([
  CardSet.Premiere,
  CardSet.BirthdayMulder,
]);

useHead({
  title: 'FCU Cube',
});

const cube: CardInCube[] = Object.values(cards).flatMap((ids) => (
  Object.entries(ids).flatMap(([
    id,
    length,
  ]) => {
    const card = pool.find((card) => card.id === id)!;

    return Array.from({ length }, () => ({
      ...card,
      uuid: crypto.randomUUID(),
    }));
  })
));

const activeTab = ref<number>(0);
const isLoading = ref<boolean>(false);
const selectedCard = ref<CardInCube>();

const players = ref<[ CardInCube[], CardInCube[] ]>([ [], [] ]);

const hasDrawnCards = computed<boolean>(() => {
  const [
    playerOneCards,
    playerTwoCards,
  ] = players.value;

  return playerOneCards.length > 0 && playerTwoCards.length > 0;
});

const sortBy = useSortBy<CardInCube>([
  {
    key: 'type',
    order: 'asc',
  },
  {
    key: 'id',
    order: 'asc',
  },
]);

const getCards = (types: CardType[], size: number): [ CardInCube[], CardInCube[] ] => {
  const cards = shuffle<CardInCube[]>(cube.filter((card) => types.includes(card.type)));

  return [
    cards
      .slice(0, size)
      .sort(sortBy),
    cards
      .slice(size, size * 2)
      .sort(sortBy),
  ];
};

const drawCards = () => {
  isLoading.value = true;

  const [
    playerOneAgents,
    playerTwoAgents,
  ] = getCards([
    CardType.Agent,
  ], 8);

  const [
    playerOneCards,
    playerTwoCards,
  ] = getCards([
    CardType.Adversary,
    CardType.Combat,
    CardType.Event,
    CardType.Bluff,
    CardType.Site,
    CardType.Witness,
    CardType.Equipment,
  ], 120);

  players.value = [
    [
      ...playerOneAgents,
      ...playerOneCards,
    ],
    [
      ...playerTwoAgents,
      ...playerTwoCards,
    ],
  ];

  setTimeout(() => {
    isLoading.value = false;
  }, 200);
};
</script>

<template>
  <layout-content title="FCU Cube">
    <h2>Introduction</h2>
    <p>The X-Files CCG 'FCU' (Fixed, Common & Uncommon) Cube is a card set designed to replicate the feeling of deck construction by booster pack or sealed deck opening without the need for such products.</p>
    <p>The card list for this cube includes only common, uncommon and fixed cards from the Premiere/The Truth is Out There and 101361 editions, with the aim that this will make creating the card pool it uses possible for the widest number of collectors, without compromising on interesting gameplay.</p>
    <h2>Sealed Play</h2>
    <p>If you plan to use this cube for games by webcam then Sealed Play is the instruction set that you will use. Sealed instructions are also the ones to use if you're playing 2-player in- person.</p>
    <p>For sealed play, first shuffle all the agents from the card list together. Deal 8 to each player present. These are the agents you will pick from to create your team.</p>
    <p>After agents have been dealt, shuffle all non-agent cards together, then deal 120 cards to each player present. The cards you are dealt will be used to construct your bureau deck.</p>
    <p>Deck construction and gameplay then proceeds as described in the official rules.</p>
    <p data-v-485b0d60="" class="text-right text-caption">
      Special thanks to Alastair 'TheJauntyGoblin' Headden
      <v-icon
        icon="mdi-cube-outline"
        color="primary"
      />
    </p>
    <v-btn
      :loading="isLoading"
      variant="flat"
      color="primary"
      text="Draw Cards"
      class="mb-4"
      @click="drawCards"
    />
    <template v-if="hasDrawnCards">
      <v-tabs
        v-model="activeTab"
        color="primary"
      >
        <v-tab
          v-for="(_playerCards, index) of players"
          :key="`tab-${index}`"
          :value="index"
          :text="`Player ${index + 1}`"
        />
      </v-tabs>
      <v-tabs-window v-model="activeTab">
        <v-tabs-window-item
          v-for="(playerCards, index) of players"
          :key="`item-${index}`"
          :value="index"
        >
          <v-data-iterator
            :items="playerCards"
            items-per-page="-1"
            class="bg-grey-darken-4"
          >
            <template #default="{ items }">
              <v-row no-gutters>
                <v-col
                  v-for="item of items"
                  :key="item.raw.uuid"
                  cols="6"
                  sm="4"
                  md="3"
                  lg="2"
                >
                  <v-card
                    variant="flat"
                    @click="selectedCard = { ...item.raw }"
                  >
                    <v-card-item>
                      <v-card-title>
                        {{ item.raw.title }}
                      </v-card-title>
                      <v-card-subtitle>
                        {{ item.raw.id }}
                      </v-card-subtitle>
                    </v-card-item>
                    <v-card-text>
                      <card-image :card="item.raw" />
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-tabs-window-item>
      </v-tabs-window>
      <card-dialog v-model="selectedCard" />
    </template>
  </layout-content>
</template>
