<template>
  <table
    class="table-fixed"
    style="width: 100%"
    :data="tableData"
    :header-cell-class-name="getHeaderClass"
    @sort-change="$emit('sort', $event)"
    @row-click="$emit('row-click', $event)"
  >
    <thead>
      <tr
        class="px-2 py-4 font-bold text-left border-b border-gray-200 text-body"
      >
        <th
          v-for="col in cols"
          :key="col.name"
          class="px-2 py-4"
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
        class="text-body"
        :class="{ 'bg-base-lvl-2': index % 2 }"
      >
        <td
          v-for="col in cols"
          :key="col.name"
          class="h-full align-baseline"
          :style="{ width: col.width, maxWidth: col.maxWidth }"
        >
          <div
            class="flex flex-col w-full h-full px-2 py-1 text-left"
            :class="col.class"
          >
            <slot
              :name="col.name"
              v-bind:scope="{
                row: data,
                value: data[col.name],
                col,
                field: col.name,
                $index: index,
              }"
            >
              <div v-if="col.type == 'calc'" :class="col.class">
                {{ col.formula(data) }}
              </div>

              <div v-else-if="col.type == 'money'" :class="col.class">
                {{ formatMoney(data[col.name], data[col.currency_prop]) }}
              </div>

              <CustomCell
                v-else-if="col.render"
                :class="col.class"
                :col="col"
                :data="data"
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
      <tr v-if="showAppend">
        <td :colspan="cols.length">
          <slot name="append" />
        </td>
      </tr>
      <tr>
        <td :colspan="cols.length" class="flex flex-col w-full">
          <slot name="empty" v-if="!hideEmptyText">
            <div class="w-full py-5 text-center text-base-200">
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

<script setup>
import formatMoney from "~utils/formatMoney";
import CustomCell from "./customCell.js";

defineProps({
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
  showAppend: {
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
});

const getHeaderClass = ({ row }) => {
  return row.headerClass;
};
</script>
