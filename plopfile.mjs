import minimist from 'minimist'

export default function (plop) {
  // Use minimist to parse command-line arguments
  // process.argv is an array of command-line arguments, with the first two elements being the Node.js binary and the script path, so slice(2) is used to get the actual arguments
  const args = minimist(process.argv.slice(2))

  plop.setGenerator('component', {
    description: 'React component generator',
    prompts: [
      // Only display the prompt if the command-line arguments do not include a name
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
