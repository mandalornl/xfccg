<script setup lang="ts">
import type { SubmitEventPromise } from 'vuetify';
import type { VForm } from 'vuetify/components';

import { readFileAsText } from '~/utils/file';

const supabase = useSupabaseClient();
const snackbarState = useSnackbarState();

const isOpen = ref<boolean>(false);
const formRef = useTemplateRef<VForm>('form');
const isValidForm = ref<boolean>(true);
const isImporting = ref<boolean>(false);
const file = ref<File>();

watch(isOpen, (value) => {
  if (value) {
    return;
  }

  file.value = undefined;

  formRef.value?.resetValidation();
});

const importDeck = async (event: SubmitEventPromise) => {
  snackbarState.reset();

  const { valid } = await event;

  if (!valid) {
    return;
  }

  isImporting.value = true;

  try {
    const json = await readFileAsText(file.value as File);
    const data = JSON.parse(json);

    const {
      data:deck,
      error,
    } = await supabase
      .from('decks')
      .insert({
        title: data.name,
        card_ids: data.cards,
      })
      .select()
      .single();

    if (error) {
      snackbarState.error('An error occurred importing the deck.');
    } else {
      snackbarState.success('Your deck has been imported.');

      await navigateTo({
        name: 'my-decks-id',
        params: {
          id: deck.id,
        },
      });
    }
  } catch (error) {
    useDebug(error);

    snackbarState.error('An error occurred importing the deck.');
  }

  setTimeout(() => {
    isImporting.value = false;
  }, 200);
};
</script>

<template>
  <v-dialog
    v-model="isOpen"
    persistent
    width="500"
  >
    <template #activator="{ props }">
      <v-btn
        variant="flat"
        color="primary"
        text="Import Deck"
        v-bind="props"
      />
    </template>
    <v-form
      ref="form"
      v-model="isValidForm"
      validate-on="lazy"
      @submit.prevent="importDeck"
    >
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          Import Deck
          <v-btn
            v-tooltip:top="'Close'"
            :disabled="isImporting"
            variant="text"
            size="small"
            icon="mdi-close"
          />
        </v-card-title>
        <v-card-text class="text-body-1">
          <v-file-input
            v-model="file"
            :rules="[
              (v) => !!v || 'Select a file',
              (v) => v.type === 'application/json' || 'Select a JSON file'
            ]"
            required
            accept="application/json"
            label="File"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="isImporting"
            variant="text"
            text="Cancel"
            @click="isOpen = false"
          />
          <v-btn
            :disabled="isValidForm === false"
            :loading="isImporting"
            variant="flat"
            color="primary"
            text="Import"
            type="submit"
          />
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
