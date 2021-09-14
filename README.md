# Commandline-SSG
Commandline Static Site Generating tool that helps you produce `.html` from `.txt` files

## Features
The tool is before its first release but comes up with these features already:
* accept `.txt` file to generate a `.html` file
* accept folders to generate `.html` files from `.txt` files
* goes through all the child directories  of the input folder to generate the desired files
* output folder can be externally provided to get the generated files at desired location. if not provided, the output is generated in a folder set as default output folder
* stylesheet can be externally provided in either link form or file form to add style to the webpages. If not provided, the no stylesheet is added to the webpages
* detects title and paragraph of the text file to give accurate tags in the webpage and sets title to the webpage
* if the provided file is not a text file, it exits the program soundly
* if a folder is provided, a new file called `index.html` is generated which contains link to all the files just generated

## Options

Option | Function
------------ | -------------
-h, --help | shows all the options currently active
-v, --version | output the version number
-i, --input \<type> | takes input of the file/folder
-o, --output \<type> | takes destination folder location
-s, --stylesheet \<type\> | takes any stylesheet that needs to be added to the html 


### Help
This option shows all the currently available options that can be used. It can be used in two ways `-h` or `--help`.<br>
Example:
> $ commandline-ssg -h 

### Version
This option shows the current version of the tool. It can be used in two ways `-v` or `--version`. <br>
Example:
> $ commandline-ssg -v

### Input
This option takes in the file/folder that needs to be converted to generate the static site. It converts `.txt` file to `.html` file. It can be used in two ways, `-i` or `--input`.<br>
Example:<br>
If the input element is a file
> $ commandline-ssg -i foo.txt

If the input element is a folder
> $ commandline-ssg -i folder

### Output
This option takes in the folder name where the user wants the final generated file to be. If this option is not provided, its default value `dist` is set for the folder output. It can be used in two ways, `-o` or `--output`.<br>
Example:
> $ commandline-ssg -i foo.txt -o newDist

### Stylesheet
This option takes in the stylesheet that adds style to each html file generated. It can be passed as either link or file. If it is not provided, no stylesheet is added to the webpages. It can be used in two ways, `-s` or `--stylesheet`.<br>
Example:
> $ commandline-ssg -i foo.txt -s https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css

## Sample Use
For instance, to generate html from a folder, `TextFolder`, in the project root directory in a new folder `HTMLFolder`, and add `https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css` URL stylesheet, we can write the following command:
> $ commandline-ssg -i TextFolder -o HTMLFolder -s https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css

It will do the following:<br>
If the TextFolder has one file foo.txt with these text

##### ./TextFolder/foo.txt
```
A Smart title


A short paragraph.

Another short paragraph.
```

a foo.html file will be generated in the HTMLFolder with the https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css stylesheet.

##### ./HTMLFolder/foo.html
```
<!doctype html>
<html lang="en">
<head><meta charset="utf-8">
<title>A Smart title</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<h1>A Smart title</h1>
<p>A short paragraph.</p>
<p>Another short paragraph.</p>
</body></html>
```

## Keywords

**commandline-ssg** **cli** 

## Authors

[Ritik Bheda](https://github.com/ritikbheda)

## Links

+ [GitHub Repo](https://github.com/ritikbheda/commandline-ssg)
+ [GitHub Pages README](https://ritikbheda.github.io/commandline-ssg/)
+ [GitHub Pages](https://ritikbheda.github.io/commandline-ssg/dist/index.html)