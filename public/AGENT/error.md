Microsoft Windows [Version 10.0.22631.6199]
(c) Microsoft Corporation. Tüm hakları saklıdır.

C:\Users\ati>cd c:/users/ati/.gemini/antigravity/scratch/metal-poster-pro

c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro>npm run dev -- --port 5173

> metal-poster-pro@0.1.0 dev
> next dev --port 5173

⚠ Warning: Next.js inferred your workspace root, but it may not be correct.
 We detected multiple lockfiles and selected the directory of c:\Users\ati\package-lock.json as the root directory.
 To silence this warning, set `turbopack.root` in your Next.js config, or consider removing one of the lockfiles if it's not needed.
   See https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack#root-directory for more information.
 Detected additional lockfiles:
   * c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\package-lock.json

▲ Next.js 16.1.1 (Turbopack)
- Local:         http://localhost:5173
- Network:       http://192.168.1.101:5173
- Environments: .env.local

✓ Starting...
✓ Ready in 2.1s
○ Compiling / ...
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
✓ Finished writing to filesystem cache in 19.7s
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in 'c:\Users\ati\.gemini\antigravity\scratch'
    [at finishWithoutResolve (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:565:18)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:657:14]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\DescriptionFilePlugin.js:89:43]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5]
    [at eval (eval at create (c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\tapable\lib\HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at c:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\node_modules\enhanced-resolve\lib\Resolver.js:718:5] {
  details: "resolve 'tailwindcss' in 'c:\\Users\\ati\\.gemini\\antigravity\\scratch'\n" +
    '  Parsed request is a module\n' +
    '  using description file: c:\\Users\\ati\\package.json (relative path: ./.gemini/antigravity/scratch)\n' +
    '    resolve as module\n' +
    "      c:\\Users\\ati\\.gemini\\antigravity\\scratch\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\antigravity\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\Users\\ati\\.gemini\\node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in c:\\Users\\ati\\node_modules\n' +
    '        single file module\n' +
    '          using description file: c:\\Users\\ati\\package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              c:\\Users\\ati\\node_modules\\tailwindcss.css doesn't exist\n" +
    "        c:\\Users\\ati\\node_modules\\tailwindcss doesn't exist\n" +
    "      c:\\Users\\node_modules doesn't exist or is not a directory\n" +
    "      c:\\node_modules doesn't exist or is not a directory"
}
E