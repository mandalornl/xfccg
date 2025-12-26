<script setup lang="ts">
import type { Decklist } from '~/types/deck';

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const snackbarState = useSnackbarState();

const props = defineProps<{
  deck: Decklist;
}>();

const isLoading = ref<boolean>(false);
const liked = ref<boolean>(false);
const likes = ref<number>(0);

watchEffect(() => {
  liked.value = props.deck.liked ?? false;
  likes.value = props.deck.likes ?? 0;
});

const likeOrUnlike = async () => {
  snackbarState.reset();

  isLoading.value = true;

  const {
    data:newLiked,
    error,
  } = await supabase.rpc('toggle_deck_like', {
    p_id: props.deck.id,
  });

  if (error) {
    useDebug(error);

    snackbarState.error(`An error occurred ${liked.value ? 'unliking' : 'liking'} this deck.`);
  } else {
    liked.value = newLiked;
    likes.value += newLiked ? 1 : -1;
  }

  setTimeout(() => {
    isLoading.value = false;
  });
};
</script>

<template>
  <div class="d-flex align-center">
    <v-btn
      v-tooltip:top="liked ? 'Unlike': 'Like'"
      :disabled="!user || user?.sub === deck.user_id"
      :loading="isLoading"
      :icon="liked ? 'mdi-heart' : 'mdi-heart-outline'"
      variant="text"
      size="small"
      color="primary"
      @click.stop="likeOrUnlike"
    />
    <template v-if="likes > 0">
      {{ likes }}
    </template>
  </div>
</template>
