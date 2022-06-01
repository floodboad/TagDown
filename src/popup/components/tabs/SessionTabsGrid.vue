<template>
  <div @click="reloadPreSes">preview session </div>
  <div v-for="pretab in preSessions"
  :key="pretab.id">
    <span @click="showTabSession(pretab)">{{ pretab.name }}</span>

  </div>
  <div>current session </div>
    <div v-for="win in wins"
    :key = "win.id">
      <button @click="onsubmit(win)">
        <span>{{ win.name }}</span>
      </button>
      <div v-for="tab in win.tabs"
           :key = "tab.id">
<!--        <img src=" {{ tab.hasOwnProperty('favIconUrl') ? tab.favIconUrl : '' }} "  onerror="this.src=''">-->
        <span>{{ tab.title }}</span>
        <span v-show="flgShowUrl">{{ tab.url }}</span>
      </div>


    </div>

</template>

<script>
  // import BookmarkFavicon from '../Browser/BookmarkFavicon';
  // import PopupMenu from '../Modal/PopupMenu';
  // import InputModal from '../Modal/InputModal';
  // import PromptModal from '../Modal/PromptModal';
  import useTabSession from '@/composables/useTabSession';

  import {
    ref, computed, watch, inject, onMounted,
  } from 'vue';

  export default {
    name: 'SessionTabsGrid',
    // components: {
    //   BookmarkFavicon,
    //   PopupMenu,
    //   InputModal,
    //   PromptModal,
    // },
    props: {
      wins: {
        type: Array,
        default() {
          return [];
        },
      },
      flgShowUrl: {
        type: Boolean,
        default() {
          return true;
        },
      },

    },
    setup(props) {
      const { saveTabSession, getTabSessionById, getAllTabSessions } = useTabSession();
      // onMounted(() =>{
      //   console.log("---------->wins in Session :", props.wins);
      // });

      const onsubmit = async (win) => {
        alert(win.name);
        let winse = {
          id: win.id,
          name: win.name,
          tabs: win.tabs
        };
        await saveTabSession(win.id, winse).then( async (res) =>{
          console.log("--------->success : ", res);
          await getTabSessionById(win.id).then( (res1) =>{
            console.log("--------->get tabWin from db: ", res1);

          });
        }).catch( (err) => {
          console.error('Error:',err);
        } );

      };
      // get all tabs
      // const getCurrentWindowTabs = async () => {
      //
      //   let tmpWim = ref(null);
      //   let winsess = await chrome.windows.getAll();
      //   console.log("------------>wins:", winsess);
      //   winsess.forEach( (win ,index )=>{
      //     let tmpw = ref(null);
      //     let wid = win.id;
      //     new Promise((resolve, reject) => {
      //       let tabs = chrome.tabs.query({
      //         windowId: wid,
      //       });
      //       resolve(tabs);
      //     }).then(res => {
      //       console.log("------>Window-",index,"-",wid,":\n");
      //       console.log("------------>tbs:\n", res);
      //       tmpw.id = wid;
      //       tmpw.name = "Window-"+index+"-"+wid;
      //       tmpw.tabs = res;
      //       console.log("------------>tmpw:\n", tmpw);
      //       tmpWim.push(tmpw);
      //
      //     })
      //   });
      //   console.log("------------>tmpWim:\n", tmpWim);
      //   return tmpWim;
      //
      // };
      const showTaburl = () => {
        props.flgShowUrl = !props.flgShowUrl;
      };

      const preSessions = ref([]);
      const getAllTabsFromDB = async () => {
       await new Promise((resolve) => {
          return resolve(getAllTabSessions());
        }).then((res) => {
          preSessions.value = res;
          console.log("------> all pre session :", preSessions.value);
        }) ;
      };

      const reloadPreSes = async () => {
       await getAllTabsFromDB();
      };

      const showTabSession = async (preTabS) => {
        alert("--->"+preTabS.tabs.length);
        let tab = await getTabSessionById(preTabS.id);
        console.log("-------->tab: ", tab);
      };

      return {
        onsubmit,
        showTaburl,
        preSessions,
        getAllTabsFromDB,
        reloadPreSes,
        showTabSession,

      }


    }

  };
</script>

<style scoped>

</style>
