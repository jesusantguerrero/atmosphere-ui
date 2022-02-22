<template>
  <table
    v-loading="isLoading"
    stripe
    class="table-fixed"
    style="width: 100%"
    :data="tableData"
    :header-cell-class-name="getHeaderClass"
    @sort-change="$emit('sort', $event)"
    @row-click="$emit('row-click', $event)"
  >
    <thead>
      <tr
        class="px-2 py-4 font-bold text-left text-gray-400 bg-white border-b border-gray-200"
      >
        <th
          v-for="col in cols"
          :key="col.name"
          class="py-4"
          :class="[col.headerClass]"
        >
          {{ col.label }}
        </th>
      </tr>
    </thead>

    <tbody v-if="tableData.length">
      <tr v-if="showPrepend">
        <td :colspan="cols.length">
          <slot name="prepend"> </slot>
        </td>
      </tr>
      <tr
        v-for="(data, index) in tableData"
        :key="`data-row-${index}`"
        class="bg-white"
        :class="{ 'bg-gray-50': index % 2 }"
      >
        <td
          v-for="col in cols"
          :key="col.name"
          class="h-full"
          :style="{ width: col.width, maxWidth: col.maxWidth }"
        >
          <div class="w-full h-full px-2 py-1 text-left" :class="col.class">
            <slot
              :name="col.name"
              v-bind:scope="{
                row: data,
                value: data[col.name],
                col,
                field: col.name,
              }"
            >
              <div v-if="col.type == 'calc'" :class="col.class">
                {{ col.formula(data) }}
              </div>

              <div v-else-if="col.type == 'money'" :class="col.class">
                {{ formatMoney(data[col.name]) }}
              </div>

              <span
                v-else-if="col.render"
                v-html="col.render(data)"
                :class="col.class"
              />

              <div v-else>
                {{ data[col.name] }}
              </div>
            </slot>
          </div>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr v-if="showPrepend">
        <td :colspan="cols.length">
          <slot name="prepend"> </slot>
        </td>
      </tr>
      <tr>
        <td :colspan="cols.length">
          <slot name="empty" v-if="!hideEmptyText">
            <div class="py-5 text-center text-gray-400 bg-white">
              {{ emptyText }}
            </div>
          </slot>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td :colspan="cols.length">
          <slot name="append"> </slot>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import formatMoney from "@/utils/formatMoney";

export default {
  name: "AtTable",
  props: {
    cols: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Array,
    },
    config: {
      type: Object,
      default() {
        return {};
      },
    },
    showPrepend: {
      type: Boolean,
      default: false,
    },
    emptyText: {
      type: String,
      default: "No data found",
    },
    hideEmptyText: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getHeaderClass({ row }) {
      return row.headerClass;
    },
    formatMoney,
  },
};
</script>

<style lang="scss"></style>
