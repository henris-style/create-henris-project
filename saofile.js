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
        name: 'project_framework',
        message: 'Choose a JS framework',
        type: 'list',
        choices: ['Vue', 'React', 'Angular', 'None'],
        default: 'Vue',
        store: true,
      },
      {
        name: 'project_type',
        message: 'Which Starter would you like to use?',
        type: 'list',
        choices: ['NuxtJS', 'Vue Starter'],
        default: 'NuxtJS',
        store: true,
        when: answers => answers.project_framework === 'Vue'
      },
      {
        name: 'project_type',
        message: 'Which Starter would you like to use?',
        type: 'list',
        choices: ['NestJS', 'Angular Starter'],
        default: 'NestJS',
        store: true,
        when: answers => answers.project_framework === 'Angular'
      },
      {
        name: 'project_type',
        message: 'Which Starter would you like to use?',
        type: 'list',
        choices: ['NextJS', 'Gatsby', 'React-starter'],
        default: 'NextJS',
        store: true,
        when: answers => answers.project_framework === 'React'
      },
      {
        name: 'project_bundler',
        message: 'Which Bundler would you like to?',
        type: 'list',
        choices: ['webpack','parcel','none'],
        default: 'webpack',
        store: true,
        when: answers => answers.project_framework === 'None'
      },
      {
        name: 'project_options',
        message: 'Which addons do you want to add?',
        type: 'checkbox',
        choices: [
          { name: 'Guyn', checked: false },
          { name: 'Stylelint', checked: true },
          { name: 'ESLint', checked: true }
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
