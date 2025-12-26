<script setup lang="ts">
import type { VForm } from 'vuetify/components';
import type { SubmitEventPromise } from 'vuetify/framework';

import { InvestigationSkill } from '~/types/skill';
import type { Deck } from '~/types/deck';

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const {
  deckState,
  setDeck,
  clearDeck,
} = useDeckState();
const snackbarState = useSnackbarState();

const isOpen = defineModel<boolean>({
  default: false,
});

const isValidForm = ref<boolean>(true);
const isSaving = ref<boolean>(false);
const formRef = useTemplateRef<VForm>('form');
const deck = ref<Deck>({ ...deckState.value });

const tags: string[] = Object.values(InvestigationSkill);

const saveDeck = async (event: SubmitEventPromise) => {
  snackbarState.reset();

  const { valid } = await event;

  if (!valid) {
    return;
  }

  isSaving.value = true;

  const {
    data,
    error,
  } = await supabase.rpc('upsert_deck', {
    p_id: user.value?.sub === deck.value.user_id ? deck.value.id : '',
    p_title: deck.value.title,
    p_card_ids: deck.value.card_ids,
    p_tags: deck.value.tags,
    p_public: deck.value.public,
  });

  if (error) {
    useDebug(error);

    snackbarState.error('An error occurred saving your deck.');
  } else {
    snackbarState.success('Your deck has been saved.');

    if (data.id !== deck.value.id) {
      clearDeck();

      return navigateTo({
        name: 'my-decks-id',
        params: {
          id: data.id,
        },
      }, {
        replace: true,
      });
    }

    setDeck(data as Deck);

    isOpen.value = false;
  }

  setTimeout(() => {
    isSaving.value = false;
  }, 200);
};

watch(isOpen, (value) => {
  if (value) {
    return;
  }

  deck.value = { ...deckState.value };

  formRef.value?.resetValidation();
});

watch(deckState, (value) => {
  deck.value = { ...value };
});
</script>
<template>
  <v-dialog
    v-model="isOpen"
    persistent
    width="500"
  >
    <v-form
      ref="form"
      v-model="isValidForm"
      validate-on="lazy"
      @submit.prevent="saveDeck"
    >
      <v-card>
        <v-card-item>
          <v-card-title class="d-flex align-center justify-space-between">
            Save Deck
            <v-btn
              v-tooltip:top="'Close'"
              :disabled="isSaving"
              variant="text"
              size="small"
              icon="mdi-close"
              @click="isOpen = false"
            />
          </v-card-title>
          <v-card-subtitle v-if="user?.sub === deck.user_id">
            <nuxt-link :to="{ name: 'my-decks-id', params: { id: deck.id } }">
              {{ deck.id }}
            </nuxt-link>
          </v-card-subtitle>
        </v-card-item>
        <v-card-text class="text-body-1">
          <input-string
            v-model="deck.title"
            :rules="[ (v) => !!v || 'Enter the title' ]"
            label="Title"
          />
          <v-select
            v-model="deck.tags"
            :items="tags"
            multiple
            chips
            closable-chips
            label="Tags"
          />
          <v-switch
            v-model="deck.public"
            hide-details
            label="Public"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="isSaving"
            variant="text"
            text="Cancel"
            @click="isOpen = false"
          />
          <v-btn
            :disabled="isValidForm === false"
            :loading="isSaving"
            :text="deck.user_id && deck.user_id !== user?.sub ? 'Save as Copy' : 'Save'"
            variant="flat"
            color="primary"
            type="submit"
          />
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
