<template>
  <div id=charter-page>
    <h1 class="text-5xl my-2">Lane Charter</h1>
    <figure
      v-if="this.$subReady.Shipments && build_graph().length"
      class="charter"
    >
      <figcaption class="text-2xl">
        Starting with lane:
        <a class="root" :href="'/lanes/' + lane().slug + '/ship'">{{
          lane().name
        }}</a>
      </figcaption>
      <d3-network
        ref="d3"
        :net-nodes="build_graph()"
        :net-links="links()"
        :options="graph_options()"
        @link-click="handle_link_click"
      />
    </figure>
    <h2 v-else>Loading...</h2>
  </div>
</template>

<script>
import D3Network from "vue-d3-network";
import {
  build_graph,
  node_list,
  link_list,
  lane,
  graph_options,
} from './lib';
import './charter.css';

const options = {
  sort: { actual: -1 },
};

export default {
  meteor: {
    $subscribe: {
      Lanes: function () {
        let list = [node_list.get()?.map((node) => ({ _id: node.id }))];
        return list;
      },

      Shipments: function () {
        let list = node_list.get()?.map((node) => node.id);
        return [list, options];
      },
    },
  },

  beforeCreate() {
    build_graph.call(this);
  },

  methods: {
    build_graph,
    graph_options,
    handle_link_click,
    lane,

    links () {
      return link_list.get();
    },

  },

  mounted() {},

  components: {
    D3Network,
  },
};
</script>