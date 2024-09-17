<template>
    <div class="category-management">
        <h1 class="title">Gestión de Categorías</h1>
        <div class="category-form">
            <input v-model="newCategory" @keyup.enter="addCategory" placeholder="Nueva categoría"
                class="category-input" />
            <button @click="addCategory" class="add-button">Agregar</button>
        </div>
        <ul class="category-list">
            <li v-for="category in categories" :key="category.id" class="category-item">
                <span v-if="!category.isEditing">{{ category.name }}</span>
                <input v-else v-model="category.editName" @keyup.enter="updateCategory(category)" class="edit-input" />
                <div class="category-actions">
                    <font-awesome-icon v-if="!category.isEditing" icon="fa-solid fa-pencil"
                        @click="startEditing(category)" class="edit-icon" />
                    <font-awesome-icon v-else icon="fa-solid fa-check" @click="updateCategory(category)"
                        class="save-icon" />
                    <font-awesome-icon icon="fa-solid fa-trash" @click="deleteCategory(category)" class="delete-icon" />
                </div>
            </li>
        </ul>
    </div>
    <div class="image-upload">
        <h2 class="title">Subir Imagen</h2>
        <div class="upload-container">
            <div class="preview-area">
                <img v-if="imagePreview" :src="imagePreview" alt="Vista previa de la imagen" class="preview-image">
                <div v-else class="placeholder-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                    </svg>
                </div>
            </div>
            <div class="upload-actions">
                <input type="file" ref="fileInput" @change="handleImageSelect" accept="image/*" class="file-input" />
                <button @click="triggerFileInput" class="upload-button">Seleccionar Imagen</button>
                <p class="file-info">PNG, JPG, menos de 5MB</p>
            </div>
        </div>
        <div class="category-selection">
            <h3>Seleccionar Categorías</h3>
            <div class="category-checkboxes">
                <label v-for="category in categories" :key="category.id" class="category-checkbox">
                    <input type="checkbox" v-model="selectedCategories" :value="category.name" />
                    {{ category.name }}
                </label>
            </div>
        </div>
        <button @click="uploadImage" class="submit-button" :disabled="!imageFile || selectedCategories.length === 0">
            Subir Imagen
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMenuStore } from '~/stores/menu';
import { useCurrentStore } from '~/stores/current';
import { useRouter, useRoute } from 'vue-router';
import PageTemplateService from '@/services/page_template';

const menuStore = useMenuStore();
const currentStore = useCurrentStore();
const route = useRoute();
const { $toaster } = useNuxtApp();

const imageFile = ref(null);
const imagePreview = ref(null);
const selectedCategories = ref([]);
const fileInput = ref(null);

const categories = ref([]);
const newCategory = ref('');

onMounted(async () => {
    await menuStore.initializeStore();
    const menusResponse = await PageTemplateService.getMenuList(currentStore.websiteId, currentStore.userId);
    menuStore.setMenuList(menusResponse.menuDetails);
    changeActiveItemMenu();
    await loadCategories();
});

async function loadCategories() {
    try {
        const fetchedCategories = await PageTemplateService.getCategories(currentStore.userId);
        categories.value = fetchedCategories.map(cat => ({
            ...cat,
            isEditing: false,
            editName: cat.name
        }));
    } catch (error) {
        $toaster.show({
            title: "Error",
            description: "No se pudieron cargar las categorías.",
            delay: 3,
            position: "top-right",
            type: "error"
        });
    }
}

function changeActiveItemMenu() {
    menuStore.setActiveMenu(route.path);
}

function validateCategory(category) {
    return category.toLowerCase().replace(/\s+/g, '_');
}

async function addCategory() {
    const validatedCategory = validateCategory(newCategory.value);
    if (validatedCategory && !categories.value.some(cat => cat.name === validatedCategory)) {
        try {
            const addedCategory = await PageTemplateService.addCategory(currentStore.userId, validatedCategory);
            categories.value.push({
                ...addedCategory,
                isEditing: false,
                editName: addedCategory.name
            });
            newCategory.value = '';
            $toaster.show({
                title: "Éxito",
                description: "Categoría agregada correctamente.",
                delay: 3,
                position: "top-right",
                type: "success"
            });
        } catch (error) {
            $toaster.show({
                title: "Error",
                description: "No se pudo agregar la categoría.",
                delay: 3,
                position: "top-right",
                type: "error"
            });
        }
    } else {
        $toaster.show({
            title: "Error",
            description: "Categoría inválida o ya existente.",
            delay: 3,
            position: "top-right",
            type: "error"
        });
    }
}

function startEditing(category) {
    category.isEditing = true;
    category.editName = category.name;
}

