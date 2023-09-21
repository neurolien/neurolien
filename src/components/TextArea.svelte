<script>
  export let label = '';
  export let value = '';
</script>

<label for="about" class="block text-md font-medium leading-6 text-gray-900">{label}</label>
<div class="mt-2">
  <textarea on:change
    value={value} rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-500 sm:text-sm sm:leading-6 px-2 mb-5"></textarea>
</div>