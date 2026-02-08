<script setup lang="ts">
import {
  useEditor,
  EditorContent,
  type EditorEvents,
} from '@tiptap/vue-3';
import { StarterKit } from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';
import { CharacterCount } from '@tiptap/extension-character-count';
import { Link } from '@tiptap/extension-link';
import type {
  ValidationRule,
  SubmitEventPromise,
} from 'vuetify/framework';

const props = withDefaults(defineProps<{
  label?: string;
  disabled?: boolean;
  rules?: ValidationRule[];
  autoGrow?: boolean;
  rows?: number | string;
  maxRows?: number | string;
  counter?: number | string;
}>(), {
  label: undefined,
  rules: () => ([]),
  rows: 5,
  maxRows: undefined,
  counter: undefined,
});

const model = defineModel<string | null>({
  default: null,
});

const limit = computed<number>(() => Number(props.counter || Infinity));

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      link: false,
    }),
    Markdown,
    CharacterCount.configure({
      limit: limit.value,
    }),
    Link.configure({
      autolink: false,
      openOnClick: false,
      linkOnPaste: false
    }),
  ],
  editable: !props.disabled,
  content: model.value,
  contentType: 'markdown',
  onUpdate: (event: EditorEvents['update']) => {
    model.value = !event.editor.isEmpty ? event.editor.getMarkdown() : null;
  },
  onFocus: () => {
    isFocused.value = true;
  },
  onBlur: () => {
    isFocused.value = false;
  },
});

watch(model, (value) => {
  if ((!value && editor.value?.isEmpty) || value === editor.value?.getMarkdown()) {
    return;
  }

  editor.value?.commands.setContent(value, {
    contentType: 'markdown',
  });
});

watch(() => props.disabled, (value) => {
  editor.value?.setEditable(value);
});

const isFocused = ref(false);

const characterCount = computed<number>(() => editor.value?.storage.characterCount.characters() || 0);

const calculateHeight = () => {
  const div = editor.value?.view.dom;

  if (!div) {
    return;
  }

  const content = div.innerHTML;

  div.style.removeProperty('min-height');
  div.style.removeProperty('max-height');
  div.style.height = '0';
  div.innerHTML = '<p style="margin: 0 !important">&nbsp;</p>';

  const minHeight = div.scrollHeight * Number(props.rows);

  if (props.autoGrow && props.maxRows) {
    const maxHeight = div.scrollHeight * Number(props.maxRows);

    div.style.maxHeight = `${maxHeight}px`;
  }

  div.innerHTML = content;

  if (props.autoGrow) {
    div.style.minHeight = `${minHeight}px`;
    div.style.removeProperty('height');
  } else {
    div.style.height = `${minHeight}px`;
  }
};

watch(() => props.autoGrow, () => nextTick(calculateHeight));
watch(() => props.rows, () => nextTick(calculateHeight));
watch(() => props.maxRows, () => nextTick(calculateHeight));

const onIntersect = (isIntersecting: boolean) => {
  if (!isIntersecting) {
    return;
  }

  nextTick(calculateHeight);
};

onBeforeUnmount(() => {
  editor.value?.destroy();
});

const dialog = ref<boolean>(false);
const isValidForm = ref<boolean>(true);
const link = ref<{
  href: string;
  target: '_blank' | '_self';
}>({
  href: '',
  target: '_blank',
});

watch(dialog, (value) => {
  if (!value || !editor.value) {
    link.value = {
      href: '',
      target: '_blank',
    };

    return;
  }

  const {
    href,
    target = '_blank',
  } = editor.value.getAttributes('link');

  link.value = {
    href,
    target,
  };
});

const editLink = async (event: SubmitEventPromise) => {
  const { valid } = await event;

  if (!valid) {
    return;
  }

  if (link.value.href) {
    editor.value?.chain().setLink(link.value).focus().run();
  } else {
    editor.value?.chain().unsetLink().focus().run();
  }

  dialog.value = false;
};
</script>

