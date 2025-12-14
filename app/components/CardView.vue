<script setup lang="ts">
import { useDisplay } from 'vuetify';

import type { Card } from '~/types/card';

const { smAndDown } = useDisplay();

const card = defineModel<Card>();
</script>

<template>
  <v-dialog
    :model-value="!!card"
    :fullscreen="smAndDown"
    scrollable
    width="768"
    @update:model-value="(value) => !value && (card = undefined)"
  >
    <v-card>
      <v-card-item>
        <v-card-title class="d-flex align-center justify-space-between">
          {{ card?.title }}
          <v-btn
            v-tooltip:top="'Close'"
            variant="text"
            icon="mdi-close"
            size="small"
            @click="card = undefined"
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
            <card-item
              v-if="card?.set"
              title="Set"
            >
              <card-text :text="card?.set" />
            </card-item>
            <card-item
              v-if="card?.type"
              title="Type"
            >
              <card-type :text="card?.type" />
            </card-item>
            <card-item
              v-if="card?.cost"
              title="Cost"
            >
              <card-text :text="card?.cost" />
            </card-item>
            <card-item
              v-if="card?.prerequisite"
              title="Prerequisite"
            >
              <card-text :text="card?.prerequisite" />
            </card-item>
            <card-item
              v-if="card?.question"
              title="Question"
            >
              <card-text :text="card?.question" />
            </card-item>
            <card-item
              v-if="card?.gameEffect"
              title="Game Effect"
            >
              <card-text :text="card?.gameEffect" />
            </card-item>
            <card-item
              v-if="card?.skills"
              title="Skills"
            >
              <card-table :value="card?.skills" />
            </card-item>
            <card-item
              v-if="card?.characteristics"
              title="Characteristics"
            >
              <card-table :value="card?.characteristics" />
            </card-item>
            <card-item
              v-if="card?.keywords?.length"
              title="Keywords"
            >
              <card-chips :value="card?.keywords" />
            </card-item>
            <card-item
              v-if="card?.activators?.length"
              title="Activators"
            >
              <card-chips :value="card?.activators" />
            </card-item>
            <card-item
              v-if="card?.bio"
              title="Biographical Information"
            >
              <card-text :text="card?.bio" />
            </card-item>
            <card-item
              v-if="card?.dialogue"
              title="Dialogue"
            >
              <card-text :text="card?.dialogue" />
            </card-item>
            <card-item
              v-if="card?.rarity"
              title="Rarity"
            >
              <card-text :text="card?.rarity" />
            </card-item>
            <card-item
              v-if="card?.episode"
              title="Episode"
            >
              <card-text :text="card?.episode" />
            </card-item>
            <card-item
              v-if="card?.foundIn"
              title="Found In"
            >
              <card-text :text="card?.foundIn" />
            </card-item>
            <card-item
              v-if="card?.tags?.length"
              title="Tags"
            >
              <card-chips :value="card?.tags" />
            </card-item>
            <card-item
              v-if="card?.createdBy"
              title="Created By"
            >
              <card-text :text="card?.createdBy" />
            </card-item>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.card-item:not(:last-child) {
  margin-bottom: 12px;
}
</style>
