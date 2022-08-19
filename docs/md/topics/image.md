Raster images can be represented in the local database of sa.engine
and also appear in data streams. The OSQL datatype to represent raster
images is named `Image`. An object `:im` of type `Image` represents
meta-data properties of an image along with its **pixel
array**`:im[x,y]` of pixels at positions `x/y`, where `:im[1,1]`
represents the lowest leftmost corner of the image. Each 24-bits pixel
in the pixel array is represented as a **pixel vector** `[R,G,B]` of
red-green-blue 8-bits color intensities; thus the image depth is
always three.

A raster image stored in an external `.bmp` file is viewed as an
image object by the function `bmp_image(Charstring file)->Inage`. For
example, the following OSQL call accesses a small raster image file
stored in the system model `data`:

```LIVE
set :im = bmp_image(system_model_folder()+'data/domherre.bmp')
```

> [exercise] **Exercise:** Use the system call
  `signature(methods(typenamed('Image')))` to find out how to
  how to obtain the number of pixels in the image `:im`.

We are now ready to do some simple analyses of our image. For example,
the following function finds the coordinates of the pixels in the
image dominated by red with a factor `f` over blue and green:

```LIVE
create function red(Image img, Real f)
                  -> Bag of (Integer x, Integer y)
    as select x, y
         from Integer r, Integer g, Integer b
         where [r,g,b] = img[x,y]
           and r > f * g
           and r > f * b
```

> [exercise] **Exercise:** Use the function `red` to find the
  coordinates of the pixels in `:im` dominated by red. 

> [note] **Note:** You can access the pixel vector of `:im` at position
> `x/y` with `:im[x,y]`.

> [exercise] **Exercise:** Use `red()` combined with pixel vector access
> to find the pixel vectors dominated by red.

The physical representation of raster images is a sequence of pixel
triplets using the 24 bits pixel array representation of the Device
Independent Bitmap format (DIB) used in [.bmp
files](https://en.wikipedia.org/wiki/BMP_file_format).  
The physical representation on an `Image` object is called the *DIB
array*. It is represented as an unsigned byte sequence represented of
type `Memory` and accessed by the function
`dib_array(Image)->Memory`. The order of the bytes in a DIB array is
row-by-row bottom-up in blue - green - red order. Since the depth of
the images is three, each pixel of the image is represented by three
consecutive bytes in the DIB array.

> [exercise] **Exercise:** Use the function `size(Memory)->Integer` to
  see the size of `:im` in bytes. How would the same query be
  expressed without explicitly accessing the DIB vector?


## Functions
