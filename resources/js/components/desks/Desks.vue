<template>
  <div class="container">
   <div v-if="errored" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <span class="font-medium">Danger alert!</span> Ошибка загрузки данных <br>
      <p :key="error.id" v-for="error in errors" >{{ error }}</p>  
   </div>



<Form @submit="createDesk" :validation-schema="schema">
    <div class="grid gap-6 mb-6 md:grid-cols-2">
         <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Добавление доски</label>
            <Field @keyup="setJustLoaded()" name="name" type="text"  v-model="name" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Введите название доски"/>
            <ErrorMessage class="mt-2, text-sm, text-red-600" name="name" />
         </div>
    </div>
    <button type="submit" class="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Добавить</button>
</Form>

   <h1 class="mb-3">Доски</h1>

   <div v-if="$store.state.loading" role="status">
      <Loading/>
   </div>
   <div  v-else >
      <div v-if="$store.state.desks.length > 0" class="grid grid-flow-row-dense grid-cols-3 grid-rows-3">
         <div  v-for="desk in $store.state.desks" :key="desk.id" class="relative">
            <router-link :to="{name: 'showDesk', params: {deskid: desk.id, getDeskParams: getDeskParams}}"  href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-t shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
               <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ desk.name }}</h5>
               <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
      
            </router-link>
            <button @click="deleteDesk(desk.id)" class="w-full block max-w-sm mb-3 bg-transparent dark:border-gray-700 shadow hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-gray-200 hover:border-transparent rounded-b">
               Удалить
            </button> 

         </div>   
      
   </div>
   <div v-else>пока нет ни одной доски</div>
   </div>



  </div>
</template>

<script>

import Loading from './Loading.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { ru } from 'yup-locales';
import { setLocale } from 'yup';
setLocale(ru);
export default {
   data(){
      return {
         desks: [],
         errored: false,
         loading: true,
         name: '',
         errors: [],
         justLoaded: false,
         deleteDeskParams:{
            params:{
               _method: 'DELETE',
            },
            method: 'post',
            var: 'desks',
         },
         getDeskParams:{
            method: 'get',
            var: 'desks',
         },
         createDeskParams:{
            params:{},
            method: 'post',
            var: 'desks',
         },
      }
   },
   components:{
      Loading,
      Form, 
      Field,
      ErrorMessage
   },
   methods:{

      deleteDesk(id){
         if(confirm('Вы действительно хотите удалить доску?')){
            this.$store.commit('set',{
               type: 'loading',
               var:'loading',
               val: true
            })
            this.deleteDeskParams.url = this.$store.state.deskUrl + id
            this.deleteDeskParams.id = id
            this.$store.commit('axiosInstance', this.deleteDeskParams)
         }
      },
      
      setJustLoaded(){
         this.justLoaded = false;
      },
      
      getAllDesks(){
         this.$store.commit('set',{
            type: 'loading',
            var:'loading',
            val: true
         })
         this.getDeskParams.url = this.$store.state.deskUrl
         this.$store.commit('axiosInstance', this.getDeskParams)
      },
      createDesk(){
         this.loading = true

            console.log('createDesk')
            
         this.createDeskParams.url = this.$store.state.deskUrl
         this.createDeskParams.params.name = this.name
         this.$store.commit('axiosInstance', this.createDeskParams)

      }
   },
   computed: {
      schema() {
         if(!this.justLoaded){
            return yup.object({
               name: yup.string().required('Это поле обязательно для заполнения'),
            });
         }
      },
   },
   mounted(){
      this.getAllDesks();
   },
}
</script>

<style>

</style>