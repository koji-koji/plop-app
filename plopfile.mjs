import minimist from 'minimist'

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  // 追加
  // コマンドライン引数を解析するために minimist を使用
  // process.argv はコマンドライン引数の配列で、最初の2つの要素は Node.js の実行バイナリとスクリプトのパスなので、slice(2) を使って実際の引数を取得する
  const args = minimist(process.argv.slice(2))

  plop.setGenerator('component', {
    description: 'React component generator',
    prompts: [
      // 追加
      // コマンドライン引数に name が含まれていない場合のみ、プロンプトを表示する
      ...(!args.name
        ? [
            {
              type: 'input',
              name: 'name',
              message: 'Component name?',
            },
          ]
        : []),
      ...(!args.type
        ? [
            {
              type: 'list',
              name: 'type',
              message: 'Choose the component path:',
              choices: ['common', 'features', 'layout'],
            },
          ]
        : []),
    ],
    actions: function (data) {
      // 追加
      data.name = data.name || args.name
      data.type = data.type || args.type

      if (!data.name) return []

      const actions = [
        {
          type: 'add',
          path: 'src/components/{{type}}/{{pascalCase name}}.tsx',
          templateFile: 'plop-templates/component/component.tsx.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{type}}/{{pascalCase name}}.stories.tsx',
          templateFile: 'plop-templates/component/component.stories.tsx.hbs',
        },
      ]

      return actions
    },
  })
}
