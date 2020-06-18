export function setPageTitle(state, title) {
  state.page.title = title;
}
export function setPageName(state, name) {
    state.page.name = name;
}

export function setPageSetting(state, setting) {
  const activePageName = state.activePageName || 'page'
  const activePageStore = state[activePageName].page ? state[activePageName].page : state[activePageName]
  activePageStore.settings[setting.setting] = setting.value;
}

export function setActivePageName(state, name) {
  state.activePageName = name;
}
