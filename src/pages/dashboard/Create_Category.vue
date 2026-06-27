<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-5">
      Create Category
    </h1>

    <!-- Upload Area -->
    <div
      @click="openFile"
      class="border-2 border-dashed border-gray-400 rounded-xl h-64 flex items-center justify-center cursor-pointer overflow-hidden hover:bg-gray-50"
    >
      <img
        v-if="imagePreview"
        :src="imagePreview"
        class="w-full h-full object-cover"
      />

      <div
        v-else
        class="flex flex-col items-center"
      >
        <div class="text-5xl">
          📷
        </div>

        <p class="mt-2 text-lg">
          Click to Upload Image
        </p>

        <p class="text-gray-500">
          PNG, JPG, JPEG
        </p>
      </div>
    </div>

    <!-- Hidden File Input -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="onImageChange"
    />

    <!-- Category Name -->
    <div class="mt-6">
      <label class="block font-semibold mb-2">
        Category Name
      </label>

      <input
        v-model="name"
        type="text"
        placeholder="Enter Category Name"
        class="border rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>

    <!-- Button -->
    <button
      @click="saveCategory"
      class="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700"
    >
      Save Category
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const fileInput = ref(null);
const imageFile = ref(null);
const imagePreview = ref("");
const name = ref("");

function openFile() {
  fileInput.value.click();
}

function onImageChange(event) {
  const file = event.target.files[0];

  if (!file) return;

  imageFile.value = file;

  const reader = new FileReader();

  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };

  reader.readAsDataURL(file);
}

async function saveCategory() {
  if (name.value.trim() === "") {
    alert("Please enter category name");
    return;
  }

  if (!imageFile.value) {
    alert("Please choose an image");
    return;
  }

  try {
    const formData = new FormData();

    formData.append("name", name.value);
    formData.append("image", imageFile.value);

    const response = await axios.post(
      "http://127.0.0.1:8000/api/categories",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);

    alert("Category Created Successfully");

    name.value = "";
    imageFile.value = null;
    imagePreview.value = "";

    router.push("/dashboard/categories");
  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Cannot connect to server");
    }
  }
}
</script>
