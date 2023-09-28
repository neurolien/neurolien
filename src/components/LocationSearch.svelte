<script>
// @ts-nocheck

  import { GooglePlacesAutocomplete } from '@beyonk/svelte-googlemaps'
  export let value = '';
</script>

<label for="first-name" class="block text-md font-medium leading-6 text-gray">Ville</label>
<div class="mt-2">
  <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLEMAP_API_KEY} viewValue={value} styleClass="block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray placeholder:text-gray focus:outline-none focus:border-main focus:ring-1 focus:ring-main sm:text-sm sm:leading-6 px-2 mb-5" on:placeChanged/>
</div>

