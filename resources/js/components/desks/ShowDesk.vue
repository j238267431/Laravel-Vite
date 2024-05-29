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
         <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Назание доски</label>
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
   <Form @submit="createList" :validation-schema="schemaList">
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
   <div  v-for="deskList in $store.state.deskLists" :key="deskList.id">
            <!-- <router-link  :to="{name: 'showDesk', params: {deskid: deskList.id}}"  href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-t shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"> -->
            <div  class="block max-w-sm p-6 bg-white border border-gray-200 rounded-t shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
               <div class="cursor-pointer">
                  <form @submit.prevent="updateDeskList(deskList.id, deskList.name)" v-if="$store.state.desk_list_input_id == deskList.id" class="flex flex-row justify-between items-center">
                     <div v-if="$store.state.loadingList" role="status">
                        <Loading/>
                     </div>
                     <Field name="deskListName" v-else v-model="deskList.name" type="text" id="first_name" class="mr-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Введите название списка"/>
                     <i @click="$store.state.desk_list_input_id = null" class="fa-solid fa-x"></i>
                  </form>
                  <div @click="$store.state.desk_list_input_id = deskList.id" v-else class="flex flex-row justify-between items-center">
                     <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ deskList.name }}</h5> 
                     <i class="fa-solid fa-pen"></i>
                  </div>
               </div>
               <Form @submit="createCard(deskList.id)">
                  <div class="grid gap-6 mb-6 md:grid-cols-2">
                     <div>
                           <label for="card_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Добавить карточку</label>
                           <Field  
                              @keyup="setJustLoaded()"
                              name="cardName"
                              
                              type="text" 
                              id="card_name"
                           >
                              <input 
                                 v-model="cardNames[deskList.id]" 
                                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Введите название"
                              />
                           </Field>
                        </div>
                  </div>
                  <button @click="$store.state.desk_list_input_id = deskList.id" type="submit" class="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Добавить</button>
               </Form>
               <div v-if="$store.state.loadingCard && $store.state.desk_list_input_id == deskList.id" role="status">
                  <Loading/>
               </div>
               <ShowList ref="showList" v-else :cards="deskList.cards" :listId= "deskList.id"/>
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
import { ref, onMounted } from 'vue'
const showList = ref(null)

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
         value: '',
         justLoaded: false,
         cardNames: [],
         listUrl: '/api/desk-lists/',
         listVar: 'deskLists',
         deskLists: {
            url:'/api/desk-lists/',
            var: 'deskLists',
            params: {
               desk_id: this.deskid
            },
            method: 'get'
         },
         updateListsParams:{
            params: {
               _method: 'PUT'
            },
            method: 'post',
         },
         deleteListParams: {
            params: {
               _method: 'DELETE'
            },
            method: 'post'
         },
         createListParams: {
            params: {
               name: null,
               desk_id: this.deskid
            },
            method: 'post',
         },
         createCardParams:{
            method: 'post',
            action: 'createCardParams',
         },
         updateDeskParams:{
            method: 'post',
            params: {
               _method: 'PUT'
            },
         }
      }
   },
   methods:{
      updateDeskList(id, name){
         this.updateListsParams.url = this.listUrl + id
         this.updateListsParams.var = this.listVar
         this.updateListsParams.params.name = name
         this.$store.state.loadingList = true
         this.$store.commit('axiosInstance',this.updateListsParams)
         // this.loadingList = true;
      //    axios.post('/api/desk-lists/'+id,{
      //          _method: 'PUT',
      //          name: name,
      //       })
      //       .then(response => {
      //          this.desk_list_input_id = null;
      //          // this.deskLists = this.deskLists.filter(item => item.id !== deskListid);
      //       })
      //       .catch(error => {
      //          console.log(error);
      //       })
      //       .finally(() => {
      //          this.loadingList = false;
      //       })
      },
      setJustLoaded(){
         this.justLoaded = false;
      },
      deleteList(deskListid){
         if(confirm('Вы действительно хотите удалить лист?')){
            
            this.deleteListParams.url = this.listUrl+ deskListid
            this.deleteListParams.var = this.listVar
            this.deleteListParams.id = deskListid
            this.$store.commit('axiosInstance',this.deleteListParams)
         }
         // if(confirm('Вы действительно хотите удалить лист?')){
         //    axios.post('/api/desk-lists/'+deskListid,{
         //       _method: 'DELETE',
         //    })
         //    .then(response => {
         //       console.log('response',response);
         //       console.log('this.deskLists',this.deskLists);
         //       this.deskLists = this.deskLists.filter(item => item.id !== deskListid);
         //    })
         //    .catch(error => {
         //       console.log(error);
         //    })
         //    .finally(() => {
         //       this.loading = false;
         //    })
         // }
      },
      createList(){
         console.log('createList')
         this.createListParams.url = this.listUrl
         this.createListParams.var = this.listVar
         this.createListParams.params.name = this.listName;
         this.$store.commit('axiosInstance',this.createListParams)
         
         // this.loading = true

         //    console.log('createDesk')
            
         // axios.post('/api/desk-lists/',{
         //    name: this.listName,
         //    desk_id: this.deskid
         // })
         // .then(response => {
         //    this.listName = '';
         //    this.deskLists.unshift(response.data.data);
         //    this.justLoaded=true;
         // })
         // .catch(error => {
         //    console.log(error);
         // })
         // .finally(() => {
         //    this.loading = false;
         // })
      },
      createCard(deskListid){

         this.$store.commit('set',{
            type: 'loadingCard',
            var:'loading',
            val: true
         })
         this.createCardParams.url = this.$store.state.cardUrl
         this.createCardParams.var = this.$store.state.cardVar
         this.createCardParams.params = {name: this.cardNames[deskListid], desk_list_id: deskListid}
         this.$store.commit('axiosInstance', this.createCardParams)
         // axios.post('/api/card/',{
         //    name: this.cardNames[deskListid],
         //    desk_list_id: deskListid
         // })
         // .then(response => {
         //    // this.listName = '';
         //    // this.deskLists.unshift(response.data.data);
         //    // this.justLoaded=true;
         //    // this.$store.commit('axiosInstance',this.deskLists)
         //    this.$store.commit('set',{
         //          var: 'cardCreate',
         //          card: response.data.data,
         //          listId: deskListid
         //       })
         // })
         // .catch(error => {
         //    console.log(error);
         // })
         // .finally(() => {
         //    // this.loading = false;
         //    this.$store.commit('set',{
         //       var:'loading'
         //    })
         // })
         },
      saveName(){
         this.updateDeskParams.url = this.$store.state.deskUrl + this.deskid;
         this.updateDeskParams.params.name = this.name;
         this.$store.commit('axiosInstance', this.updateDeskParams)


         console.log('this.name', this.name)
         // axios.post('/api/desks/'+this.deskid,{
         //    _method: 'PUT',
         //    name: this.name
         // })
         // .then(response => {
         //    this.name = response.data.data.name
         // })
         // .catch(error => {
         //    console.log(error);
         //    this.errored = true;
         // })
         // .finally(() => {
         //    this.loading = false;
         // })
      }
   },
   computed: {
      schema() {
         if(!this.justLoaded){
            return yup.object({
               name: yup.string().required('Это поле обязательно для заполнения'),
               
               // cardName: yup.string().required('Это поле обязательно для заполнения'),
            });
         }
      },
      schemaList(){
         if(!this.justLoaded){
            return yup.object({
               listName: yup.string().required('Это поле обязательно для заполнения'),
            });
         }
      }
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
         this.$store.commit('axiosInstance',this.deskLists)
      },

}
</script>

<style>

</style>