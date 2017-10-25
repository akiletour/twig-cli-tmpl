A small command-line tool that allows you to generate your .twig files in .html with NPM.

## Installation

```
$ npm install twig-cli-tmpl
```

## Usage

```
$ twig-cli [twig directory] --base [directory] --output [directory] 
```

## Explanation

```
Options:
    -V, --version             output the version number
    -o, --output <directory>  define the output directory
    -b, --base <path>         define the base path [optional]
    -h, --help                output usage information
```

## Example

As you can see in the `example` directory you have an `index.html.twig` file that contains extended call of `layouts/base.html.twig`.

Thanks to the **--base** variable, it allows us to place ourselves in the `example/` directory and compile from there.

```
$ twig-cli example/*.html.twig --base example/ --output public/
```

All files compiled at the root of `example` will be placed in the `public` directory. The file `index.html.twig` becomes `index.html`.

## Issues
Find a bug ? Smash this [issue](https://github.com/Akiletour/twig-cli-tmpl/issues) link to report it !

## Thanks

Thanks to [Nathan Searles](https://github.com/nathansearles/) who is at the origin of this plugin idea ! ❤️