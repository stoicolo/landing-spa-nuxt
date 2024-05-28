<template>
    <div>
      <template v-for="(item, index) in elements" :key="index">
        <component :is="item.tag" v-bind="item.attrs">
          <template v-if="item.children">
            <Builder :elements="item.children" />
          </template>
          <template v-else>{{ item.content }}</template>
        </component>
      </template>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Builder',
    props: {
      elements: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* Añade tus estilos aquí si es necesario */
  </style>
  