import { inject } from 'vue';

export default function useTabSession() {
  const db = inject('db');

  //put tabsession to db
  const saveTabSession = async (id, tabsession) => {
    await db.tabsession.put({
      id,
      name: tabsession.name,
      tabs: tabsession.tabs,

    });
  };

  const getTabSessionById = async (id) => {
    let tab = await db.tabsession.get(id);
    return tab;
  };

  const getAllTabSessions = async () => {
    let tabs = await db.tabsession.toArray();
    return tabs;
  };

  return {
    saveTabSession,
    getTabSessionById,
    getAllTabSessions,
  };

}
