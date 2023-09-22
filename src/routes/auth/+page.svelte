
<script lang="ts">

  import { onMount } from 'svelte';
  import InputForm from "../../components/InputForm.svelte";
  import Button from "../../components/Button.svelte";
  import ErrorMessage from "../../components/ErrorMessage.svelte";
  import { goto } from "$app/navigation";
  import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, type ApplicationVerifier } from "firebase/auth";
  import { pageType } from '../../store';

  // telephone
  import { TelInput, normalizedCountries } from 'svelte-tel-input';
	import type {
		DetailedValue,
		E164Number,
		CountryCode,
		TelInputOptions
	} from 'svelte-tel-input/types';

	// E164 formatted value, usually you should store and use this.
	export let value: E164Number | null = "";

	// Selected country
	export let country: CountryCode | null = null;

	// Validity
	export let valid: boolean;

	// Phone number details
	export let detailedValue: DetailedValue | null = null;

	export let options: TelInputOptions;
  // telephone
  let alertShow = false;
  let alertContent = "";
  /**
     * @type {import("@firebase/auth").ApplicationVerifier}
     */
  let recaptchaVerifier: ApplicationVerifier;

  onMount(() => {
    const initialize = () => {
      const auth = getAuth();
      recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible', // Optional configuration options
      });

      let type;
      pageType.subscribe(value => {
        type = value;
      });

    }

    const checkApp = setInterval(() => {
      const auth = getAuth();
      if (auth) {
        clearInterval(checkApp);
        initialize();
      }
    }, 100);

  });

  const phoneVerify = () => {
    // goto("/auth/confirm");
    // return;
    const auth = getAuth();
    auth.languageCode = 'it';

    if (value && valid) {
      signInWithPhoneNumber(auth, value, recaptchaVerifier)
        .then((confirmationResult) => {
          // @ts-ignore
          window.confirmationResult = confirmationResult;
          goto("/auth/confirm");
        }).catch((error) => {
          alertContent = `Numéro de téléphone invalide`;
          alertShow = true;
        });
    } else {
      alertContent = "veuillez saisir le numéro de téléphone correct";
      alertShow = true;
    }
  }




</script>

<div class="grid grid-cols-1">
  <p class="text-4xl font-bold text-center text-main mb-24 ">Je suis un talent</p>
  <div class="mb-24">
    <ErrorMessage show={alertShow} content={alertContent}/>
    <!-- <InputForm label="Téléphone" value={phoneNumber} on:change={handleInputChange} on:focus={() => alertShow=false}/> -->
    <!-- <TelephoneInput /> -->
    <div class="flex mt-5">
      <select
        class="form-select appearance-none
        block
        px-3
        py-1.5
        text-base
        font-normal
        bg-clip-padding bg-no-repeat cursor-pointer
        text-gray-500 bg-gray-100 border border-sky-300 rounded-l-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-sky-600
        m-0
        focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none"
        aria-label="Default select example"
        name="Country"
        bind:value={country}
      >
        <option value={null} hidden={country !== null}>Country</option>
        {#each normalizedCountries as currentCountry (currentCountry.id)}
          <option
            value={currentCountry.iso2}
            selected={currentCountry.iso2 === country}
            aria-selected={currentCountry.iso2 === country}
          >
            {currentCountry.iso2} (+{currentCountry.dialCode})
          </option>
        {/each}
      </select>
    
      <TelInput
        {options}
        bind:country
        bind:valid
        bind:value
        bind:detailedValue
        class="px-4 py-1 w-full bg-sky-50 dark:bg-sky-700 
            dark:placeholder-sky-400 dark:text-white text-sky-900 focus:outline-none rounded-r-lg {valid
          ? 'border border-sky-300 border-l-sky-100 dark:border-l-sky-700 dark:border-sky-600'
          : 'border-2 border-red-600'}"
      />
    </div>  
  </div>
  <div id="recaptcha-container"></div>
  <Button on:click={() => phoneVerify()}>Suivant</Button>

</div>