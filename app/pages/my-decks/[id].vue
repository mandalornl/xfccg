<script setup lang="ts">
import type { SubmitEventPromise } from 'vuetify';
import { useDisplay } from 'vuetify';

import type { Deck } from '~/types/deck';

const route = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const snackbar = useSnackbar();
const deckbuilder = useDeckbuilder();
const { xs } = useDisplay();

useHead({
  title: 'My Deck',
});

const defaultItem = (): Deck => ({
  id: '',
  title: '',
  description: '',
  card_ids: {},
  public: false,
  created_at: '',
  user_id: '',
  tags: [],
});

const deck = ref<Deck>(defaultItem());
const isValidForm = ref<boolean>(true);
const isSaving = ref<boolean>(false);
const isCloning = ref<boolean>(false);
const isDeleting = ref<boolean>(false);
const shareable = ref<boolean>(false);

const {
  data,
  status,
} = useAsyncData<{
  deck: Deck | null;
}>(() => `my-decks:${route.params.id}`, async () => {
  const { data:deck } = await supabase
    .from('decks')
    .select()
    .eq('id', route.params.id as string)
    .maybeSingle()
    .overrideTypes<Deck, { merge: false }>();

  if (deck && deck.user_id !== user.value?.sub) {
    return {
      deck: null,
    };
  }

  return {
    deck,
  };
}, {
  deep: false,
  default: () => ({
    deck: defaultItem(),
  }),
});

watchEffect(() => {
  if (!data.value.deck) {
    throw createError({
      status: 404,
      message: 'Deck not found',
      fatal: true,
    });
  }

  deck.value = { ...data.value.deck };
  shareable.value = !!data.value.deck?.public;
});

const saveDeck = async (event: SubmitEventPromise) => {
  snackbar.reset();

  const { valid } = await event;

  if (!valid) {
    return;
  }

  isSaving.value = true;

  const { error } = await supabase
    .from('decks')
    .update({
      title: deck.value.title,
      description: deck.value.description,
      tags: deck.value.tags,
      public: deck.value.public,
    })
    .eq('id', deck.value.id);

  if (error) {
    useDebug(error);

    snackbar.error('An error occurred saving your deck.');
  } else {
    shareable.value = deck.value.public;

    snackbar.success('Your deck has been saved.');
  }

  setTimeout(() => {
    isSaving.value = false;
  }, 200);
};

const openInCards = () => {
  if (
    deckbuilder.size.value > 0
    && !confirm('It looks like you\'re already working on another deck. Do you want to continue and open this one?\nAny unsaved changes will be lost.')
  ) {
    return;
  }

  deckbuilder.update(deck.value);

  return navigateTo('/cards');
};

const cloneDeck = async () => {
  snackbar.reset();

  isCloning.value = true;

  const {
    data:newDeck,
    error,
  } = await supabase
    .from('decks')
    .insert({
      title: `${deck.value.title.replace(' (clone)', '')} (clone)`,
      tags: deck.value.tags,
      card_ids: deck.value.card_ids,
    })
    .select()
    .single();

  if (error) {
    useDebug(error);

    snackbar.error('An error occurred cloning your deck.');
  } else {
    snackbar.success('Your deck has been cloned.');

    await navigateTo({
      name: 'my-decks-id',
      params: {
        id: newDeck.id,
      },
    });
  }

  setTimeout(() => {
    isCloning.value = false;
  }, 200);
};

const deleteDeck = async () => {
  snackbar.reset();

  if (!confirm('Are you sure you want to delete this deck?\nThis action cannot be undone.')) {
    return;
  }

  isDeleting.value = true;

  const { error } = await supabase
    .from('decks')
    .delete()
    .eq('id', deck.value.id);

  if (error) {
    useDebug(error);

    snackbar.error('An error occurred deleting your deck.');
  } else {
    snackbar.success('Your deck has been deleted.');

    await navigateTo('/my-decks', {
      replace: true,
    });
  }

  setTimeout(() => {
    isDeleting.value = false;
  }, 200);
};
</script>

<template>
  <layout-content size="medium">
    <v-skeleton-loader
      :loading="status === 'pending'"
      type="article,actions"
    >
      <v-form
        v-if="status !== 'pending'"
        v-model="isValidForm"
        validate-on="lazy"
        class="mb-8"
        @submit.prevent="saveDeck"
      >
        <v-card variant="flat">
          <v-card-item>
            <v-card-title>
              <v-btn
                v-tooltip:top="'Back'"
                to="/my-decks"
                variant="text"
                size="small"
                icon="mdi-chevron-left"
              />
              {{ data.deck?.title || 'Untitled' }}
            </v-card-title>
            <v-card-subtitle>
              <copy-link
                v-if="shareable"
                :to="{ name: 'decklists', query: { id: deck.id } }"
              >
                {{ deck.id }}
              </copy-link>
              <template v-else>
                {{ deck.id }}
              </template>
            </v-card-subtitle>
          </v-card-item>
          <v-card-text class="text-body-1">
            <input-string
              v-model="deck.title"
              :rules="[ (v) => !!v || 'Enter a title' ]"
              label="Title"
            />
            <input-markdown
              v-model="deck.description"
              auto-grow
              counter="1000"
              label="Description"
            />
            <deck-tags v-model="deck.tags" />
            <v-switch
              v-model="deck.public"
              hide-details
              label="Public"
            />
          </v-card-text>
          <v-card-actions class="flex-column flex-sm-row">
            <v-spacer />
            <v-btn
              :disabled="isSaving || isCloning"
              :loading="isDeleting"
              :block="xs"
              variant="flat"
              color="red"
              text="Delete"
              @click="deleteDeck"
            />
            <v-btn
              :disabled="isSaving || isDeleting"
              :loading="isCloning"
              :block="xs"
              variant="flat"
              color="amber"
              text="Clone"
              @click="cloneDeck"
            />
            <v-btn
              :block="xs"
              variant="flat"
              color="light-blue"
              text="Open in Cards"
              @click="openInCards"
            />
            <v-btn
              :disabled="isValidForm === false || isCloning || isDeleting"
              :loading="isSaving"
              :block="xs"
              variant="flat"
              color="primary"
              text="Save"
              type="submit"
            />
          </v-card-actions>
        </v-card>
      </v-form>
      <v-card variant="flat">
        <v-card-text class="text-body-1">
          <deck-view :card-ids="deck.card_ids" />
        </v-card-text>
      </v-card>
    </v-skeleton-loader>
  </layout-content>
</template>
