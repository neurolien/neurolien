<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import InputForm from "../../../components/InputForm.svelte";
  import TextArea from "../../../components/TextArea.svelte";
  import Button from "../../../components/Button.svelte";
  import { goto } from "$app/navigation";
  import { GooglePlacesAutocomplete } from '@beyonk/svelte-googlemaps'
  import LocationSearch from '../../../components/LocationSearch.svelte';
  
  import { collection, doc, setDoc, getFirestore, getDocs, query, where } from "firebase/firestore";
  import { user } from '../../../store';

  let nickname = "";
  let city = "";
  let provides = "";

  onMount(async () => {
    const getUser = async () => {
      let userData;
      user.subscribe(value => {
        userData = value;
      });
      const db = getFirestore();
      const usersRef = collection(db, "users");
      const q = query(usersRef, where('phoneNumber', '==', userData.phoneNumber));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (item) => {
        nickname = item.data().nickname ? item.data().nickname : "";
        city = item.data().city ? item.data().city : "";
        provides = item.data().provides ? item.data().provides : "";
      });
    }
    getUser();
  })
  
  const updateUser = async () => {
    let userData;
    user.subscribe(value => {
      userData = value;
    });
    
    const db = getFirestore();
    const usersRef = collection(db, "users");
    const q = query(usersRef, where('phoneNumber', '==', userData.phoneNumber));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach(async (item) => {
        console.log(item.id, " => ", item.data());
        await setDoc(doc(usersRef, item.id), {
          phoneNumber: userData.phoneNumber,
          nickname,
          provides,
          city,
          firstname: item.data().firstname,
          lastname: item.data().lastname,
          seeks: item.data().seeks,
        });
        goto("/consult/success");
      });
    } else {
      await setDoc(doc(usersRef), {
        phoneNumber: userData.phoneNumber,
        nickname,
        provides,
        city
      });
      goto("/consult/success");
    }
  }
</script>

<div class="grid grid-cols-1">
  <p class="text-4xl font-bold text-center text-main mb-24 ">Je suis un talent</p>
  <InputForm label="Pseudo" value={nickname} on:change={(e) => nickname=e.target.value}  />
  <!-- <InputForm label="Ville" value={city} on:change={(e) => city=e.target.value}  /> -->
    <LocationSearch value={city}  on:placeChanged={(e) => city = e.detail.selectedPrediction}/>
  <TextArea label="Mes talents:"  value={provides} on:change={(e) => provides=e.target.value}   />
  <div class="mt-10">
    <Button on:click={updateUser}>Suivant</Button>
  </div>
</div>


