<template>
   <Form v-slot="{ handleSubmit }">
   <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
            <label for="card_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Редактировать карточку</label>
            <Field  
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               name="cardName"
               v-model="$store.state.cardName" 
               type="text" 
               id="card_name"
            />
         </div>
   </div>
   <button @click="handleSubmit($event, update)" type="submit" class="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Сохранить</button>
   </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
export default {
   components:{
      Form, 
      Field,
      ErrorMessage
   },
   props: [
      'cardid', 'cardname', 'list_id'
   ],
   data(){
      return {
         cardName: null,
         updateCardParams: {
            params: {
               _method: 'PUT'
            },
            method: 'post'
         }
      }
   },
   methods:{
      update(){
         console.log('updateCard', this.list_id);
         this.updateCardParams.url = this.$store.state.cardUrl + this.cardid;
         this.updateCardParams.params.name = this.$store.state.cardName
         this.updateCardParams.params.desk_list_id = this.list_id
         this.$store.commit('axiosInstance',this.updateCardParams)
      }
   },

   mounted(){
      console.log(this.cardid, this.cardname)
      this.$store.commit('set', {
         type: 'cardName',
         var: 'cardName',
         val: this.cardname
      })
   }
}
</script>

<style>

</style>