<template>
  <div class="container">
   <div v-if="errored" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
   <span class="font-medium">Danger alert!</span> Ошибка загрузки данных
   </div>

   <div v-if="loading" role="status">
     <Loading/>
   </div>
   <div v-else>
      <Form v-slot="{ handleSubmit }" :validation-schema="schema">
         <label for="Заголок" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Назание доски</label>
         <Field
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            name="name" 
            @blur="handleSubmit($event, saveName)" 
            type="text" 
            v-model="name" 
            id="first_name" />
         <ErrorMessage class="mt-2, text-sm, text-red-600" name="name" />
      </Form>
      <!-- <p v-if="!$v.name.required" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium text-red-600">Oops!</span> Обязательное поле</p>
      <p v-if="!$v.name.maxLength" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium text-red-600">Oops!</span> Максимальная длина: {{$v.name.$params.maxLength.max}}</p> -->
   </div>
   <Form @submit="createList" :validation-schema="schema">
    <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label for="list_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Добавление списка</label>
            <Field  
               @keyup="setJustLoaded()"
               name="listName"
               v-model="listName" 
               type="text" 
               id="list_name"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Введите название списка"
            />
            <ErrorMessage class="mt-2, text-sm, text-red-600" name="listName" />
         </div>
    </div>
    <button type="submit" class="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Добавить</button>
</Form>
<div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3">
   <div  v-for="deskList in deskLists" :key="deskList.id">
            <!-- <router-link  :to="{name: 'showDesk', params: {deskid: deskList.id}}"  href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-t shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"> -->
            <div  class="block max-w-sm p-6 bg-white border border-gray-200 rounded-t shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
               <div class="cursor-pointer">
                  <form @submit="updateDeskList(deskList.id, deskList.name)" v-if="desk_list_input_id == deskList.id" class="flex flex-row justify-between items-center">
                     <div v-if="loadingList" role="status">
                        <Loading/>
                     </div>
                     <Field name="deskListName" v-else v-model="deskList.name" type="text" id="first_name" class="mr-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Введите название списка"/>
                     <i @click="desk_list_input_id = null" class="fa-solid fa-x"></i>
                  </form>
                  <div @click="desk_list_input_id = deskList.id" v-else class="flex flex-row justify-between items-center">
                     <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ deskList.name }}</h5> 
                     <i class="fa-solid fa-pen"></i>
                  </div>
               </div>
               <Form @submit="createCard(deskList.id)" :validation-schema="schema">
                  <div class="grid gap-6 mb-6 md:grid-cols-2">
                     <div>
                           <label for="card_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Добавить карточку</label>
                           <!-- <Field  
                              @keyup="setJustLoaded()"
                              name="cardName"
                              v-model="cardNames[deskList.id]"
                              type="text" 
                              id="card_name"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Введите название"
                           /> -->
                           <Field name="cardName">
                              <input
                                 v-bind="cardName" 
                                 type="text"
                                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Введите название"
                                 v-model="cardNames[deskList.id]"
                              />
                           </Field>
                           <ErrorMessage class="mt-2, text-sm, text-red-600" name="cardName" />
                        </div>
                  </div>
                  <button type="submit" class="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Добавить</button>
               </Form>
               <ShowList :cards="deskList.cards"/>
            </div>
            <!-- </router-link> -->
            <button @click="deleteList(deskList.id)" class="w-full block max-w-sm mb-3 bg-transparent dark:border-gray-700 shadow hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-gray-200 hover:border-transparent rounded-b">
               Удалить
            </button> 

         </div>   
  </div>
</div>
</template>

<script>
import Loading from "./Loading.vue";
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import ShowList from "./ShowList.vue";

export default {
   props: [
      'deskid'
   ],
   components: {
      Loading,
      Form, 
      Field,
      ErrorMessage,
      ShowList
   },
   data(){
      return {
         name: null,
         list_name: null,
         errored: false,
         loading: true,
         errorClass: 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500',
         normalClass: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
         deskLists: [],
         listName: null,
         desk_list_input_id: null,
         loadingList: false,
         value: '',
         justLoaded: false,
         cardNames: [],
      }
   },
   methods:{
      updateDeskList(id, name){
         this.loadingList = true;
         axios.post('/api/desk-lists/'+id,{
               _method: 'PUT',
               name: name,
            })
            .then(response => {
               this.desk_list_input_id = null;
               // this.deskLists = this.deskLists.filter(item => item.id !== deskListid);
            })
            .catch(error => {
               console.log(error);
            })
            .finally(() => {
               this.loadingList = false;
            })
      },
      setJustLoaded(){
         this.justLoaded = false;
      },
      deleteList(deskListid){
         if(confirm('Вы действительно хотите удалить лист?')){
            axios.post('/api/desk-lists/'+deskListid,{
               _method: 'DELETE',
            })
            .then(response => {
               this.deskLists = this.deskLists.filter(item => item.id !== deskListid);
            })
            .catch(error => {
               console.log(error);
            })
            .finally(() => {
               this.loading = false;
            })
         }
      },
      createList(){

         this.loading = true

            console.log('createDesk')
            
         axios.post('/api/desk-lists/',{
            name: this.listName,
            desk_id: this.deskid
         })
         .then(response => {
            this.listName = '';
            this.deskLists.unshift(response.data.data);
            this.justLoaded=true;
         })
         .catch(error => {
            console.log(error);
         })
         .finally(() => {
            this.loading = false;
         })
      },
      createCard(deskListid){

         this.loading = true

            console.log('createDesk')
            
         axios.post('/api/card/',{
            name: this.cardNames[deskListid],
            desk_list_id: deskListid
         })
         .then(response => {
            // this.listName = '';
            // this.deskLists.unshift(response.data.data);
            // this.justLoaded=true;
            this.getDeskLists()
         })
         .catch(error => {
            console.log(error);
         })
         .finally(() => {
            this.loading = false;
         })
         },

      getDeskLists(){
         axios.get('/api/desk-lists/',{
            params:{
               desk_id: this.deskid
            }
         })
         .then(response => {
            console.log('getDeskLists', response);
            this.deskLists = response.data.data
            this.deskLists.forEach(el=>{
               this.cardNames[el.id] = ''
            })
            console.log('cardNames', this.cardNames);
            // cardNames
         })
         .catch(error => {
            console.log(error);
            this.errored = true;
         })
         .finally(() => {
            this.loading = false;
         })
      },
      saveName(){
         console.log('this.name', this.name)
         axios.post('/api/desks/'+this.deskid,{
            _method: 'PUT',
            name: this.name
         })
         .then(response => {
            this.name = response.data.data.name
         })
         .catch(error => {
            console.log(error);
            this.errored = true;
         })
         .finally(() => {
            this.loading = false;
         })
      }
   },
   computed: {
      schema() {
         // if(!this.justLoaded){
            return yup.object({
               name: yup.string().required('Это поле обязательно для заполнения'),
               listName: yup.string().required('Это поле обязательно для заполнения'),
               cardName: yup.string().required('Это поле обязательно для заполнения'),
            });
         // }
      },
   },
   mounted(){
         axios.get('/api/desks/'+this.deskid)
         .then(response => {
            this.name = response.data.data.name
         })
         .catch(error => {
            console.log(error);
            this.errored = true;
         })
         .finally(() => {
            this.loading = false;
         })
         this.getDeskLists();
      },

}
</script>

<style>

</style>