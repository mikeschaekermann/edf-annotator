# CrowdEEG EDF Annotator Library

The CrowdEEG EDF Annotation Library implements classification and feature detection tasks for time series stored in EDF format.

![A screenshot of the Time Series Annotator.](https://s3.amazonaws.com/curio-media/github-media/time-series-annotator.png)

## Features
- Support for feature annotation tasks.
- Support for interactive practice tasks.
- Support for multivariate time series.
- Support for medical time series in EDF format.
- Integrated support for use in [CrowdCurio](http://crowdcurio.com/).

## Build Process
We use Browserify, Wachify and Uglify in our build process. All three tools can be installed with NPM.

>npm install -g browserify

>npm install -g watchify

>npm install -g uglify-js

To build the script bundle *without* minification, run:
>browserify lib/main.js -o bundle.js

To build *with* minification, run:
>browserify lib/main.js | uglifyjs bundle.js

To watch for file changes and automatically bundle *without* minification, run:
>watchify lib/main.js -o bundle.js

## Attribution
When publishing academic work (including, but not limited to papers, book chapters or posters) based on this software or modifications of this software, please cite this repository and the authors Mike Schaekermann, Josh Bradshaw, and Edith Law.

## Contact
Mike Schaekermann, University of Waterloo