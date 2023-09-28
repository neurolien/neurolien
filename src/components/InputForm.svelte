<script>
  export let label = '';
  export let value = '';
  export let autocomplete = '';
</script>

<label for="first-name" class="block text-md font-medium leading-6 text-gray">{label}</label>
<div class="mt-2">
  <input on:change on:focus
    type="text" value={value} class="block w-full rounded-md border-0 appearance-none py-1.5 text-gray shadow-sm ring-1 ring-inset ring-main placeholder:text-gray focus:outline-none focus:ring-1 sm:text-sm sm:leading-6 px-2 mb-5" autocomplete={autocomplete} aria-autocomplete="list">
</div>