<template>
  <v-input
    v-model="model"
    v-intersect.once="onIntersect"
    :label="label"
    :disabled="disabled"
    :rules="!disabled ? rules : []"
    :required="rules.length > 0"
    :focused="isFocused"
  >
    <template #default="{ id, isDirty, isPristine, isValid }">
      <div class="d-flex flex-column flex-grow-1">
        <v-toolbar class="pa-2 rounded-t">
          <v-btn-group
            variant="text"
            density="comfortable"
          >
            <v-btn
              v-tooltip:top="'Bold'"
              :active="!!editor?.isActive('bold')"
              icon="mdi-format-bold"
              @click="editor?.chain().focus().toggleBold().run()"
            />
            <v-btn
              v-tooltip:top="'Italic'"
              :active="!!editor?.isActive('italic')"
              icon="mdi-format-italic"
              @click="editor?.chain().focus().toggleItalic().run()"
            />
            <v-btn
              v-tooltip:top="'Underline'"
              :active="!!editor?.isActive('underline')"
              icon="mdi-format-underline"
              @click="editor?.chain().focus().toggleUnderline().run()"
            />
          </v-btn-group>
          <v-divider
            vertical
            class="mx-2"
          />
          <v-btn-group
            variant="text"
            density="comfortable"
          >
            <v-btn
              v-tooltip:top="'Undo'"
              :disabled="!editor?.can?.()?.undo()"
              :active="!!editor?.isActive('undo')"
              icon="mdi-undo"
              @click="editor?.chain().focus().undo().run()"
            />
            <v-btn
              v-tooltip:top="'Redo'"
              :disabled="!editor?.can?.()?.redo()"
              :active="!!editor?.isActive('redo')"
              icon="mdi-redo"
              @click="editor?.chain().focus().redo().run()"
            />
          </v-btn-group>
          <v-divider
            vertical
            class="mx-2"
          />
          <v-dialog
            v-model="dialog"
            persist
            width="500"
          >
            <template #activator="{ props:dialogProps }">
              <v-btn
                v-tooltip:top="'Link'"
                :disabled="!!editor?.state?.selection?.empty"
                :active="editor?.isActive('link')"
                rounded
                variant="text"
                density="comfortable"
                icon="mdi-link-variant"
                v-bind="dialogProps"
              />
            </template>
            <v-form
              v-model="isValidForm"
              validate-on="lazy"
              @submit.prevent="editLink"
            >
              <v-card>
                <v-card-title class="d-flex align-center justify-space-between">
                  Link
                  <v-btn
                    v-tooltip:top="'Close'"
                    variant="text"
                    size="small"
                    icon="mdi-close"
                    @click="dialog = false"
                  />
                </v-card-title>
                <v-card-text class="text-body-1">
                  <v-text-field
                    v-model.trim="link.href"
                    :rules="[ (v) => !v || v.includes('://') || 'Enter a valid url' ]"
                    autofocus
                    clearable
                    autocomplete="off"
                    placeholder="https://"
                    label="Url"
                  />
                  <v-switch
                    v-model="link.target"
                    hide-details
                    false-value="_self"
                    true-value="_blank"
                    label="Open in new tab"
                  />
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    :disabled="isValidForm === false"
                    variant="flat"
                    color="primary"
                    type="submit"
                  >
                    Ok
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-toolbar>
        <v-field
          :id="id.value"
          v-slot="{ props:fieldProps }"
          :label="label"
          :dirty="isDirty.value"
          :error="!isPristine.value && !isValid.value"
          :center-affix="false"
          :focused="isFocused"
          :active="isFocused"
          class="rounded-t-0"
        >
          <editor-content
            :id="undefined"
            :editor="editor"
            v-bind="fieldProps"
          />
        </v-field>
      </div>
      <input
        :id="id.value"
        :value="model"
        type="hidden"
      >
    </template>
    <template #details>
      <v-counter
        v-if="limit > 0"
        :active="isFocused"
        :value="characterCount"
        :max="limit"
      />
    </template>
  </v-input>
</template>

<style lang="scss" scoped>
.v-field__input {
  display: flex;

  flex: 1 1 auto;
}

:deep(.v-toolbar__content) {
  height: auto !important;

  padding: 0;

  flex-wrap: wrap;

  .v-divider--vertical {
    height: auto !important;
  }
}

:deep(.ProseMirror) {
  flex: 1 1 auto;

  overflow-y: auto;

  &:focus {
    outline: none;
  }

  &.ProseMirror-focused .is-editor-empty:first-child {
    position: relative;

    &:before {
      content: attr(data-placeholder);

      color: rgba(black, var(--v-disabled-opacity));

      position: absolute;

      pointer-events: none;
    }
  }

  li > p {
    margin-bottom: 0;
  }
}
</style>