async function updateCategory(category) {
    const validatedName = validateCategory(category.editName);
    if (validatedName && validatedName !== category.name) {
        try {
            await PageTemplateService.updateCategory(category.id, validatedName);
            category.name = validatedName;
            category.isEditing = false;
            $toaster.show({
                title: "Éxito",
                description: "Categoría actualizada correctamente.",
                delay: 3,
                position: "top-right",
                type: "success"
            });
        } catch (error) {
            $toaster.show({
                title: "Error",
                description: "No se pudo actualizar la categoría.",
                delay: 3,
                position: "top-right",
                type: "error"
            });
        }
    } else {
        category.isEditing = false;
        if (validatedName === category.name) {
            $toaster.show({
                title: "Información",
                description: "No se realizaron cambios en la categoría.",
                delay: 3,
                position: "top-right",
                type: "info"
            });
        } else {
            $toaster.show({
                title: "Error",
                description: "Nombre de categoría inválido.",
                delay: 3,
                position: "top-right",
                type: "error"
            });
        }
    }
}

async function deleteCategory(category) {
    try {
        await PageTemplateService.deleteCategory(category.id);
        categories.value = categories.value.filter(cat => cat.id !== category.id);
        $toaster.show({
            title: "Éxito",
            description: "Categoría eliminada correctamente.",
            delay: 3,
            position: "top-right",
            type: "success"
        });
    } catch (error) {
        $toaster.show({
            title: "Error",
            description: "No se pudo eliminar la categoría.",
            delay: 3,
            position: "top-right",
            type: "error"
        });
    }
}

function triggerFileInput() {
  fileInput.value.click();
}

function handleImageSelect(event) {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = e => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

async function uploadImage() {
  if (!imageFile.value || selectedCategories.value.length === 0) return;

  const formData = new FormData();
  formData.append('image', imageFile.value);

  try {
    await PageTemplateService.saveImageiDriveAdmins(
      formData,
      currentStore.websiteId,
      currentStore.userId,
      selectedCategories.value
    );
    $toaster.show({
      title: "Éxito",
      description: "Imagen subida correctamente.",
      delay: 3,
      position: "top-right",
      type: "success"
    });
    // Resetear el formulario
    imageFile.value = null;
    imagePreview.value = null;
    selectedCategories.value = [];
  } catch (error) {
    $toaster.show({
      title: "Error",
      description: "No se pudo subir la imagen.",
      delay: 3,
      position: "top-right",
      type: "error"
    });
  }
}
</script>

<style lang="scss" scoped>

.admin-panel {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
}

.category-management {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 95%;
    margin: 30px;

    .title {
        font-size: 24px;
        color: #333;
        margin-bottom: 20px;
        text-align: center;
    }

    .category-form {
        display: flex;
        margin-bottom: 20px;

        .category-input {
            flex-grow: 1;
            padding: 10px;
            border: 1px solid #ced4da;
            border-radius: 4px 0 0 4px;
            font-size: 16px;

            &:focus {
                outline: none;
                border-color: #80bdff;
                box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
            }
        }

        .add-button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
            transition: background-color 0.3s;

            &:hover {
                background-color: #0056b3;
            }
        }
    }

    .category-list {
        list-style-type: none;
        padding: 0;

        .category-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background-color: white;
            border: 1px solid #ced4da;
            border-radius: 4px;
            margin-bottom: 10px;

            .edit-input {
                flex-grow: 1;
                padding: 5px;
                border: 1px solid #ced4da;
                border-radius: 4px;
                font-size: 14px;
            }

            .category-actions {

                .edit-icon,
                .save-icon,
                .delete-icon {
                    cursor: pointer;
                    margin-left: 10px;
                    transition: color 0.3s;
                }

                .edit-icon,
                .save-icon {
                    color: #ffc107;

                    &:hover {
                        color: #d39e00;
                    }
                }

                .delete-icon {
                    color: #dc3545;

                    &:hover {
                        color: #bd2130;
                    }
                }
            }
        }
    }
}

.image-upload {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 95%;
    margin: 30px;

  .title {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }

  .upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .preview-area {
    width: 200px;
    height: 200px;
    border: 2px dashed #ced4da;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .preview-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .placeholder-icon {
      width: 50px;
      height: 50px;
      color: #ced4da;
    }
  }

  .upload-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    .file-input {
      display: none;
    }

    .upload-button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
      }
    }

    .file-info {
      font-size: 12px;
      color: #6c757d;
    }
  }

  .category-selection {
    margin-top: 20px;

    h3 {
      font-size: 18px;
      color: #333;
      margin-bottom: 10px;
    }

    .category-checkboxes {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .category-checkbox {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 14px;
        color: #333;

        input[type="checkbox"] {
          margin: 0;
        }
      }
    }
  }

  .submit-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #218838;
    }

    &:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
  }
}
</style>