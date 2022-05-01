import { rules, getDisabledRules } from './rules.js'
import DiffMatchPatch from 'diff-match-patch'
import { loadSettings } from './loadSettings.js'

function lintText (oldText, settings, metadata) {
  let newText = oldText

  // remove hashtags from tags before parsing yaml
  const tag_rule = rules.find((rule) => rule.name === 'Format Tags in YAML')
  const options = tag_rule.getOptions(settings)
  if (options[tag_rule.enabledOptionName()]) {
    newText = tag_rule.apply(newText, options)
  }

  const disabledRules = getDisabledRules(newText)

  for (const rule of rules) {
    if (disabledRules.includes(rule.alias())) {
      continue
    }

    const options = Object.assign(
      metadata,
      rule.getOptions(settings)
    )

    if (options[rule.enabledOptionName()]) {
      // console.log(`Running ${rule.name}`);
      newText = rule.apply(newText, options)
    }
  }

  return newText
}

async function runLinter () {
  console.log('running linter')

  const settings = loadSettings()

  const oldText = 'something'

  const metadata = {
    // 'metadata: file created time': moment(file.stat.ctime).format(),
    // 'metadata: file modified time': moment(file.stat.mtime).format(),
    // 'metadata: file name': file.basename,
    'metadata: file created time': 'Other',
    'metadata: file modified time': 'Another',
    'metadata: file name': 'The file',
  }

  const newText = lintText(oldText, settings, metadata)

  // Replace changed lines
  const dmp = new DiffMatchPatch.diff_match_patch() // eslint-disable-line new-cap
  const changes = dmp.diff_main(oldText, newText)
  let curText = ''
  changes.forEach((change) => {
    function endOfDocument (doc) {
      const lines = doc.split('\n')
      return { line: lines.length - 1, ch: lines[lines.length - 1].length }
    }

    const [type, value] = change

    if (type == DiffMatchPatch.DIFF_INSERT) {
      // editor.replaceRange(value, endOfDocument(curText))
      curText += value
    } else if (type == DiffMatchPatch.DIFF_DELETE) {
      const start = endOfDocument(curText)
      let tempText = curText
      tempText += value
      const end = endOfDocument(tempText)
      // editor.replaceRange('', start, end)
    } else {
      curText += value
    }
  })

  const charsAdded = changes.map((change) => change[0] === DiffMatchPatch.DIFF_INSERT ? change[1].length : 0).reduce((a, b) => a + b, 0)
  const charsRemoved = changes.map((change) => change[0] === DiffMatchPatch.DIFF_DELETE ? change[1].length : 0).reduce((a, b) => a + b, 0)
  console.log(charsAdded, charsRemoved)

}

export { runLinter }
