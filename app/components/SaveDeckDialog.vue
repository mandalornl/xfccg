<script setup lang="ts">
import type { VForm } from 'vuetify/components';
import type { SubmitEventPromise } from 'vuetify/framework';

import type { Deck } from '~/types/deck';

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const deckbuilder = useDeckbuilder();
const snackbar = useSnackbar();

const isOpen = defineModel<boolean>({
  default: false,
});

const isValidForm = ref<boolean>(true);
const isSaving = ref<boolean>(false);
const formRef = useTemplateRef<VForm>('form');
const deck = ref<Deck>(deckbuilder.clone());

const saveDeck = async (event: SubmitEventPromise) => {
  snackbar.reset();

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
    p_description: deck.value.description,
    p_card_ids: deck.value.card_ids,
    p_tags: deck.value.tags,
    p_public: deck.value.public,
  });

  if (error) {
    useDebug(error);

    snackbar.error('An error occurred saving your deck.');
  } else {
    snackbar.success('Your deck has been saved.');

    if (data.id !== deck.value.id) {
      deckbuilder.clear();

      return navigateTo({
        name: 'my-decks-id',
        params: {
          id: data.id,
        },
      }, {
        replace: true,
      });
    }

    deckbuilder.update(data as Deck);

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

  deck.value = deckbuilder.clone();

  formRef.value?.resetValidation();
});

watch(deckbuilder.state, (value) => {
  deck.value = { ...value };
});
</script>
<template>
  <v-dialog
    v-model="isOpen"
    persistent
    width="600"
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
          <v-textarea
            v-model.trim="deck.description"
            no-resize
            auto-grow
            label="Description"
            counter="600"
            maxlength="600"
          />
          <deck-tags v-model="deck.tags" />
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
