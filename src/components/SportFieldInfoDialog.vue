<template>
  <Dialog v-model:visible="visible" modal :header="!isEditing ? props.sportField.name : 'Edit SportField'"
    :style="{ width: '25rem' }">
    <template v-if="isEditing">
      <div class="formItem">
        <input id="name" v-model="editedSportField.name" />
      </div>
      <div class="formItem">
        <textarea id="description" v-model="editedSportField.description">
        {{ editedSportField.description }}
      </textarea>
      </div>
    </template>
    <template v-else>
      <span class="p-text-secondary block mb-5">
        {{ props.sportField.description }}
      </span>
    </template>


    <template #footer>
      <Button icon="pi pi-pencil" outlined @click="toggleEditMode()"></Button>
      <Button label="Cancel" text @click="closeDialog()"></Button>
      <Button label="Reservieren" outlined @click="reserve()" autofocus v-if="!isEditing"></Button>
      <Button label="Speichern" outlined @click="save()" autofocus v-if="isEditing"></Button>
    </template>


  </Dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { SportField } from '@/types/Map';
import { useRouter } from 'vue-router';
import { useSportFieldProposalStore } from '@/stores/SportFieldProposalStore.ts';
import { PostSportFieldProposal } from '@/types/Proposal';

const router = useRouter();
const sportFieldProposalStore = useSportFieldProposalStore();

const visible = defineModel('visible', { default: false });

const props = defineProps<{
  sportField: SportField;
}>();

const editedSportField = reactive({ ...props.sportField });

watch(() => props.sportField, (otherSportField: SportField) => {
  Object.assign(editedSportField, otherSportField);
});

const isEditing = ref(false);

watch(visible, (dialogOpened: boolean) => {
  if (dialogOpened) {
    isEditing.value = false;
  }
});

const closeDialog = () => {
  visible.value = false;
};

const reserve = async () => {
  visible.value = false;
  await router.push({ name: 'Reserve', params: { id: props.sportField.id } });
};

const save = async () => {
  
  const sportFieldProposal: PostSportFieldProposal = {
    sportFieldName: editedSportField.name,
    sportFieldDescription: editedSportField.description,
    sportFieldLongitude: editedSportField.longitude,
    sportFieldLatitude: editedSportField.latitude,
    sportFieldAddress: editedSportField.address.value?.display_name,
    //sportFieldFile: file.value, //TODO add again after backend accepts files
  };

  try {
    console.log(sportFieldProposal)
    await sportFieldProposalStore.createSportFieldProposal(sportFieldProposal);
    closeDialog();
  } catch (e: any) {
    console.error(e);
  }
};

const toggleEditMode = () => {
  isEditing.value = !isEditing.value;
};
</script>

<style lang="scss" scoped>
.formItem {
  @apply flex justify-between items-center mb-3 px-4 py-3 border border-primaryRed rounded;
}

input {
  @apply w-full;
}
textarea {
  @apply w-full min-h-44;
}
</style>
