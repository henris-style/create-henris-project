var exec = require('child_process').exec;


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
        name: 'project_sass',
        message: 'Choose a Sass Version to use',
        type: 'list',
        choices: ['Node Sass', 'Dart Sass'],
        default: 'Node Sass',
        store: true,
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
      templateDir: 'template',
      type: 'add',
      files: '**'
    },
    {
      type: 'move',
      patterns: {
        'nuxt/**': '**',
        gitignore: '.gitignore',
        '_package.json': 'package.json'
      }
    }
  ],
  async completed() {
    this.gitInit() 
    // await shell.exec('script/henris-setup.sh')
    // await this.npmInstall()
    dir = exec("node script/henris-steup", function(err, stdout, stderr) {
      if (err) {
        // should have err.code here?  
      }
      console.log(stdout);
    });
    
    console.log()
    console.log(this.chalk.bold(`  You are done! Happy developing.\n`))
    console.log()
    console.log(`  Go to your project - cd ${this._answers.project_name}`)
    console.log(`  Run 'npm run dev' do get started..`)
    console.log()
  }
}
