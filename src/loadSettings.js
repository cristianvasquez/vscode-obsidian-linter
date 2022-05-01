import { rules } from './rules.js'

function loadSettings () {
  let settings = {
    ruleConfigs: {},
    lintOnSave: false,
    displayChanged: true,
    foldersToIgnore: [],
  }
  const data = {}
  const storedSettings = data || {}

  for (const rule of rules) {
    settings.ruleConfigs[rule.name] = rule.getDefaultOptions()
    if (storedSettings?.ruleConfigs && storedSettings?.ruleConfigs[rule.name]) {
      Object.assign(
        settings.ruleConfigs[rule.name],
        storedSettings.ruleConfigs[rule.name]
      )

      // For backwards compatibility, if enabled is set, copy it to the new option and remove it
      if (storedSettings.ruleConfigs[rule.name].Enabled !== undefined) {
        const newEnabledOptionName = rule.enabledOptionName()
        settings.ruleConfigs[rule.name][newEnabledOptionName] =
          storedSettings.ruleConfigs[rule.name].Enabled
        delete this.settings.ruleConfigs[rule.name].Enabled
      }
    }
  }

  if (Object.prototype.hasOwnProperty.call(storedSettings, 'lintOnSave')) {
    settings.lintOnSave = storedSettings.lintOnSave
  }
  if (Object.prototype.hasOwnProperty.call(storedSettings, 'displayChanged')) {
    settings.displayChanged = storedSettings.displayChanged
  }
  if (Object.prototype.hasOwnProperty.call(storedSettings, 'foldersToIgnore')) {
    settings.foldersToIgnore = storedSettings.foldersToIgnore
  }
  return settings
}

export { loadSettings }
