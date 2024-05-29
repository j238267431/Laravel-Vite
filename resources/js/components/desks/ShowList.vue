<template>

   <div v-for="card in cards" :key="card.id" class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">


         <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
         </a>

         <p  class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ card.name }}</p>
         <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
         </a>
         <button @click="deleteCard(card.id)" class="w-full block max-w-sm mb-3 bg-transparent dark:border-gray-700 shadow hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-gray-200 hover:border-transparent rounded-b">
            Удалить
         </button> 


   </div>

</template>

<script>
import Loading from './Loading.vue';
export default {
   data(){
      return {
         deleteCardParams:{
            params: {
               _method: 'DELETE'
            },
            method: 'post'
         }
      }
   },
   components: {
      Loading
   },
   props: [
      'cards',
      'listId'
   ],
   methods:{
      
      
      deleteCard(cardId){
         if(confirm('Вы действительно хотите удалить лист?')){
            this.deleteCardParams.url = this.$store.state.cardUrl + cardId
            this.deleteCardParams.cardId = cardId
            this.deleteCardParams.listId = this.listId
            this.deleteCardParams.action = 'deleteCardParams'
            this.$store.commit('set',{
               type: 'loadingCard',
               var:'loading',
               val: true
            })
            this.$store.commit('axiosInstance',this.deleteCardParams)
         }
      },
   },
}
</script>

<style>

</style>