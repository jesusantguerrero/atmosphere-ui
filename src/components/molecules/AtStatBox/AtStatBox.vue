<template>
  <div class="statistics-box kanvas-scroller">
    <div class="statistics-box__header">
      <div class="statistics-box__date">
        {{ selectedMonth }}
      </div>
      <div class="statistics-box__date-selector">
        <DateRangePicker v-model="localDates" :range-mode="true" />
      </div>
    </div>
    <div class="statistics-box__content">
      <AtStatItem
        v-for="(stat, index) in stats"
        :key="`stat-${index}`"
        class="pr-5 static-item-local"
        :title="stat.title"
        :content="stat.content"
        :status="stat.status"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { format, parseISO } from "date-fns";
import { computed, ref, watch } from "vue";
import AtStatItem from "~molecules/AtStatItem/AtStatItem.vue";

interface IStatItem {
  title: string;
  content: string;
  status: string;
}

const props = defineProps<{
  stats: IStatItem[];
  dates: {
    start: string | Date;
    end: string | Date;
  };
}>();

const emit = defineEmits(["update:dates"]);

const localDates = ref<{
  first: string | Date;
  last: string | Date;
}>({
  first: "",
  last: "",
});

const selectedMonth = computed(() => {
  const date =
    typeof localDates.value.last == "string"
      ? parseISO(localDates.value.last)
      : new Date();
  return format(date, "MMM, yyyy");
});

watch(
  () => props.dates,
  (dates) => {
    localDates.value.first = dates.start;
    localDates.value.last = dates.end;
  },
  {
    immediate: true,
    deep: true,
  }
);

watch(
  localDates,
  () => {
    emit("update:dates", localDates.value);
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="scss">
.statistics-box {
  background: #3b566e;
  color: white;
  border-radius: 8px;
  padding: 1.5rem 2.5rem 3.7rem 2.5rem;
  overflow-x: auto;

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  &__date,
  &__date-selector {
    font-weight: 600;
  }

  &__content {
    display: flex;
  }
}

.static-item-local {
  position: relative;
  margin-right: 5%;
  &:first-child::after {
    position: absolute;
    background: white;
    width: 1px;
    height: 60%;
    content: "";
    top: 20%;
    right: 4rem;
  }
}
</style>
