<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import InputForm from "../../../components/InputForm.svelte";
  import TextArea from "../../../components/TextArea.svelte";
  import Button from "../../../components/Button.svelte";
  import ErrorMessage from '../../../components/ErrorMessage.svelte';
  import { goto } from "$app/navigation";
  import LocationSearch from '../../../components/LocationSearch.svelte';
  import { collection, doc, setDoc, getFirestore, getDocs, query, where } from "firebase/firestore";
  import { user } from '../../../store';

  let nickname = "";
  let city = "";
  let geometry = "";
  let provides = "";
  let alertContent = "";
  let alertShow = false;

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
        geometry = item.data().geometry ? item.data().geometry : "";
        provides = item.data().provides ? item.data().provides : "";
      });
    }
    const checkApp = setInterval(() => {
      user.subscribe(value => {
        if (value) {
          clearInterval(checkApp);
          getUser();
        }
      });
    }, 100);

  })
  
  const updateUser = async () => {
    try {
      let userData;
      user.subscribe(value => {
        userData = value;
      });
      if (nickname === "" || city === "") {
        alertContent = "valeur d'entrée invalide";
        alertShow = true;
        return;
      }
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
            geometry,
            firstname: item.data().firstname ? item.data().firstname : "",
            lastname: item.data().lastname ? item.data().lastname : "",
            seeks: item.data().seeks ? item.data().seeks : "",
          });
          goto("/consult/success");
        });
      } else {
        await setDoc(doc(usersRef), {
          phoneNumber: userData.phoneNumber,
          nickname,
          provides,
          city,
          geometry
        });
        goto("/consult/success");
      }
    } catch (e) {
      console.log(e)
      alertContent = "Quelque chose s'est mal passé";
      alertShow = true;
    }
  }

  const setLocation = (e) => {
    geometry = `${e.detail.place.geometry.location.lat()}, ${e.detail.place.geometry.location.lng()}`; 
    city = e.detail.selectedPrediction;
  }

  const setAlertShow = (status) => {
    alertShow = status
  }
</script>

<div class="grid grid-cols-1">
  <p class="text-4xl font-bold text-center text-main mb-16 ">Je suis un talent</p>
  <ErrorMessage show={alertShow} content={alertContent} setAlertShow={setAlertShow}/>
  <InputForm label="Pseudo" value={nickname} on:change={(e) => nickname=e.target.value}  />
  <LocationSearch value={city}  on:placeChanged={setLocation}/>
  <TextArea label="Mes talents:"  value={provides} on:change={(e) => provides=e.target.value}   />
  <div class="mt-10">
    <Button on:click={updateUser}>Suivant</Button>
  </div>
</div>


