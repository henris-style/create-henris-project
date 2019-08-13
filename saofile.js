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
        choices: [
          { name: 'Node Sass', value: 'node-sass'},
          { name: 'Dart Sass', value: 'sass' }
        ],
        default: 'node-sass',
        store: true,
      },
      {
        name: 'project_options',
        message: 'Which addons do you want to add?',
        type: 'checkbox',
        choices: [
          { name: 'Guyn', value: 'guyn', checked: false },
          { name: 'Stylelint', value: 'stylelint', checked: true },
        ],
        store: true
      }
    ]
  }, 
  templateData() {
    const guyn = this.answers.project_options.includes('guyn');
    const stylelint = this.answers.project_options.includes('stylelint');
    const nodeSass = this.answers.project_sass == 'node-sass';
    const sass = this.answers.project_sass == 'sass';
    return { guyn, stylelint, nodeSass, sass }
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
    // await this.npmInstall()
    var command = "mkdir -p assets/scss && cd assets/scss && (curl -s0 https://raw.githubusercontent.com/henris-style/setup-files/master/setup.sh) | bash";
    var dir = exec(command, function(err, stdout) {
      if (err) {
        console.log('couldn\'t create all Henri\'s files\n\n', err);
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
