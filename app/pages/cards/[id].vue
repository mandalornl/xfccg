<script lang="ts" setup>
import { useDisplay } from 'vuetify';

import type { Card } from '~/types/card';
import { pool } from '~/assets/cards/pool';

const route = useRoute();
const { smAndDown } = useDisplay();

const card = computed<Card | undefined>(() => {
  if (!route.params.id) {
    return undefined;
  }

  return pool.find((card) => card.id === route.params.id);
});

const emit = defineEmits([
  'click:filter',
]);

const onClick = (key: string) => (value: string) => {
  emit('click:filter', {
    key,
    value,
  });
};
</script>

<template>
  <v-dialog
    :model-value="route.name === 'cards-id'"
    :fullscreen="smAndDown"
    scrollable
    width="768"
    scrim="black"
    @update:model-value="(value) => !value && navigateTo('/cards')"
  >
    <v-card>
      <v-card-item>
        <v-card-title class="d-flex align-center justify-space-between">
          {{ card?.title }}
          <v-btn
            exact
            to="/cards"
            variant="text"
            icon="mdi-close"
            size="small"
            title="Close"
          />
        </v-card-title>
        <v-card-subtitle>
          {{ card?.id }}
        </v-card-subtitle>
      </v-card-item>
      <v-card-text class="text-body-1">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            class="order-sm-1"
          >
            <card-image
              :card="card"
              class="mb-4"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <card-text
              v-if="card?.set"
              :text="card.set"
              title="Set"
              class="mb-3"
            />
            <div
              v-if="card?.type"
              class="mb-3"
            >
              <div class="font-weight-medium">
                Type
              </div>
              <card-type :text="card.type" />
            </div>
            <card-text
              v-if="card?.cost"
              :text="card.cost"
              title="Cost"
              class="mb-3"
            />
            <card-text
              v-if="card?.prerequisite"
              :text="card.prerequisite"
              title="Prerequisite"
              class="mb-3"
            />
            <card-text
              v-if="card?.question"
              :text="card.question"
              title="Question"
              class="mb-3"
            />
            <card-text
              v-if="card?.gameEffect"
              :text="card.gameEffect"
              title="Game Effect"
              class="mb-3"
            />
            <card-table
              v-if="card?.skills"
              :value="card.skills"
              title="Skills"
              class="mb-3"
            />
            <card-table
              v-if="card?.characteristics"
              :value="card.characteristics"
              title="Characteristics"
              class="mb-3"
            />
            <card-chips
              v-if="card?.keywords?.length"
              :value="card.keywords"
              title="Keywords"
              class="mb-3"
              @click="onClick('keywords')($event)"
            />
            <card-chips
              v-if="card?.activators?.length"
              :value="card.activators"
              title="Activators"
              class="mb-3"
              @click="onClick('activators')($event)"
            />
            <card-text
              v-if="card?.bio"
              :text="card.bio"
              title="Biographical Information"
              class="mb-3"
            />
            <card-text
              v-if="card?.dialogue"
              :text="card.dialogue"
              title="Dialogue"
              class="mb-3"
            />
            <card-text
              v-if="card?.rarity"
              :text="card.rarity"
              title="Rarity"
              class="mb-3"
            />
            <card-text
              v-if="card?.episode"
              :text="card.episode"
              title="Episode"
              class="mb-3"
            />
            <card-text
              v-if="card?.foundIn"
              :text="card.foundIn"
              title="Found In"
              class="mb-3"
            />
            <card-chips
              v-if="card?.tags?.length"
              :value="card.tags"
              title="Tags"
              class="mb-3"
              @click="onClick('tags')($event)"
            />
            <card-text
              v-if="card?.createdBy"
              :text="card.createdBy"
              title="Created By"
              class="mb-3"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>