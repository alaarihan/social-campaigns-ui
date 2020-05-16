export function setPageTitle(state, title) {
  state.page.title = title;
}
export function setPageName(state, name) {
    state.page.name = name;
}

export function setPageSetting(state, value) {
    state[value.page].settings[value.setting] = value.value;
}

export function setSetting(state, setting) {
  state.page.settings[setting.setting] = setting.value;
}
