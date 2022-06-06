<template>
<!--    <div>-->
<!--      <span>this is tab session page</span>-->
<!--      <div @click="goToBrowserPage">go to browser</div>-->
<!--    </div>-->

  <div
    id="browser"
    class="flex flex-col"
  >
    <!-- header -->
    <SessionTabsHeader></SessionTabsHeader>

    <div class="px-8 py-2 border-b border-gray-200">
    <!-- bar -->
      <SessionTabsBar
        @show-tab-url="showTabGridUrl"
        @get-current-tabs="getCurrentWindowTabs"></SessionTabsBar>

    </div>

    <!-- content -->
    <div class="main flex-grow w-full overflow-y-auto">
      <SessionTabsGrid ref="tabGrid" :wins="wins"></SessionTabsGrid>
    </div>

  </div>
</template>

<script>
  import { inject, ref } from 'vue';
  import SessionTabsHeader from './tabs/SessionTabsHeader.vue';
  import SessionTabsBar from './tabs/SessionTabsBar.vue';
  import SessionTabsGrid from './tabs/SessionTabsGrid.vue';

  export default {
    name: 'TabSession',
    components: { SessionTabsBar, SessionTabsHeader, SessionTabsGrid },
    setup() {

      // change page state
      const changePage = inject('changePage');

      const goToBrowserPage = () => {
        changePage('browser');
      };

      const wins=ref([]);
      // get all tabs
      const getCurrentWindowTabs = async () => {
        console.log("-------start get tabs session");

        let winsess = await chrome.windows.getAll();
        console.log("------------>winsess:", winsess);
        winsess.forEach( (win ,index )=>{
          let wid = win.id;
          new Promise((resolve, reject) => {
            let tabs = chrome.tabs.query({
              windowId: wid,
            });
            resolve(tabs);
          }).then(res => {
            console.log("------>Window-",index,"-",wid,":\n");
            console.log("------------>tbs:\n", res);
            let tmpw = ref(null);
            tmpw.id = wid;
            tmpw.name = "Window-"+index+"-"+wid;
            tmpw.tabs = res;
            console.log("------------>tmpw:\n", tmpw);
            wins.value.push(tmpw);

          })
        });

        console.log("------------>wins:\n", wins);


        // $emit('change-browser-mode', 'tabs')
        // changeBrowserModeHandler('tabs');
      };
      const tabGrid = ref(null);
      const showTabGridUrl = () => {
        tabGrid.value.showTaburl();
      };

      return {
        goToBrowserPage,
        wins,
        getCurrentWindowTabs,
        showTabGridUrl,
        tabGrid,
      }
    }
  };
</script>


<style lang="scss" scoped>
  .main::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  .all-center {
    @apply flex justify-center items-center;
  }
</style>
