<script setup lang="ts">
import type { VForm } from 'vuetify/components';
import type { SubmitEventPromise } from 'vuetify/framework';

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const { deckState } = useDeckState();
const snackbarState = useSnackbarState()

const dialog = defineModel<boolean>({
  default: false,
});

const isValidForm = ref<boolean>(true);
const isSubmitting = ref<boolean>(false);
const formRef = useTemplateRef<VForm>('form');

const saveDeck = async (event: SubmitEventPromise) => {
  const { valid } = await event;

  if (!valid) {
    return;
  }

  const {
    data:id,
    error,
  } = await supabase.rpc('upsert_deck', {
    p_id: user.value?.sub === deckState.value.user_id ? deckState.value.id : null,
    p_title: deckState.value.title,
    p_card_ids: deckState.value.card_ids,
    p_public: deckState.value.public,
  });

  if (error) {
    useDebug(error);

    snackbarState.error('An error occurred saving the deck.');
  } else {
    deckState.value.id = id;

    snackbarState.success('Your deck has been saved.');
  }
};

watch(dialog, (value) => {
  if (value) {
    return;
  }

  formRef.value?.resetValidation();
});
</script>
<template>
  <v-dialog
    v-model="dialog"
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
        <v-card-title class="d-flex align-center justify-space-between">
          Save Deck
          <v-btn
            v-tooltip:top="'Close'"
            :disabled="isSubmitting"
            variant="text"
            size="small"
            icon="mdi-close"
            @click="dialog = false"
          />
        </v-card-title>
        <v-card-text class="text-body-1">
          <input-string
            v-model="deckState.title"
            :rules="[ (v) => !!v || 'Enter a name' ]"
            label="Name"
          />
          <v-switch
            v-model="deckState.public"
            hide-details
            label="Public"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="isSubmitting"
            variant="text"
            text="Cancel"
            @click="dialog = false"
          />
          <v-btn
            :disabled="isValidForm === false"
            :loading="isSubmitting"
            variant="flat"
            color="primary"
            text="Save"
            type="submit"
          />
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
