# Lab 1: Introduction to R

### Welcome to DSC 152! 🎉

By this point in your academic careers, you are likely very experienced in Python, but may have limited or no exposure to R. As a data scientist, it is useful to know both! In particular, for the more statistical applications within data science, R is often a more convenient tool than Python.

As this course focuses on statistical methodologies and the statistical aspects of data science concepts, we will thus be using exclusively R in DSC 152. This lab is meant to get you started: it is largely self-guided (just like labs in DSC 10 were for Python).


```R
# Please run this initialization cell
library(ottr)
```

## Part 1: R is kind of like Python!
At least, in certain cases. Here is an example (run these two code cells):


```R
x = 3 * 2 + 4
x
```


10



```R
x + 5
```


15


Note that the above code is R code, but it is literally indistinguishable from Python code (in fact, I grabbed it straight from Lab 0 in DSC 10 🤫).

### 1.1. The `<-` assignment operator
While the above code works perfectly fine, one odd convention in R is that in place of an `=` for assignment, R coders usually use the pattern `<-` (that's a "less than" sign followed by a "minus" sign to make that arrow). That is, run the code below to see that it works exactly the same as the first code cell above:


```R
x <- 3 * 2 + 4
x + 5
```


15


 - For general assignment of a variable like this, both work equally fine and one is not better than the other. At this point in time it is simply a historical convention to use `<-`, stemming from the fact that early versions of R *only* allowed variable assignment via `<-`. 

 - `=` became allowed for variable assignment later on for ease of transition for programmers coming from other languages. But, `<-` is still much more commonly used among people who frequently code in R.

 - In my code, I will tend to use `<-`, but you are free to use `=` if it's easier for you.

**Question 1.1.** In the code cell below, use either the `<-` or `=` assignment operator to assign the value of 20 to a variable `y`, and then assign `x + y` to a variable `z`. 


```R
y <- 20 # YOUR CODE HERE
# YOUR CODE HERE
z <- x + y
```


```R
. = ottr::check("tests/q1_1.R")
```

    All tests passed!

## 1.2. Vectors

To create a vector in R, we use the `c` operator as such:


```R
my_vec <- c(5,1,3,7)
my_vec
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>5</li><li>1</li><li>3</li><li>7</li></ol>



Similar to NumPy arrays in Python, we can easily do element-wise operations on vectors:


```R
my_vec + 2
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>7</li><li>3</li><li>5</li><li>9</li></ol>




```R
my_vec + c(4,3,2,1)
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>9</li><li>4</li><li>5</li><li>8</li></ol>



Notice also that just like in Python, running the above two code cells did not change the values in `my_vec`:


```R
my_vec
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>5</li><li>1</li><li>3</li><li>7</li></ol>



But *unlike* Python, R is NOT 0-indexed:


```R
my_vec[1] # this is how we get the first element of my_vec
```


5



```R
my_vec[0] # this will return nothing
```





A little bit more specifically, the above code cell with `my_vec[0]` will return a `numeric(0)`, which is essentially a numeric data type object that is empty (and thus it doesn't show anything when you run the above line).

Another difference between R and Python is that negative indexing in R gives a different behavior than in Python. Before running the following code, guess what might happen, and then run it to see if you were right:


```R
my_vec[-1]
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>1</li><li>3</li><li>7</li></ol>



**Question 1.2.1.** Based on what you just observed above, which of the following would output a vector consisting of (5, 1, 7)?

1. `my_vec[-2]`
2. `my_vec[-3]`
3. `my_vec[-4]`
4. None of the above

Store the number 1, 2, 3 or 4 corresponding to your choice into `neg_ind` below.


```R
neg_ind <- 2 # YOUR CODE HERE
```


```R
. = ottr::check("tests/q1_2_1.R")
```

    All tests passed!

**Question 1.2.2.** Also in R, there is built-in functionality that is similar to one of the possible behaviors of `np.arange` in Python:


```R
one_to_ten <- 1:10
one_to_ten
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li></ol>



That is, `1:10` in R gives a vector consisting of the integer values starting at 1 and ending at 10.

Experiment with some code and then select which of the following cannot be accomplished by simply using the `:` operator in R:

1. An output of the integers from 10 down to 1
2. An output of -3, -2, -1, 0, 1, 2, 3
3. An output of 0.5, 1.5, 2.5, 3.5
4. An output of 0.5, 1.0, 1.5, 2.0

Store your answer in `what_cant_colon_do` below:


```R
what_cant_colon_do <- 4 # YOUR CODE HERE
```


```R
. = ottr::check("tests/q1_2_2.R")
```

    All tests passed!

If we really wanted to do something like that, we can use the `seq` function, which is actually even more like Python's `np.arange` function. That is, in Python we could do:

```
np.arange(start=0.5, stop=2.5, step=0.5)
```

The equivalent in R is:


```R
seq(from=0.5, to=2.0, by=0.5)
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>0.5</li><li>1</li><li>1.5</li><li>2</li></ol>



Notice that one key difference is that, in R, the `to` value (that is, the equivalent of Python's `stop` value) does get included in the output.

We can also append to vectors like we do in Python, but the syntax is different. Consider the following Python code:

```
r = np.array([1, 2, 3])
s = np.append(r, 4)
```

The R code to accomplish the same thing is:


```R
r <- c(1, 2, 3)
s <- c(r, 4)
s
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>1</li><li>2</li><li>3</li><li>4</li></ol>



In the code cell below, create a vector `a` consisting of (1, 2, 3) and a vector `b` consisting of (4, 5, 6), and append `a` to `b` and store it as `c`.


```R
a <- c(1,2,3) # YOUR CODE HERE
b <- c(4,5,6) # YOUR CODE HERE
c <- c(a,b) # YOUR CODE HERE
c
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li></ol>




```R
. = ottr::check("tests/q1_2_3.R")
```

    All tests passed!

## 1.3 Matrices

A matrix can be constructed as follows:


```R
my_mat <- matrix(c(3, 4, 5, 
                   1, 6, 5), nrow=2)
my_mat
```


<table class="dataframe">
<caption>A matrix: 2 × 3 of type dbl</caption>
<tbody>
	<tr><td>3</td><td>5</td><td>6</td></tr>
	<tr><td>4</td><td>1</td><td>5</td></tr>
</tbody>
</table>



However, notice that the manner in which it filled in the values above is not quite what we might have expected. That is, it took the order of the values provided (3, 4, 5, 1, 6, 5) and filled them in by columns: 

 - the first two values (3 and 4) are in the first column
 - the next two values (5 and 1) are in the second column
 - and the last two values (6 and 5) are in the third column

This is somewhat counterintuitive! Typically, I like to change this behavior by adding `by_row=TRUE` so that we get:


```R
my_mat <- matrix(c(3, 4, 5, 
                   1, 6, 5), nrow=2, byrow=TRUE)
my_mat
```


<table class="dataframe">
<caption>A matrix: 2 × 3 of type dbl</caption>
<tbody>
	<tr><td>3</td><td>4</td><td>5</td></tr>
	<tr><td>1</td><td>6</td><td>5</td></tr>
</tbody>
</table>



There are two choices for how to specify a boolean in R:

 - `TRUE` / `FALSE` spelled out in all caps
 - `T` / `F`. That is, just the first letter, capitalized

Unlike in Python, `True` will not work.

**Question 1.3.** Create a $3 \times 3$ matrix consisting of the values 1 through 9, with:
 - 1, 2 and 3 on the first row
 - 4, 5 and 6 on the second row
 - 7, 8 and 9 on the third row. 


```R
mat_33 <- matrix(c(1,2,3,
                   4,5,6,
                   7,8,9), nrow=3, byrow = TRUE)# YOUR CODE HERE
mat_33
```


<table class="dataframe">
<caption>A matrix: 3 × 3 of type dbl</caption>
<tbody>
	<tr><td>1</td><td>2</td><td>3</td></tr>
	<tr><td>4</td><td>5</td><td>6</td></tr>
	<tr><td>7</td><td>8</td><td>9</td></tr>
</tbody>
</table>




```R
. = ottr::check("tests/q1_3.R")
```

    All tests passed!

## 1.4. Dataframes

R has dataframe objects just like Python does (the lack of capitalization for the word "dataframe" here is intentional; writing it as "DataFrame" is a Python convention; "dataframe" is the R convention).

In R, dataframes have many similar behaviors to matrices, but the primary advantage of dataframes is that its columns can be of different data types. For example, you can have dataframe that consists of a column of strings and a column of floats. In contrast, in a matrix, every element must of be of the same data type. 

Consider the small dataframe below on a snippet of participants involving students at a UC campus:


```R
my_dat <- data.frame(
    StudyID = c(234, 235, 236, 237),
    campus = c("UCSD", "UCSB", "UCSB", "UCLA"),
    GPA = c(3.75, 3.82, 2.21, 3.35),
    Year = c("Sophomore", "Senior", "Junior", "Junior")
)

my_dat
```


<table class="dataframe">
<caption>A data.frame: 4 × 4</caption>
<thead>
	<tr><th scope=col>StudyID</th><th scope=col>campus</th><th scope=col>GPA</th><th scope=col>Year</th></tr>
	<tr><th scope=col>&lt;dbl&gt;</th><th scope=col>&lt;chr&gt;</th><th scope=col>&lt;dbl&gt;</th><th scope=col>&lt;chr&gt;</th></tr>
</thead>
<tbody>
	<tr><td>234</td><td>UCSD</td><td>3.75</td><td>Sophomore</td></tr>
	<tr><td>235</td><td>UCSB</td><td>3.82</td><td>Senior   </td></tr>
	<tr><td>236</td><td>UCSB</td><td>2.21</td><td>Junior   </td></tr>
	<tr><td>237</td><td>UCLA</td><td>3.35</td><td>Junior   </td></tr>
</tbody>
</table>



If we want to access individual columns of the dataframe, we do this with the \$ operator:


```R
my_dat$GPA
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>3.75</li><li>3.82</li><li>2.21</li><li>3.35</li></ol>



We can also easily overwrite values in a dataframe:


```R
my_dat$GPA[2] <- 0.00
my_dat
```


<table class="dataframe">
<caption>A data.frame: 4 × 4</caption>
<thead>
	<tr><th scope=col>StudyID</th><th scope=col>campus</th><th scope=col>GPA</th><th scope=col>Year</th></tr>
	<tr><th scope=col>&lt;dbl&gt;</th><th scope=col>&lt;chr&gt;</th><th scope=col>&lt;dbl&gt;</th><th scope=col>&lt;chr&gt;</th></tr>
</thead>
<tbody>
	<tr><td>234</td><td>UCSD</td><td>3.75</td><td>Sophomore</td></tr>
	<tr><td>235</td><td>UCSB</td><td>0.00</td><td>Senior   </td></tr>
	<tr><td>236</td><td>UCSB</td><td>2.21</td><td>Junior   </td></tr>
	<tr><td>237</td><td>UCLA</td><td>3.35</td><td>Junior   </td></tr>
</tbody>
</table>



We can even reference the column that we wish to overwrite into, on the same line that we overwrite it:


```R
my_dat$GPA[1] <- my_dat$GPA[1] + 0.05
my_dat
```


<table class="dataframe">
<caption>A data.frame: 4 × 4</caption>
<thead>
	<tr><th scope=col>StudyID</th><th scope=col>campus</th><th scope=col>GPA</th><th scope=col>Year</th></tr>
	<tr><th scope=col>&lt;dbl&gt;</th><th scope=col>&lt;chr&gt;</th><th scope=col>&lt;dbl&gt;</th><th scope=col>&lt;chr&gt;</th></tr>
</thead>
<tbody>
	<tr><td>234</td><td>UCSD</td><td>3.80</td><td>Sophomore</td></tr>
	<tr><td>235</td><td>UCSB</td><td>0.00</td><td>Senior   </td></tr>
	<tr><td>236</td><td>UCSB</td><td>2.21</td><td>Junior   </td></tr>
	<tr><td>237</td><td>UCLA</td><td>3.35</td><td>Junior   </td></tr>
</tbody>
</table>



Suppose we realized that all `StudyID`s were off by 100 -- so, the `StudyID`s in this dataframe were actually supposed to be 334, 335, 336 and 337. Write one line of code to add 100 to each of the values in the current `StudyID` column and overwrite the `StudyID` column with the resulting values.


```R
# YOUR CODE HERE
my_dat$StudyID <- my_dat$StudyID + c(100,100,100,100)
my_dat
```


<table class="dataframe">
<caption>A data.frame: 4 × 4</caption>
<thead>
	<tr><th scope=col>StudyID</th><th scope=col>campus</th><th scope=col>GPA</th><th scope=col>Year</th></tr>
	<tr><th scope=col>&lt;dbl&gt;</th><th scope=col>&lt;chr&gt;</th><th scope=col>&lt;dbl&gt;</th><th scope=col>&lt;chr&gt;</th></tr>
</thead>
<tbody>
	<tr><td>334</td><td>UCSD</td><td>3.80</td><td>Sophomore</td></tr>
	<tr><td>335</td><td>UCSB</td><td>0.00</td><td>Senior   </td></tr>
	<tr><td>336</td><td>UCSB</td><td>2.21</td><td>Junior   </td></tr>
	<tr><td>337</td><td>UCLA</td><td>3.35</td><td>Junior   </td></tr>
</tbody>
</table>




```R
. = ottr::check("tests/q1_4.R")
```

    All tests passed!

Note: if you accidentally run the above solution cell more than once after your solution is complete, it will change your answer to be incorrect. In that case, you'll just need to re-load the original dataframe again to fix it.

There are many more things we can do with dataframes:
 - For data wrangling like we do with `pandas` in Python, there is the `dplyr` package in R.
 - For data viz, R has built-in functionality (generally referred to as "base R graphics"), but a preferred alternative in many situations is the `ggplot2` package.

This lab is packed enough already so we will defer learning how to use these things to a later lab.

## Part 2: Simulation basics

### Part 2.1: Loops

Loops behave very similarly in R as compared to Python with only some syntax differences, so this section will be relatively brief. 

Here is an example of a simple `for` loop in Python:

```
for i in np.arange(10):
  print(i)
```

And here is (roughly) the same loop in R:


```R
for(i in 1:10){
    print(i)
}
```

    [1] 1
    [1] 2
    [1] 3
    [1] 4
    [1] 5
    [1] 6
    [1] 7
    [1] 8
    [1] 9
    [1] 10


So the key differences are:
- The body of the loop should be wrapped in `{ }`. One exception just FYI: if the body is only one line long (as is the case in this example), then `{ }` is not necessary, but I just always wrap it in `{ }` regardless.
- `( )` are required directly after the `for`.
- We leverage R functionality to replace `np.arange(10)` with `1:10` as shown above (if we wanted it to be identical to what we would get with `np.arange(10)`, we would do `0:9`, but this is not common to do in R since we are no longer in 0-index land so there is typically no reason to have a loop index start at 0).
- You can essentially ignore the `[1]` before each outputted number; this is a convention of R where it shows the index of the first element of every line of output. 

**Question 2.1** Translate the following Python loop into R code:

```
u = np.array([])

for i in np.arange(100):
  v = i + 5
  u = np.append(u, v)
```


```R
u <- NULL # In R, we do not need to pre-specify it as an array or vector; NULL means it is empty, but it does exist and can be filled with anything.

# YOUR CODE HERE
for (i in 1:100) {
  v <- i + 5
  u <- c(u, v)
}

u
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li><li>13</li><li>14</li><li>15</li><li>16</li><li>17</li><li>18</li><li>19</li><li>20</li><li>21</li><li>22</li><li>23</li><li>24</li><li>25</li><li>26</li><li>27</li><li>28</li><li>29</li><li>30</li><li>31</li><li>32</li><li>33</li><li>34</li><li>35</li><li>36</li><li>37</li><li>38</li><li>39</li><li>40</li><li>41</li><li>42</li><li>43</li><li>44</li><li>45</li><li>46</li><li>47</li><li>48</li><li>49</li><li>50</li><li>51</li><li>52</li><li>53</li><li>54</li><li>55</li><li>56</li><li>57</li><li>58</li><li>59</li><li>60</li><li>61</li><li>62</li><li>63</li><li>64</li><li>65</li><li>66</li><li>67</li><li>68</li><li>69</li><li>70</li><li>71</li><li>72</li><li>73</li><li>74</li><li>75</li><li>76</li><li>77</li><li>78</li><li>79</li><li>80</li><li>81</li><li>82</li><li>83</li><li>84</li><li>85</li><li>86</li><li>87</li><li>88</li><li>89</li><li>90</li><li>91</li><li>92</li><li>93</li><li>94</li><li>95</li><li>96</li><li>97</li><li>98</li><li>99</li><li>100</li><li>101</li><li>102</li><li>103</li><li>104</li><li>105</li></ol>




```R
. = ottr::check("tests/q2_1.R")
```

    All tests passed!

### Part 2.2: Sampling

Oftentimes, we will want to draw elements at random from something. In Python, there is the `np.random.choice` function; in R, there is a similar `sample` function. For example, recall the vector `one_to_ten` from Part 1, which contains integers from 1 to 10. Run the code below to draw one of them at random: 


```R
# Run this code a few times to see what happens
sample(one_to_ten, size=1)
```


2


If we change the `size` argument, this will sample a different number of elements:


```R
# Run this code a few times to see what happens
sample(one_to_ten, size=5)
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>1</li><li>7</li><li>4</li><li>2</li><li>9</li></ol>



Note that the default for the `sample` function is to sample WITHOUT replacement. If we want it to sample WITH replacement, we need to set the `replace` option to `TRUE`:


```R
# Run this code a few times to see if elements ever get selected more than once
sample(one_to_ten, size=5, replace=TRUE)
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>1</li><li>8</li><li>9</li><li>3</li><li>5</li></ol>



Finally, if we do not provide a `size` argument, the default will be the size of the input object. In other words, this will sample all elements from `one_to_ten` without replacement, effectively just re-ordering them:


```R
# Run this code and observe what happens
sample(one_to_ten)
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>1</li><li>2</li><li>7</li><li>9</li><li>10</li><li>8</li><li>6</li><li>5</li><li>3</li><li>4</li></ol>



(Note that this will be useful when coding a permutation test)

Conversely, this will sample all elements from `one_to_ten` WITH replacement:


```R
# Run this code and observe what happens
sample(one_to_ten, replace=TRUE)
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>5</li><li>3</li><li>2</li><li>6</li><li>5</li><li>6</li><li>8</li><li>7</li><li>9</li><li>2</li></ol>



(Note that this will be useful when coding a bootstrap)

**Question 2.2.** Recall the dataframe `my_dat` from Part 1.4, containing information on students from UCSD:


```R
my_dat
```


<table class="dataframe">
<caption>A data.frame: 4 × 4</caption>
<thead>
	<tr><th scope=col>StudyID</th><th scope=col>campus</th><th scope=col>GPA</th><th scope=col>Year</th></tr>
	<tr><th scope=col>&lt;dbl&gt;</th><th scope=col>&lt;chr&gt;</th><th scope=col>&lt;dbl&gt;</th><th scope=col>&lt;chr&gt;</th></tr>
</thead>
<tbody>
	<tr><td>334</td><td>UCSD</td><td>3.80</td><td>Sophomore</td></tr>
	<tr><td>335</td><td>UCSB</td><td>0.00</td><td>Senior   </td></tr>
	<tr><td>336</td><td>UCSB</td><td>2.21</td><td>Junior   </td></tr>
	<tr><td>337</td><td>UCLA</td><td>3.35</td><td>Junior   </td></tr>
</tbody>
</table>



Write code below to sample the `Year` column WITH replacement. Store the result back into the `Year` column of `my_dat` (that is, overwrite the original `Year` column with the newly sampled version).


```R
set.seed(1) # DO NOT CHANGE THIS LINE!
# YOUR CODE HERE
my_dat$Year <- sample(my_dat$Year, replace = TRUE)
my_dat
```


<table class="dataframe">
<caption>A data.frame: 4 × 4</caption>
<thead>
	<tr><th scope=col>StudyID</th><th scope=col>campus</th><th scope=col>GPA</th><th scope=col>Year</th></tr>
	<tr><th scope=col>&lt;dbl&gt;</th><th scope=col>&lt;chr&gt;</th><th scope=col>&lt;dbl&gt;</th><th scope=col>&lt;chr&gt;</th></tr>
</thead>
<tbody>
	<tr><td>334</td><td>UCSD</td><td>3.80</td><td>Sophomore</td></tr>
	<tr><td>335</td><td>UCSB</td><td>0.00</td><td>Junior   </td></tr>
	<tr><td>336</td><td>UCSB</td><td>2.21</td><td>Junior   </td></tr>
	<tr><td>337</td><td>UCLA</td><td>3.35</td><td>Sophomore</td></tr>
</tbody>
</table>




```R
. = ottr::check("tests/q2_2.R")
```

    All tests passed!

## Part 3: Functions

Just like in any programming language, functions are useful to write when we want to do an operation or some set of operations a lot of times on a variety of inputs. Here is an example of a Python function (straight from DSC 10 slides):

```
def multiples(k):
    '''This function returns the 
    first twelve multiples of k.'''
    return np.arange(k, 13*k, k)
```

And here is the same function in R:


```R
multiples <- function(k){
    return(seq(k, 12*k, k))
}
```

Now run the function below to see its output:


```R
multiples(2)
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>2</li><li>4</li><li>6</li><li>8</li><li>10</li><li>12</li><li>14</li><li>16</li><li>18</li><li>20</li><li>22</li><li>24</li></ol>



Note: we could also have written the function like this:


```R
multiples_alt <- function(k){
    return(1:12*k)
}
```


```R
multiples_alt(2)
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>2</li><li>4</li><li>6</li><li>8</li><li>10</li><li>12</li><li>14</li><li>16</li><li>18</li><li>20</li><li>22</li><li>24</li></ol>



## 3.1. Functions with conditionals

Conditionals work basically the same as they do in Python. Here is an example:


```R
graduate <- function(GPA){
    if(GPA > 2){
        return("You can graduate!")
    } 
    else{
        return("rip")
    }
}
```


```R
graduate(2.2)
```


'You can graduate!'



```R
graduate(1.4)
```


'rip'


Write a function called `even_odd` that does the following:
- Takes an integer value of an argument `x`
- Determines whether `x` is even or odd
- If it is even, return the string "the value you provided is even"
- If it is odd, return the string "the value you provided is odd"

Note: there are a few approaches you could take to determine whether a value is even or odd, and we haven't directly covered any of them. But it's similar to what you would or could do in Python -- try and figure out a way in R!

Also, your function may simply assume that `x` is indeed an integer; that is, you do not need to check for that.


```R
even_odd <- function(x){
# YOUR CODE HERE
  if (x %% 2 == 0) {
    return("the value you provided is even")
  } else {
    return("the value you provided is odd")
  }
}

even_odd(5)
```


'the value you provided is odd'



```R
. = ottr::check("tests/q3_1.R")
```

    All tests passed!

## 3.2. Using functions on dataframes

Recall that in Python, in order to have a function operate on a column of a DataFrame, it was necessary to use `apply`. For example, suppose we wanted to check whether each `StudyID` in the above DataFrame was even or odd. In Python, the code would look like this:

```
my_dat.get('StudyID').apply(even_odd)
```
which would return an output of:

```
0    the value you provided is even
1     the value you provided is odd
2    the value you provided is even
Name: StudyID, dtype: object
```

In R, some operations and functions will perform elementwise on a column of a dataframe naturally (recall **Question 1.4** above), but not all of them will. In particular, the `even_odd` function we just wrote will not work elementwise (the reason is because `if` statements in R can only handle a single condition, and the `even_odd` function contains an `if` statement). 

So, similar to the `apply` method in Python, here we have the `sapply` function:


```R
sapply(my_dat$StudyID, even_odd)
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>'the value you provided is even'</li><li>'the value you provided is odd'</li><li>'the value you provided is even'</li><li>'the value you provided is odd'</li></ol>



**Question 3.2.** Run the `graduate` function from above on the `GPA` column of `my_dat`. Store the output vector into `grad_status` below.


```R
grad_status <- sapply(my_dat$GPA, graduate) # YOUR CODE HERE
grad_status
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>'You can graduate!'</li><li>'rip'</li><li>'You can graduate!'</li><li>'You can graduate!'</li></ol>




```R
. = ottr::check("tests/q3_2.R")
```

    All tests passed!

As a sidenote, we can actually write a different version of the `even_odd` or `graduate` functions that would naturally work elementwise on a column of a dataframe. To do this, we need to replace the `if` statement with an `ifelse`.

The `ifelse` function works on vectors, and returns an output of equal length to the input vector, applying the condition on each element. For example, with the `graduate` function:


```R
graduate_ifelse <- function(GPA){
  ifelse(GPA > 2, "You can graduate!", "rip")
}

graduate_ifelse(my_dat$GPA)
```


<style>
.list-inline {list-style: none; margin:0; padding: 0}
.list-inline>li {display: inline-block}
.list-inline>li:not(:last-child)::after {content: "\00b7"; padding: 0 .5ex}
</style>
<ol class=list-inline><li>'You can graduate!'</li><li>'rip'</li><li>'You can graduate!'</li><li>'You can graduate!'</li></ol>



So the way that this works is that for each element, if the condition is true, it returns the first statement, and if the condition is false, it returns the second statement. 

## 3.3. The t-Test

The test statistic for a t-Test is:

$$
t_s = \frac{\overline{x} - \mu_0}{s / \sqrt{n}}
$$

where:
 - $\overline{x}$ is the sample mean of the observations
 - $\mu_0$ is the null hypothesis value for the statistical test
 - $s$ is the sample standard deviation of the observations
 - $n$ is the sample size

**Question 3.3.** Write a function that calculates $t_s$ on any vector of $x$ values. Run it on the `GPA` column of `my_dat`, with $\mu_0=2$. 

Your function may use the built-in R functions of:

 - `mean` to calculate the sample mean
 - `sd` to calculate the sample standard deviation
 - `length` to calculate $n$
 - `sqrt` to calculate the square root

Each of these functions work elementwise on vectors.

The body of your function may span multiple lines or be written all in one line; it is up to you. If you choose to span multiple lines, you will need to store each intermediate step into an R variable.


```R
calc_ts <- function(x, mu0){
    (mean(x) - mu0) / (sd(x) / sqrt(length(x)))
    # YOUR CODE HERE
}

ts <- calc_ts(x = my_dat$GPA, mu0 = 2)
ts                  
```


0.400596487300547



```R
. = ottr::check("tests/q3_3.R")
```

    All tests passed!

## Congratulations, you are finished!!

To submit your assignment:

1. Select `Kernel -> Restart Kernel and Run All Cells...` to ensure that you have executed all cells, including the test cells.
2. Read through the notebook to make sure everything is fine and all tests passed, including the cell below.
3. Download your notebook using `File -> Download`, then upload your notebook to Gradescope.
4. Stick around while the Gradescope autograder grades your work. Make sure you see that all tests have passed on Gradescope.
5. Check that you have a confirmation email from Gradescope and save it as proof of your submission.
