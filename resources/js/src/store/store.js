import { createStore } from 'vuex'
import router from '../router/router';
const store = createStore({
   state () {
     return {
       desks: [],
       cards: [],
       deskLists: [],
       loading: false,
       axiosInstance: axios.create(),
       desk_list_input_id:null,
      //  deskListsParams:{
      //    url:'/api/desk-lists/',
      //    var: 'deskLists',
      // },
      deskUrl:'/api/desks/',
      cardUrl:'/api/card/',
      cardVar: 'cards',
      loadingList: false,
      loadingCard: false,
      deskName: null,
      cardName: null,
      deskid: null,
     }
   },
   mutations: {
     set(state, value){
      switch (value.var){
         case 'deskLists':
            state.deskLists = value.val;
            break;
         case 'loading':
            state[value.type] = value.val;
            break;
         case 'deskName':
              state.desks.filter((desk) => {
               if(desk.id == value.deskid){
                  state.deskName = desk.name
               }
            })
         break;
         default:
            state[value.var] = value.val;
            break;
      }
     },
     axiosInstance(state, value){
      state.axiosInstance.defaults.params = value.params
      switch(value.method){
         case 'get':
            state.axiosInstance.get(value.url)
            .then(response => {
               state[value.var] = response.data.data
            })            
            .catch(error => {
               console.log(error);
            })
            .finally(() => {
               state.loadingList = false;
               state.loadingCard = false;
               state.loading = false;
            })
         break;
         case 'post':
            state.axiosInstance.post(value.url)
            .then(response => {
               switch(value.params._method){
                  case 'PUT': // update
                  state.desk_list_input_id = null
                  router.push({ name: 'showDesk', params: { deskid: state.deskid } })
                  // state.cardName = response.
                     break;
                  case 'DELETE':
                     if(value.action == 'deleteCardParams'){
                        state.deskLists.filter((item, k) => {
                           if(item.id === value.listId){
                              console.log(k);
                              state.deskLists[k].cards = state.deskLists[k].cards.filter(card => card.id !== value.cardId);
                           }
                        });
                     } else {
                        state[value.var] = state[value.var].filter(item => item.id !== value.id);
                     }
                     
                     break;
                  default: // create
                     if(value.action == 'createCardParams'){
                        state.deskLists.filter((item, k) => {
                           if(item.id === value.params.desk_list_id){
                              console.log(k);
                              state.deskLists[k].cards.unshift(response.data.data)
                              state.loadingCard = false;
                           }
                        });
                     } else {
                        state[value.var].unshift(response.data.data)
                     }
                     
                     break;
               }
               
            })
            .catch(error => {
               console.log(error);
            })
            .finally(() => {
               state.loadingList = false;
               state.loadingCard = false;
               state.loading = false;
            })
            break;

      }


      
      ;
     },
   }
 })

 export default store;