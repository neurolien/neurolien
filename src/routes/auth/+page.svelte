
<script lang="ts">

  import { onMount } from 'svelte';
  import InputForm from "../../components/InputForm.svelte";
  import Button from "../../components/Button.svelte";
  import ErrorMessage from "../../components/ErrorMessage.svelte";
  import { goto } from "$app/navigation";
  import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, type ApplicationVerifier } from "firebase/auth";
  import { pageType } from '../../store';

  // start telephone
  import { createEventDispatcher } from 'svelte';
	import { clickOutsideAction } from 'svelte-tel-input/utils';
	import { TelInput, isSelected, normalizedCountries } from 'svelte-tel-input';
	import type {
		DetailedValue,
		CountrySelectEvents,
		CountryCode,
		E164Number,
		TelInputOptions,
		Country
	} from 'svelte-tel-input/types';
	import 'svelte-tel-input/styles/flags.css';

	export let clickOutside = true;
	export let closeOnClick = true;
	export let disabled = false;
	export let detailedValue: DetailedValue | null = null;
	export let value: E164Number | null = "";
	export let searchPlaceholder: string | null = 'Search';
	export let selectedCountry: CountryCode | null = "CH";
	export let valid: boolean;
	export let options: TelInputOptions = {
    // Generates country specific placeholder for the selected country.
    autoPlaceholder: true,
    // Allow or disallow spaces in the input field
    spaces: true,
    // If you have a parsed phone number and you change country manually from outside, then it's set the `valid` prop to false.
    invalidateOnCountryChange: false,
    // Formatted output `national` | `international`
    format: 'national'
  };
	let searchText = '';
	let isOpen = false;

	$: selectedCountryDialCode =
		normalizedCountries.find((el) => el.iso2 === selectedCountry)?.dialCode || null;

	const toggleDropDown = (e?: Event) => {
		e?.preventDefault();
		if (disabled) return;
		isOpen = !isOpen;
	};

	const closeDropdown = (e?: Event) => {
		if (isOpen) {
			e?.preventDefault();
			isOpen = false;
			searchText = '';
		}
	};

	const selectClick = () => {
		if (closeOnClick) closeDropdown();
	};

	const closeOnClickOutside = () => {
		if (clickOutside) {
			closeDropdown();
		}
	};

	const sortCountries = (countries: Country[], text: string) => {
		const normalizedText = text.trim().toLowerCase();
		if (!normalizedText) {
			return countries.sort((a, b) => a.label.localeCompare(b.label));
		}
		return countries.sort((a, b) => {
			const aNameLower = a.name.toLowerCase();
			const bNameLower = b.name.toLowerCase();
			const aStartsWith = aNameLower.startsWith(normalizedText);
			const bStartsWith = bNameLower.startsWith(normalizedText);
			if (aStartsWith && !bStartsWith) return -1;
			if (!aStartsWith && bStartsWith) return 1;
			const aIndex = aNameLower.indexOf(normalizedText);
			const bIndex = bNameLower.indexOf(normalizedText);
			if (aIndex === -1 && bIndex === -1) return a.id.localeCompare(b.id);
			if (aIndex === -1) return 1;
			if (bIndex === -1) return -1;
			const aWeight = aIndex + (aStartsWith ? 0 : 1);
			const bWeight = bIndex + (bStartsWith ? 0 : 1);
			return aWeight - bWeight;
		});
	};

	const handleSelect = (val: CountryCode, e?: Event) => {
		if (disabled) return;
		e?.preventDefault();
		if (
			selectedCountry === undefined ||
			selectedCountry === null ||
			(typeof selectedCountry === typeof val && selectedCountry !== val)
		) {
			selectedCountry = val;
			onChange(val);
			selectClick();
		} else {
			dispatch('same', { option: val });
			selectClick();
		}
	};

	const dispatch = createEventDispatcher<CountrySelectEvents<CountryCode>>();

	const onChange = (selectedCountry: CountryCode) => {
    console.log(selectedCountry)
		dispatch('change', { option: selectedCountry });
	};
  // end telephone

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
      alertContent = "Numéro de téléphone invalide";
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
    <div
    class="mt-5 flex relative rounded-lg {valid
      ? ``
      : ` ring-pink-500 ring-1 focus-within:ring-offset-1 focus-within:ring-offset-pink-500/50 focus-within:ring-1`}"
    >
    <div class="flex" use:clickOutsideAction={closeOnClickOutside}>
      <button
        id="states-button"
        data-dropdown-toggle="dropdown-states"
        class="relative flex-shrink-0 overflow-hidden z-10 whitespace-nowrap inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 border border-sky-300 rounded-l-lg focus:outline-none"
        type="button"
        role="combobox"
        aria-controls="dropdown-countries"
        aria-expanded="false"
        aria-haspopup="false"
        on:click={toggleDropDown}
      >
        {#if selectedCountry && selectedCountry !== null}
          <div class="inline-flex items-center text-left">
            <span class="flag flag-{selectedCountry.toLowerCase()} flex-shrink-0 mr-3" />
            {#if options.format === 'national'}
              <span class=" text-gray"
                >+{selectedCountryDialCode}</span
              >
            {/if}
          </div>
        {:else}
          Please select
        {/if}
        <svg
          aria-hidden="true"
          class="ml-1 w-4 h-4 {isOpen ? 'rotate-180' : ''}"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      {#if isOpen}
        <div
          id="dropdown-countries"
          class="absolute z-10 max-w-fit bg-white rounded divide-y divide-gray-100 shadow overflow-hidden translate-y-11"
          data-popper-reference-hidden=""
          data-popper-escaped=""
          data-popper-placement="bottom"
          aria-orientation="vertical"
          aria-labelledby="country-button"
          tabindex="-1"
        >
          <div
            class="text-sm text-gray-700 max-h-48 overflow-y-auto"
            aria-labelledby="countries-button"
            role="listbox"
          >
            <input
              aria-autocomplete="list"
              type="text"
              class="px-4 py-2 text-gray-900 focus:outline-none w-full sticky top-0"
              bind:value={searchText}
              placeholder={searchPlaceholder}
            />
            {#each sortCountries(normalizedCountries, searchText) as country (country.id)}
              {@const isActive = isSelected(country.iso2, selectedCountry)}
              <div id="country-{country.iso2}" role="option" aria-selected={isActive}>
                <button
                  value={country.iso2}
                  type="button"
                  class="inline-flex py-2 px-4 w-full text-sm hover:bg-gray-100 
                              active:bg-gray-800 overflow-hidden
                              {isActive
                    ? 'bg-gray-600'
                    : ''}"
                  on:click={(e) => {
                    handleSelect(country.iso2, e);
                  }}
                >
                  <div class="inline-flex items-center text-left">
                    <span
                      class="flag flag-{country.iso2.toLowerCase()} flex-shrink-0 mr-3"
                    />
                    <span class="mr-2">{country.name}</span>
                    <span class="text-gray-500">+{country.dialCode}</span>
                  </div>
                </button>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <TelInput
      bind:country={selectedCountry}
      bind:detailedValue
      bind:value
      bind:valid
      {options}
      required
      class="text-sm rounded-r-lg block w-full p-2.5 focus:outline-none border border-sky-300 border-l-sky-100 text-gray-900"
    />
  </div>

  </div>
  <div id="recaptcha-container"></div>
  <Button on:click={() => phoneVerify()}>Suivant</Button>

</div>