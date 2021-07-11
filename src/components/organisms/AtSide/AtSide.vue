<template>
  <div class="border app-side">
      <div class="px-5 my-5">
        <slot name="brand">
          <h1>
            {{ title }}
          </h1>
        </slot>
      </div>
    <div
      class="px-5"
      role="tablist"
      aria-orientation="vertical"
    >
      <template v-for="route in menu">
        <AtSideItem
          :icon="route.icon"
          :label="route.label"
          :to="route.to"
          v-if="!route.childs"
          :key="route.label"
        />

        <AtSideItemGroup
          v-else
          v-model="activeGroup"
          :item-class="itemClass"
          :track-id="route.label"
          :icon="route.icon"
          :label="route.label"
          :childs="route.childs"
          :key="route.label"
        />
      </template>
    </div>

    <div class="nav-container">
        <div
          class="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
          v-if="headerMenu"
        >
        <template v-for="route in headerMenu">
            <at-side-item
                :icon="route.icon"
                :label="route.label"
                :to="route.to"
                v-if="!route.childs"
                :key="route.label"
            />

            <at-side-item-group
                v-else
                :track-id="route.label"
                :icon="route.icon"
                :label="route.label"
                v-model="activeGroup"
                :childs="route.childs"
                :key="route.label"
            />
        </template>
        </div>
    </div>
  </div>
</template>

<script>
import AtSideItemGroup from '../../molecules/AtSideItemGroup/AtSideItemGroup.vue';
import AtSideItem from '../../molecules/AtSideItem/AtSideItem.vue';

export default {
  props: {
    title: String,
    menu: {
      type: Array,
      required: true
    },
    headerMenu: {
      type: Array,
    },
    itemClass: {
      type: String
    },
    itemActiveClass: {
      type: String
    }
  },
  components: {
    AtSideItem,
    AtSideItemGroup
  },
  data() {
    return {
      activeGroup: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.app-side {
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-rows: 80px 1fr 1fr;
  z-index: 1001;

  .nav-container {
      display: flex;
      padding-bottom: 10px;
      .nav {
          margin-top: auto;
      }
  }

  .nav {
    margin-top: 40px;
    width: 100%;
    max-height: 100%;
    flex-flow: row;
    overflow-y: auto;

    &::-webkit-scrollbar-thumb {
      background-color: transparentize($color: #000000, $amount: 0.7);
    }

    &::-webkit-scrollbar {
      background-color: transparent;
      width: 8px;
    }
  }

  .nav-link {
    text-align: left;
    transition: all ease 0.3s;
    margin: 2px;

    &:not(.active):hover {
      background: dodgerblue;
      color: white;
    }
  }
}
</style>
