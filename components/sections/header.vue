<template>
    <header :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
        <h1>{{ title }}</h1>
        <img :src="icon" alt="icon" />
    </header>
</template>

<script>
export default {
    name: 'header',
    props: {
        title: {
            type: String,
            default: 'Header Title'
        },
        icon: {
            type: String,
            default: 'https://via.placeholder.com/150'
        },
        backgroundImage: {
            type: String,
            default: 'https://via.placeholder.com/1200x300'
        }
    }
};
</script>

<style scoped>
/* Añade tus estilos aquí si es necesario */
header {
    min-height: 300px;
    /* Altura mínima para visualización */
}
</style>