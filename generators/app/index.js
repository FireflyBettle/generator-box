const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting() {
    // Yeoman再次询问用户环节会自动调用此方法
    // 在此方法中可以调用父类的 prompt() 方法发出对用户的命令行询问
    // this.prompt接收一个数组，数组的每一项都是一个问题
    // this.prompt返回一个promise对象

    return this.prompt([
      {
        // input 使用用户输入的方式接收提交信息
        type: 'input',
        // 最终得到结果的键
        name: 'name',
        // 给用户的提示
        message: 'your project name is :',
        // 默认值
        default: this.appname // appname 为项目生成目录名称
      },
      {
        type: 'input',
        name: 'title',
        message: 'your title is :',
        default: '目录'
      },
    ])
      .then(answers => {
        // answers是用户输入后我们拿到的一个结果
        // answers => { name: 'user input value', title: 'user input value'}
        // 赋值给属性我们可以在writing中使用它
        this.answers = answers
      })
  }
  writing () {
    // 把每一个文件都通过模板转换到目标路径

    const templates = [
      'assets',
      'components',
      'config',
      'pages',
      'services',
      'pages',
      'pages',
      '.editorconfig',
      '.gitignore',
      'abc.json',
      'alias.config.js',
      'development.md',
      'package.json',
      'QuickStart.md',
      'assets/img/logo.png',
      'README.md',
      'snapshot.png',
    ]

    templates.forEach(item => {
      // item => 每个文件路径
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answers
      )
    })
  }
}
