import { createStore } from 'vuex'
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
     }
   },
   mutations: {
     set(state, value){
      switch (value.var){
         case 'cards':
            // state.deskLists.filter((item, k) => {
            //    if(item.id === value.listId){
            //       console.log(k);
            //       state.deskLists[k].cards = state.deskLists[k].cards.filter(card => card.id !== value.cardId);
            //    }
            // });
            break;
         // case 'cardCreate':
         //    state.deskLists.filter((item, k) => {
         //       if(item.id === value.listId){
         //          console.log(k);
         //          state.deskLists[k].cards.unshift(value.card)
         //          state.loadingCard = false;
         //       }
         //    });
         //    // state.deskLists[value.listId].cards.unshift(value.card)
         //    break;
         case 'deskLists':
            state.deskLists = value.val;
            break;
         case 'loading':
            state[value.type] = value.val;
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
   //   getDeskLists(state, value){
   //    axios.get(value.url,{
   //       params:{
   //          desk_id: value[value.var]
   //       }
   //    })
   //    .then(response => {
   //       console.log('getDeskLists', response);
   //       store.commit('set',{
   //          var: 'deskLists',
   //          val: response.data.data
   //       })
   //       this.deskLists.forEach(el=>{
   //          this.cardNames[el.id] = ''
   //       })
   //       console.log('getDeskLists', response);
   //    })
   //    .catch(error => {
   //       console.log(error);
   //       this.errored = true;
   //    })
   //    .finally(() => {
   //       this.loading = false;
   //    })
   // },
   }
 })

 export default store;