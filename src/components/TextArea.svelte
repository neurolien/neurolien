<script>
  export let label = '';
  export let value = '';
</script>

<label for="about" class="block text-md font-medium leading-6 text-gray">{label}</label>
<div class="mt-2">
  <textarea on:change
    value={value} rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-main placeholder:text-gray focus:outline-none focus:border-main focus:ring-1 focus:ring-main sm:text-sm sm:leading-6 px-2 mb-5"></textarea>
</div>