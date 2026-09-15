<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div class="p-6 border-b border-gray-200">
        <h1 class="text-xl font-bold text-blue-600">EmpregaSBC</h1>
      </div>
      <nav class="flex-1 p-4 space-y-1">
        <slot name="sidebar" />
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <header class="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <slot name="header" />
      </header>
      <main class="flex-1 p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
