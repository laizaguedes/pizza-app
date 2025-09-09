````bash
npx create-next-app@latest pizza-app
````

√ Would you like to use TypeScript? ... No / *Yes

√ Which linter would you like to use? » Biome

√ Would you like to use Tailwind CSS? ... No / *Yes

√ Would you like your code inside a `src/` directory? ... No / *Yes

√ Would you like to use App Router? (recommended) ... No / *Yes

√ Would you like to use Turbopack? (recommended) ... *No / Yes

√ Would you like to customize the import alias (`@/*` by default)? ... *No / Yes

````bash
npm i axios zustand
````

````bash
npm i -D prisma

npx prisma init
````

1. configurar a variável do banco no .env
2. Criar o banco de dados no schema.prisma

````bash
npx prisma migrate dev
````

1. Configurar arquivo lib/prisma.ts
2. criar arquivo seed.ts
3. configurar o prisma no package.json

````bash
npm i -D ts-node

npx prisma db seed
````