#! /usr/bin/env node

var fs = require('fs'),
    program = require('commander'),
    twig = require('twig').twig,
    glob = require('glob'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    pkgJSON = require("./package.json");

program
    .version(pkgJSON.version)
    .usage("[twig directory] --base [directory] --output [directory] ")
    .description(pkgJSON.description)
    .option(
        '-o, --output <directory>',
        'define the output directory'
    )
    .option(
        '-b, --base <path>',
        'define the base path [optional]'
    )
    .action(function(input) {

        console.log("Building HTML with Twig...");

        var outputPath = program.output;

        // Check if output path exist
        try {
            var stats = fs.lstatSync(program.output);
            // Directory exist
            if (stats.isDirectory()) {}
        } catch (e) {
            // Make directory
            mkdirp(outputPath, function (err) {
                if (err) console.error(err)
            });
        }

        // Glob options
        var options = {
            ignore: [program.output + '/**', 'node_modules/**', '**/_*/**']
        };

        glob(input, options, function(er, files) {
            files.forEach(function(input) {
                var basePath = program.base;
                var inputPath = path.dirname(input);
                var inputFile = path.parse(input).base;

                // Is a root path defined?
                if (basePath) {
                    var regex = new RegExp('^' + basePath + '?');
                    var cleanPath = inputPath.replace(regex,'').replace(/^\//,'');
                    inputPath = cleanPath;
                }

                // Define output path using output and input filename
                var output = path.normalize(program.output + '/' + inputPath + '/' + path.parse(inputFile).name);


                // Create path array and remove empty items
                var pathArray = inputPath.split('/').filter(function(v) {
                    return v !== ''
                });

                // Is input within a directory?
                if (pathArray.length > 0) {
                    try {
                        var stats = fs.lstatSync(outputPath);

                        // Directory exist?
                        if (stats.isDirectory()) {
                            twigify(input, output);
                        }
                    } catch (e) {
                        // Make directory
                        mkdirp(outputPath, function (err) {
                            if (err) console.error(err)
                        });

                        twigify(input, output);
                    }
                } else {
                    // input is at base path
                    twigify(input, output);
                }
            });
        });
    })
    .parse(process.argv);

function twigify(input, output) {
    console.log('Building: %s --> %s FROM BASE --> %s', input, output, program.base);
    twig({
        base: program.base,
        path: input,
        allowInlineIncludes: true,
        load: function(template) {
            fs.writeFileSync(output, template.render(), {
                flags: 'w'
            });
        }
    });
}