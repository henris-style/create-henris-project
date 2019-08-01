module.exports = {
  prompts() {
    return [
      {
        name: 'project_name',
        message: 'Project name',
        default: this.outFolder,
        filter: val => val.toLowerCase(),
        store: true
      },
      {
        name: 'project_description',
        message: 'Project description',
        default: 'My New Project',
        store: true
      },
      {
        name: 'project_author',
        message: 'Author name',
        default: this.gitUser.username || this.gitUser.name,
        store: true
      },
      {
        name: 'project_type',
        message: 'Which framework would you like to use?',
        type: 'list',
        choices: ['nuxt', 'gatsby', 'next'],
        default: 'nuxt',
        store: true
      },
      {
        name: 'project_options',
        message: 'Which addons do you want to add?',
        type: 'checkbox',
        choices: [
          { name: 'Guyn', checked: false },
          { name: 'Stylelint', checked: false }
        ],
        store: true
      }
    ]
  },
  actions: [
    {
      templateDir: 'nuxt',
      type: 'add',
      files: '**'
    },
    {
      type: 'move',
      patterns: {
        'nuxt/**': '**',
        _assets: 'assets',
        _gitignore: '.gitignore',
        '_eslintrc.js': '.eslintrc.js',
        '_package.json': 'package.json'
      }
    }
  ],
  async completed() {
    this.gitInit()
    await this.npmInstall()

    console.log()
    console.log(this.chalk.bold(`  You are done! Happy developing.\n`))
    console.log()
    console.log(`  Go to your project - cd ${this._answers.project_name}`)
    console.log(`  Run 'npm run dev' do get started..`)
    console.log()
  }
}
