<template>
    <div class="container mx-auto p-8">
      <h1 class="text-2xl font-bold mb-6">Administrador de Posts</h1>
  
      <!-- Formulario para agregar/editar posts -->
      <div class="bg-white shadow rounded-lg p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Editar Post' : 'Agregar Nuevo Post' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2" for="name">Título</label>
            <input
              type="text"
              id="name"
              v-model="formData.name"
              class="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Título del post"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2" for="description">Descripción</label>
            <textarea
              id="description"
              v-model="formData.description"
              class="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Descripción del post"
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2" for="price">Precio (opcional)</label>
            <input
              type="number"
              id="price"
              v-model="formData.price"
              class="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Precio (si aplica)"
            />
          </div>
          <div class="flex justify-end">
            <button
              type="submit"
              class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {{ isEditing ? 'Guardar Cambios' : 'Agregar Post' }}
            </button>
          </div>
        </form>
      </div>
  
      <!-- Lista de posts existentes -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="post in posts"
          :key="post.id"
          class="bg-white shadow rounded-lg p-6 relative"
        >
          <h2 class="text-xl font-semibold">{{ post.name }}</h2>
          <p class="text-gray-600 mt-2">{{ post.description }}</p>
          <p class="text-sm text-gray-500 mt-4">Precio: {{ post.price || 'N/A' }}</p>
          <div class="absolute top-4 right-4 flex space-x-2">
            <button
              @click="editPost(post)"
              class="py-1 px-3 bg-yellow-400 text-white rounded hover:bg-yellow-500"
            >
              Editar
            </button>
            <button
              @click="deletePost(post.id)"
              class="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import PageTemplateService from '@/services/page_template';
  
  // Estado para los posts y el formulario
  const posts = ref([]);
  const formData = ref({
    id: null,
    name: '',
    description: '',
    price: null,
  });
  const isEditing = ref(false);
  
  // Obtener posts al montar el componente
  const fetchPosts = async () => {
    try {
      posts.value = await PageTemplateService.getArticlesByUserId(1, 'blog');
    } catch (error) {
      console.error(error);
    }
  };
  
  // Manejar envío del formulario
  const handleSubmit = async () => {
    if (isEditing.value) {
      await updatePost();
    } else {
      await createPost();
    }
  };
  
  // Crear un nuevo post
  const createPost = async () => {
    try {
      const newPost = await PageTemplateService.createArticle({
        name: formData.value.name,
        description: formData.value.description,
        price: formData.value.price,
        userId: 1,
        type: 'blog',
      });
      posts.value.push(newPost);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };
  
  // Editar un post existente
  const editPost = (post) => {
    isEditing.value = true;
    formData.value = { ...post };
  };
  
  // Actualizar un post existente
  const updatePost = async () => {
    try {
      await PageTemplateService.updateArticle(formData.value.id, {
        name: formData.value.name,
        description: formData.value.description,
        price: formData.value.price,
      });
      const index = posts.value.findIndex((p) => p.id === formData.value.id);
      posts.value[index] = { ...formData.value };
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };
  
  // Eliminar un post
  const deletePost = async (id) => {
    try {
      await PageTemplateService.deleteArticle(id);
      posts.value = posts.value.filter((post) => post.id !== id);
    } catch (error) {
      console.error(error);
    }
  };
  
  // Reiniciar formulario
  const resetForm = () => {
    formData.value = {
      id: null,
      name: '',
      description: '',
      price: null,
    };
    isEditing.value = false;
  };
  
  onMounted(() => {
    fetchPosts();
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  .bg-white {
    background-color: #fff;
  }
  .absolute {
    position: absolute;
  }
  </style>
  