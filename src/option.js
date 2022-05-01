/** Class representing an option of a rule */

export class Option {
  name
  description
  ruleName
  defaultValue
  protected

  /**
   * Create an option
   * @param {string} name - The name of the option
   * @param {string} description - The description of the option
   * @param {any} defaultValue - The default value of the option
   * @param {string?} ruleName - The name of the rule this option belongs to
   */
  constructor (name, description, defaultValue, ruleName = '') {
    this.name = name
    this.description = description
    this.defaultValue = defaultValue

    if (ruleName) {
      this.ruleName = ruleName
    }
  }

  setOption (value, settings) {
    settings.ruleConfigs[this.ruleName][this.name] = value
  }
}

export class BooleanOption extends Option {
  public defaultValue: boolean
}

export class TextOption extends Option {
  public defaultValue: string
}

export class TextAreaOption extends Option {
  public defaultValue: string
}

export class MomentFormatOption extends Option {
  public defaultValue: boolean
}

export class DropdownRecord {
  public value: string
  public description: string

  constructor (value: string, description: string) {
    this.value = value
    this.description = description
  }
}

export class DropdownOption extends Option {
  public defaultValue: string
  public options: DropdownRecord[]
  string

?:
  null
|
  this
) {
  options = options

  constructor (name: string, description: string, defaultValue: string, options: DropdownRecord[], ruleName

.

  super (name, description, defaultValue, ruleName);
}
}
