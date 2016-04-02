# NYC DOT Cameras

This is just a [website](http://nyc.narp.xyz) for easier access to the NYC DOT Cameras.

Their [website](http://dotsignals.org/multiview2.php) isn't the simplest.
Although their [homepage](http://dotsignals.org) is nice.

## Usage

Navigate to [`http://nyc.narp.xyz`](http://nyc.narp.xyz)

You can also specify a certain number of feeds to load via a hash at the end of
the URL.

[`http://nyc.narp.xyz/#40`](http://nyc.narp.xyz/#40)

## Note

There around 425 active cameras and each camera feed provides roughly 20 KB images.

`425 * 20 KB = 8.5 MB`

So if you are expecting all the images to be loaded and updated every second,
make sure you have the bandwidth.

## Run Locally

Install Babel Stuff

```bash
npm install
```

Transpile Javascript with Babel

```bash
npm run build
```

Run a web server in the directory

```bash
npm run server
```
