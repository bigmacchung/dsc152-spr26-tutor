# Lab 5: Categorical Predictors and Model Diagnostics in Multiple Regression

In this lab we build on the linear-regression machinery from Lab 4 in two directions, using R's built-in `iris` dataset throughout. The lab is organized into two parts:

* **Part 1: Categorical Predictors and the Partial F-test.** When a categorical predictor with three or more levels is added to a regression, the model produces several coefficients (one per dummy variable). The right way to test whether the categorical predictor as a whole helps predict the response is the **partial F-test**, not any single coefficient's $t$-test. You'll specify the model, fit full and reduced models, compute the partial F statistic by hand from the RSS values, and verify your answer against R's built-in `anova()` function.

* **Part 2: Model Diagnostics for Multiple Regression.** The LINE conditions you saw in Lab 4 (in simple linear regression) carry over to multiple regression with no real change. You'll fit a multiple regression on `iris`, check each LINE condition with the standard residual diagnostic, and then run two simulations that show what can go wrong when those conditions fail: a **linearity** violation (where ignoring a quadratic structure costs the linear test most of its power) and an **equal-variance** violation (where heteroskedasticity inflates the Type I error rate of the $t$-test for the slope above its nominal $\alpha = 0.05$ level).



```R
# Please run this initialization cell
library(ottr)

data(iris)
cat("Rows:", nrow(iris), "\n")
head(iris)

```

The `iris` data frame contains 150 measurements of three iris species (`setosa`, `versicolor`, `virginica`), 50 of each. The columns are:

| Column | Description |
|--------|-------------|
| `Sepal.Length` | Sepal length (cm) |
| `Sepal.Width`  | Sepal width (cm) |
| `Petal.Length` | Petal length (cm) |
| `Petal.Width`  | Petal width (cm) |
| `Species`      | Species: `setosa`, `versicolor`, or `virginica` |

Throughout the lab, the response variable is `Petal.Length` and we will explore how to bring `Species` (a three-level categorical predictor) and the other quantitative columns into a regression model.


## Part 1: Categorical Predictors and the Partial F-test


### Setup

Suppose we want to predict `Petal.Length` from a flower's `Species` and its `Petal.Width`. Because `Species` is categorical with three levels, R automatically encodes it as **two** dummy (0/1) indicator variables under the default treatment coding, with `setosa` as the reference level. The fitted model therefore has *four* coefficients in total: an intercept, two species dummies, and one slope on `Petal.Width`.

Inspecting `summary(lm(Petal.Length ~ Species + Petal.Width, data = iris))` will show two separate $t$-tests for the species effect (one for `Speciesversicolor` and one for `Speciesvirginica`). Each of these tests a different individual coefficient. Neither of them tests the question we usually care about: *"Does Species, taken as a whole, help predict Petal.Length once we've accounted for Petal.Width?"* That joint question is exactly what the **partial F-test** is built for, and is the core idea of Part 1.


**Question 1.1.** Consider predicting `Petal.Length` from both `Species` (a three-level categorical variable: `setosa`, `versicolor`, `virginica`) and `Petal.Width` (quantitative). Using R's default treatment coding with `setosa` as the reference level, which of the following correctly represents the multiple linear regression model? Assign `q1_1_ans` to one of `1`, `2`, `3`, or `4`.

1. $\texttt{Petal.Length}_i = \beta_0 + \beta_1 \cdot \texttt{Species}_i + \beta_2 \cdot \texttt{Petal.Width}_i + \varepsilon_i$, where $\texttt{Species}$ is plugged in as a single numeric value (1, 2, or 3) for each flower.
2. $\texttt{Petal.Length}_i = \beta_0 + \beta_1 \cdot \texttt{versicolor}_i + \beta_2 \cdot \texttt{virginica}_i + \beta_3 \cdot \texttt{Petal.Width}_i + \varepsilon_i$, where $\texttt{versicolor}$ and $\texttt{virginica}$ are 0/1 indicator variables for whether the flower is each species (`setosa` is the reference, captured by the intercept).
3. $\texttt{Petal.Length}_i = \beta_0 + \beta_1 \cdot \texttt{setosa}_i + \beta_2 \cdot \texttt{versicolor}_i + \beta_3 \cdot \texttt{virginica}_i + \beta_4 \cdot \texttt{Petal.Width}_i + \varepsilon_i$, with **all three** species each given their own 0/1 indicator.
4. $\texttt{Petal.Length}_i = \beta_0 + \beta_1 \cdot \texttt{Species}_i \cdot \texttt{Petal.Width}_i + \varepsilon_i$, the model with only an interaction term.

<!--
BEGIN QUESTION
name: q1_1
-->



```R
q1_1_ans <- ... # YOUR CODE HERE

```


```R
. = ottr::check("tests/q1_1.R")
```

**Question 1.2.** You fit the model from Q1.1 and look at `summary(lm(Petal.Length ~ Species + Petal.Width, data = iris))`. The output shows two $t$-test $p$-values for `Species` (one for `Speciesversicolor` and one for `Speciesvirginica`). Suppose your scientific question is the *joint* question: **"Does Species, taken as a whole, help predict Petal.Length after adjusting for Petal.Width?"** Which of the following is the correct test for that question? Assign `q1_2_ans` to one of `1`, `2`, `3`, or `4`.

1. The $t$-test for `Speciesversicolor` directly tests the joint question, since it is the most extreme of the two species $t$-tests.
2. The two species $t$-tests in the `summary()` output already cover the joint question, since together they test both `Speciesversicolor` and `Speciesvirginica`. The joint null is rejected if either individual $t$-test rejects.
3. A partial F-test comparing the full model (with `Species` and `Petal.Width`) against a reduced model (with only `Petal.Width`). The corresponding null hypothesis is $H_0: \beta_{\texttt{versicolor}} = \beta_{\texttt{virginica}} = 0$.
4. A partial F-test comparing the full model (with `Species` and `Petal.Width`) against an intercept-only reduced model. The corresponding null hypothesis is $H_0: \beta_{\texttt{versicolor}} = \beta_{\texttt{virginica}} = \beta_{\texttt{Petal.Width}} = 0$.

<!--
BEGIN QUESTION
name: q1_2
-->



```R
q1_2_ans <- ... # YOUR CODE HERE

```


```R
. = ottr::check("tests/q1_2.R")
```

**Question 1.3.** Fit the two models you described in Q1.2 on the `iris` data:

* The **full** model regressing `Petal.Length` on **both** `Species` and `Petal.Width`. Store it in `full_model_q13`.
* The **reduced** model regressing `Petal.Length` on `Petal.Width` only. Store it in `reduced_model_q13`.

<!--
BEGIN QUESTION
name: q1_3
-->



```R
full_model_q13 <- ... # YOUR CODE HERE
reduced_model_q13 <- ... # YOUR CODE HERE

```


```R
. = ottr::check("tests/q1_3.R")
```

**Question 1.4.** Compute the **Residual Sum of Squares (RSS)** for both fitted models from Q1.3. Recall that
$$RSS = \sum_{i=1}^n (y_i - \hat{y}_i)^2 = \sum_{i=1}^n e_i^2,$$
where $e_i$ is the $i$-th residual.

Store the result for the full model in `RSS_full_q14` and for the reduced model in `RSS_reduced_q14`.

*Hint: `residuals(model)` returns the vector of residuals from a fitted lm.*

<!--
BEGIN QUESTION
name: q1_4
-->



```R
RSS_full_q14 <- ... # YOUR CODE HERE
RSS_reduced_q14 <- ... # YOUR CODE HERE

```


```R
. = ottr::check("tests/q1_4.R")
```

### Quick Aside: Computing F-test p-values: the `pf()` function

From Lecture 9 we know that under $H_0$, the partial F-statistic follows an $\mathcal{F}$ distribution with $df_1 = p$ and $df_2 = n - k$. To get a $p$-value we need the **upper-tail probability** of seeing an F-statistic at least as large as the one we observed.

R provides this through `pf()` — the cumulative distribution function for the F distribution, parallel to `pt()` for the t distribution that you used in Lec04 for power calculations. The call signature is:

```r
pf(q, df1, df2, lower.tail = TRUE)
```

where

* `q` is the F-statistic value you want a probability for,
* `df1` and `df2` are the two degrees of freedom of the F distribution,
* `lower.tail = TRUE` (the default) returns $P(\mathcal{F} \le q)$, i.e. the *lower*-tail probability. Setting `lower.tail = FALSE` gives $P(\mathcal{F} > q)$ — exactly the upper-tail $p$-value we want for a partial F-test.

You will use this information in Question 1.5.

**Question 1.5.** Compute the partial F-statistic by hand using the formula from Lecture 9:
$$\mathcal{F} = \frac{(RSS_{\text{reduced}} - RSS_{\text{full}}) / p}{RSS_{\text{full}} / (n - k)},$$
where

* $n$ is the total sample size,
* $k$ is the number of coefficients in the **full** model (intercept + 2 species dummies + 1 slope on Petal.Width = 4),
* $p$ is the difference in the number of coefficients between the full and reduced models (here, the 2 species dummies that the reduced model drops).

Compute $n$, $k$, and $p$ programmatically from `iris` and the fitted models you stored in Q1.3 (rather than hard-coding the numbers), and store them in `n_q15`, `k_q15`, and `p_q15`. Then compute and store the F statistic in `F_stat_q15`.

Finally, get the upper-tail $p$-value of the partial F-test from an $\mathcal{F}$ distribution with $df_1 = p$ and $df_2 = n - k$, and store it in `pval_q15`. Use the function described in the cell above.

<!--
BEGIN QUESTION
name: q1_5
-->



```R
n_q15 <- ... # YOUR CODE HERE
k_q15 <- ... # YOUR CODE HERE
p_q15 <- ... # YOUR CODE HERE

F_stat_q15 <- ... # YOUR CODE HERE
pval_q15 <- ... # YOUR CODE HERE

F_stat_q15
pval_q15

```


```R
. = ottr::check("tests/q1_5.R")
```

**Question 1.6.** Now use R's built-in `anova()` to perform the same partial F-test. Pass the two fitted models from Q1.3 to `anova()` (reduced first, full second) and store the result in `anova_out_q16`. Then extract the F-statistic and the $p$-value from this output and store them in `anova_F_q16` and `anova_pval_q16`. Verify that they match your manual computations from Q1.5.

*Note: When you pass two nested models to `anova()`, R returns a one-row test of the second (full) model against the first (reduced) model. The F statistic and $p$-value on that row are the partial F and its p-value.*

<!--
BEGIN QUESTION
name: q1_6
-->



```R
anova_out_q16 <- ... # YOUR CODE HERE
anova_F_q16 <- ... # YOUR CODE HERE
anova_pval_q16 <- ... # YOUR CODE HERE
anova_out_q16
```


```R
. = ottr::check("tests/q1_6.R")
```

**Question 1.7.** Based on the partial F-test in Q1.5–Q1.6, what is the correct conclusion at $\alpha = 0.05$? Assign `q1_7_ans` to one of `1`, `2`, `3`, or `4`.

1. We **fail to reject** $H_0$. There is no evidence that `Species` improves the model after adjusting for `Petal.Width`.
2. We **reject** $H_0$. There is strong evidence that `Species` improves the model for `Petal.Length` *even after adjusting for* `Petal.Width`.
3. We **reject** $H_0$ because the F-statistic is greater than 1, and any $F > 1$ is the threshold for significance.
4. The test is inconclusive because the F-statistic is much larger than 1, which is impossible for a well-defined model.

<!--
BEGIN QUESTION
name: q1_7
-->



```R
q1_7_ans <- ... # YOUR CODE HERE

```


```R
. = ottr::check("tests/q1_7.R")
```

### Visualizing the fit by species

The model from Q1.3 fits a separate intercept for each species (because of the dummy variables) but a *common* slope on `Petal.Width`. Geometrically, that's three parallel lines, one per species. The cell below plots the data, color-coded by species, with the three fitted lines from `full_model_q13` overlaid.



```R
species_levels <- levels(iris$Species)
species_cols <- c(setosa = "steelblue", versicolor = "darkgreen", virginica = "firebrick")

plot(iris$Petal.Width, iris$Petal.Length,
     col = species_cols[as.character(iris$Species)],
     pch = 19, xlab = "Petal.Width", ylab = "Petal.Length",
     main = "Petal.Length vs Petal.Width by Species")

# Overlay the three fitted lines from the full model.
coefs_full_q13 <- coef(full_model_q13)
intercept_setosa     <- as.numeric(coefs_full_q13["(Intercept)"])
intercept_versicolor <- as.numeric(coefs_full_q13["(Intercept)"] + coefs_full_q13["Speciesversicolor"])
intercept_virginica  <- as.numeric(coefs_full_q13["(Intercept)"] + coefs_full_q13["Speciesvirginica"])
slope_q13            <- as.numeric(coefs_full_q13["Petal.Width"])

abline(a = intercept_setosa,     b = slope_q13, col = species_cols[["setosa"]],     lwd = 2)
abline(a = intercept_versicolor, b = slope_q13, col = species_cols[["versicolor"]], lwd = 2)
abline(a = intercept_virginica,  b = slope_q13, col = species_cols[["virginica"]], lwd = 2)

legend("topleft", legend = species_levels, col = species_cols[species_levels],
       pch = 19, lwd = 2, bty = "n")
```

Notice that the three fitted lines are **parallel** but vertically offset — each species has a distinctly different mean `Petal.Length` even at the same `Petal.Width`. That vertical separation is exactly the species effect that the partial F-test in Q1.5–Q1.6 detected.


## Part 2: Model Diagnostics for Multiple Regression


### LINE conditions, restated for multiple regression

The same four conditions you studied in simple linear regression are required for the classical $t$-tests and $F$-tests in multiple regression to be valid:

* **L**inearity — the conditional mean of $y$ is linear in the predictors. (For multiple regression, this means $E[y \mid x_1, x_2, \ldots] = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \cdots$.)
* **I**ndependence — the observations are independent of each other.
* **N**ormality — the residuals $\varepsilon_i$ are normally distributed (approximate normality is enough for large $n$, by the CLT).
* **E**qual variance — the residual variance does not depend on the predictors (homoskedasticity).

The diagnostic *tools* are also the same: residual plots, histograms / Q-Q plots / Shapiro-Wilk for normality, and a residuals-vs-order plot for independence. The **only** thing that changes when moving from simple to multiple regression is that the fitted-value plot now summarizes a higher-dimensional fit; everything else is unchanged. We'll do the full diagnostic on a real fit, then run two simulations to see what failures of L and E actually do to the test.


**Question 2.1.** Fit a multiple linear regression of `Petal.Length` on **`Species`, `Petal.Width`, and `Sepal.Width`** in the `iris` data, and store the fitted model in `mlr_model_q21`.

Then, run a **partial F-test** for the joint significance of `Species` *adjusting for* the two quantitative predictors. To do this, fit the reduced model that drops `Species` but keeps `Petal.Width` and `Sepal.Width`, and store it in `mlr_reduced_q21`. Use `anova()` to compare them, and store the partial F-test $p$-value in `mlr_partialF_pval_q21`.

Finally, based on `mlr_partialF_pval_q21` at the $\alpha = 0.05$ level, assign `species_significant_q21` to `TRUE` if `Species` contributes significantly to predicting `Petal.Length` after adjusting for the two quantitative predictors, and `FALSE` otherwise.

<!--
BEGIN QUESTION
name: q2_1
-->



```R
mlr_model_q21 <- ... # YOUR CODE HERE
mlr_reduced_q21 <- ... # YOUR CODE HERE
mlr_partialF_pval_q21 <- ... # YOUR CODE HERE

species_significant_q21 <- ... # YOUR CODE HERE

mlr_partialF_pval_q21
species_significant_q21
```


```R
. = ottr::check("tests/q2_1.R")
```

### Diagnostic 1: Linearity (residuals vs. fitted values)

The first thing we check on any fitted regression is whether the conditional mean of $y$ really is linear in the predictors. The standard diagnostic is the **residuals-vs-fitted plot**. Under the linearity condition, residuals should be scattered randomly around 0 with no systematic trend (curves, U-shapes, monotone drifts, etc.).


**Question 2.2.** From the multiple regression model `mlr_model_q21` you fit in Q2.1, extract the residuals into `resid_q22` and the fitted values into `fitted_q22`, and create a residuals-vs-fitted plot.

Then, based on the residuals-vs-fitted plot you just made, assign `linearity_violation_q22` to `TRUE` if you see a clear **curved pattern** (bowl- or arch-shaped) in the residuals — which would suggest a violation of the linearity assumption — and `FALSE` if the residuals look roughly evenly scattered around 0 with no curvature. (Fanning / changing spread is *not* a linearity violation; that's the equal-variance condition, which we'll examine in Q2.5.)

*The plot itself is not autograded; only the two vectors and the violation flag are checked.*

<!--
BEGIN QUESTION
name: q2_2
-->



```R
resid_q22 <- ... # YOUR CODE HERE
fitted_q22 <- ... # YOUR CODE HERE

plot(fitted_q22, resid_q22,
     pch = 19, col = adjustcolor("steelblue", 0.6),
     xlab = "Fitted Petal.Length", ylab = "Residual",
     main = "Residuals vs Fitted (mlr_model_q21)")
abline(h = 0, col = "red", lwd = 2)

linearity_violation_q22 <- ... # YOUR CODE HERE
```


```R
. = ottr::check("tests/q2_2.R")
```

### Diagnostic 2: Independence (residuals vs. order of entry)

The independence condition can fail in many ways, but the most common one we can actually *see* is a temporal (or sequential) trend: residuals that drift over the row index can signal that observations entered closer together in the dataset are correlated. We can't *prove* independence from this plot, but we can rule out one important way it can fail.

*The `iris` data isn't actually time-ordered, so doing this plot here is just for practice — what you'd look at for genuinely sequential data.*

**Question 2.3.** Make a residuals-vs-order plot for `mlr_model_q21`. Store the row indices (1 through `nrow(iris)`) in `order_q23`, then plot `resid_q22` against `order_q23`.

Then — *imagining for a moment that the row order in `iris` represented a genuine time-ordering* — assign `independence_violation_q23` to `TRUE` if the plot would suggest a violation of the independence assumption (i.e., a slow drift, oscillation, or systematic change in spread along the x-axis), and `FALSE` if the residuals look like an unstructured cloud across the row index.

<!--
BEGIN QUESTION
name: q2_3
-->



```R
order_q23 <- ... # YOUR CODE HERE

plot(order_q23, resid_q22,
     pch = 19, col = adjustcolor("steelblue", 0.6),
     xlab = "Row index (order of entry)", ylab = "Residual",
     main = "Residuals vs Order (mlr_model_q21)")
abline(h = 0, col = "red", lwd = 2)

independence_violation_q23 <- ... # YOUR CODE HERE
```


```R
. = ottr::check("tests/q2_3.R")
```

### Diagnostic 3: Normality (histogram, Q-Q plot, Shapiro-Wilk)

For normality, we use three complementary tools, in order of increasing formality and sensitivity:

1. A **histogram** of the residuals — does the shape look roughly bell-shaped, or is it skewed / heavy-tailed?
2. A **Q-Q plot** of the residuals against the theoretical normal quantiles — points should fall close to the diagonal reference line.
3. The **Shapiro-Wilk test** (`shapiro.test`) — a formal test whose null hypothesis is *"the data are normally distributed"*. A small $p$-value is evidence *against* normality.


**Question 2.4.** Use all three normality diagnostics on the residuals `resid_q22`:

1. Plot a histogram of the residuals.
2. Make a Normal Q-Q plot of the residuals (use `qqnorm` and `qqline`).
3. Run `shapiro.test` on the residuals and store the resulting $p$-value in `shapiro_pval_q24`.

Then, based on each diagnostic *individually*, decide whether it suggests a violation of the normality condition and assign:

* `histogram_violation_q24` to `TRUE` if the histogram shows visible skew or heavy tails, `FALSE` if the histogram is roughly bell-shaped and symmetric.
* `qq_violation_q24` to `TRUE` if the Q-Q plot shows systematic deviation from the diagonal reference line (especially in the tails), `FALSE` if the points fall close to the line throughout.
* `shapiro_violation_q24` to `TRUE` if `shapiro_pval_q24` is below the conventional $\alpha = 0.05$ threshold (so we reject the null of normality), `FALSE` otherwise.

Finally, taking all three diagnostics together, assign `normality_violation_q24` to `TRUE` if at least two of the three flags above are `TRUE` (i.e., a majority of the diagnostics agree that normality is violated), and `FALSE` otherwise.

<!--
BEGIN QUESTION
name: q2_4
-->



```R
# Histogram
hist(resid_q22,
     breaks = 20, col = "lightblue", border = "white",
     xlab = "Residual",
     main = "Histogram of residuals (mlr_model_q21)")

# Normal Q-Q plot
qqnorm(resid_q22, pch = 19, col = adjustcolor("steelblue", 0.6),
       main = "Normal Q-Q plot of residuals")
qqline(resid_q22, col = "red", lwd = 2)

# Shapiro-Wilk test
shapiro_pval_q24 <- ... # YOUR CODE HERE
shapiro_pval_q24

histogram_violation_q24 <- ... # YOUR CODE HERE
qq_violation_q24        <- ... # YOUR CODE HERE
shapiro_violation_q24   <- ... # YOUR CODE HERE

normality_violation_q24 <- ... # YOUR CODE HERE

```


```R
. = ottr::check("tests/q2_4.R")
```

*This is exactly why we use all three diagnostics together: the histogram missed the mild non-normality that the Q-Q plot and Shapiro-Wilk test both caught. Any one diagnostic alone could have led us to the wrong conclusion.*

### Diagnostic 4: Equal variance (residuals vs. each quantitative predictor)

Equal variance (or homoskedasticity) means the residual variance does not depend on the predictors. For multiple regression, the residuals-vs-fitted plot from Q2.2 is the headline diagnostic (looking for *fanning*: spread that grows or shrinks with the fitted value), but it's also useful to plot residuals against each individual quantitative predictor to see whether the spread changes systematically along that one axis.


**Question 2.5.** First, plot the residuals `resid_q22` against each of the two quantitative predictors in the model: `Petal.Width` and `Sepal.Width`. (You don't need to extract a new variable; just use `iris$Petal.Width` and `iris$Sepal.Width` directly.) Then take a final look at the residuals-vs-fitted plot from Q2.2. Eyeballing whether residual spread is changing along these axes is hard, so we'll back the visual check up with a numerical one.

Compute the standard deviation of the residuals **separately for each species** and store the three values in `resid_sd_setosa_q25`, `resid_sd_versicolor_q25`, and `resid_sd_virginica_q25`. Then store the ratio of the largest to the smallest of these three SDs in `sd_ratio_q25`.

A common rule of thumb is that the equal-variance condition is questionable when the largest group SD exceeds twice the smallest. Use that rule to assign `equal_var_violation_q25` to `TRUE` (violation) or `FALSE` (no violation) based on `sd_ratio_q25`.

<!--
BEGIN QUESTION
name: q2_5
-->



```R
par(mfrow = c(1, 2))
plot(iris$Petal.Width, resid_q22,
     pch = 19, col = adjustcolor("steelblue", 0.6),
     xlab = "Petal.Width", ylab = "Residual",
     main = "Residuals vs Petal.Width")
abline(h = 0, col = "red", lwd = 2)
plot(iris$Sepal.Width, resid_q22,
     pch = 19, col = adjustcolor("steelblue", 0.6),
     xlab = "Sepal.Width", ylab = "Residual",
     main = "Residuals vs Sepal.Width")
abline(h = 0, col = "red", lwd = 2)
par(mfrow = c(1, 1))

resid_sd_setosa_q25     <- ... # YOUR CODE HERE
resid_sd_versicolor_q25 <- ... # YOUR CODE HERE
resid_sd_virginica_q25  <- ... # YOUR CODE HERE

sd_ratio_q25 <- ... # YOUR CODE HERE
equal_var_violation_q25 <- ... # YOUR CODE HERE

equal_var_violation_q25
```


```R
. = ottr::check("tests/q2_5.R")
```

### Putting it together: should we trust this regression?

Now that we've run all four LINE diagnostics on `mlr_model_q21`, here's the verdict:

* **Linearity (Q2.2):** No clear curved pattern in the residuals-vs-fitted plot. The linearity condition looks fine.
* **Independence (Q2.3):** Can't be assessed for `iris` from this plot, since the rows aren't actually time-ordered. We have no positive evidence of a violation, but no positive evidence of independence either — for a careful analysis we'd want to know how the data were collected.
* **Normality (Q2.4):** Mildly violated. The histogram looks roughly bell-shaped, but the Q-Q plot and Shapiro-Wilk test agree that the right tail is heavier than Normal.
* **Equal variance (Q2.5):** Clearly violated. The residual standard deviation grows with the fitted value (and with species), with the largest group SD almost 3× the smallest.

**So should we be using regression here?** The coefficient estimates themselves are still unbiased — OLS doesn't need the LINE conditions to *estimate* the slopes correctly. What it needs LINE for is *trustworthy inference*: the standard errors, $t$-tests, and $p$-values that come out of `summary(lm)` and `anova()` all assume LINE holds. With $n = 150$ the mild normality violation is largely absorbed by the Central Limit Theorem, but the equal-variance violation is a real problem — it means our standard errors are systematically biased, so the reported $p$-values can't be taken at face value (we'll see exactly this in the Q2.8 simulation). In practice we would either transform `Petal.Length` to stabilize the variance, fit weighted least squares, or compute heteroskedasticity-robust standard errors before quoting any inference from this model.

### Simulation 1: Linearity violation costs the linear test most of its power

What happens to the classical $t$-test on the slope when the true relationship between $x$ and $y$ is non-linear? Below you'll simulate data from a purely *quadratic* mean structure, $y = \beta_2 x^2 + \varepsilon$ with $\beta_1 = 0$, on a symmetric $x$-range $[-5, 5]$. There is a strong association between $x$ and $y$ (we have explicitly built one in) but it is entirely captured by $x^2$. A linear-only model is structurally unable to see it: by symmetry, the population OLS slope is zero, so the linear $t$-test for $\beta_1 = 0$ should reject only at the nominal $\alpha = 0.05$ rate, completely missing the relationship. A quadratic model that includes $x^2$ should catch it nearly every time.


**Question 2.6.** Write a function `sim_linearity_q26(n, beta1, beta2, sigma, reps)` that:

* draws $x \sim \mathrm{Uniform}(-5, 5)$ of length `n`,
* draws $y_i = \beta_1 x_i + \beta_2 x_i^2 + \varepsilon_i$ with $\varepsilon_i \sim N(0, \sigma^2)$,
* fits two models:
    * a **linear** model `lm(y ~ x)` and reads the $t$-test $p$-value for $x$,
    * a **quadratic** model `lm(y ~ x + I(x^2))`, and gets the $p$-value of the joint F-test against the intercept-only null model `lm(y ~ 1)` via `anova()`,
* repeats this `reps` times,
* returns a list with two named elements: `linear_power` (rejection rate of the linear $t$-test at $\alpha = 0.05$) and `quad_power` (rejection rate of the quadratic F-test at $\alpha = 0.05$).

Then call `sim_linearity_q26(n = 50, beta1 = 0, beta2 = 0.5, sigma = 5, reps = 1000)` and store the result in `linear_violation_q26`. Pull the two power values out into `linear_power_q26` and `quad_power_q26`.

<!--
BEGIN QUESTION
name: q2_6
-->



```R
sim_linearity_q26 <- function(n, beta1, beta2, sigma, reps) {
    ... # YOUR CODE HERE
}

set.seed(414) # DO NOT DELETE OR CHANGE THIS LINE!
linear_violation_q26 <- ... # YOUR CODE HERE
linear_power_q26 <- ... # YOUR CODE HERE
quad_power_q26 <- ... # YOUR CODE HERE
linear_power_q26
quad_power_q26

```


```R
. = ottr::check("tests/q2_6.R")
```

### Side-by-side: linear test power vs. quadratic test power

The bar chart below shows your two rejection rates from `sim_linearity_q26`. The dashed line at 0.05 marks the nominal Type I error rate; the linear test sits near it (it has near-zero power against this purely quadratic alternative), while the quadratic test rejects on essentially every replicate.



```R
rates_q26 <- c(linear_power_q26, quad_power_q26)
bp_q26 <- barplot(rates_q26,
                  names.arg = c("Linear t-test\n(misspecified)",
                                "Quadratic F-test\n(correctly specified)"),
                  col = c("firebrick", "steelblue"),
                  ylab = "Empirical rejection rate at alpha = 0.05",
                  main = "Power against a purely quadratic alternative (n = 50, beta_2 = 0.5, sigma = 5)",
                  ylim = c(0, 1.18))
text(bp_q26, rates_q26 + 0.03,
     labels = sprintf("%.3f", rates_q26), cex = 1.0)
abline(h = 0.05, lty = 2)

```

**Why does the linear test have so little power here?** The linear $t$-test's null hypothesis is that the *linear slope* is zero, not that there's no relationship at all. With $x \sim \mathrm{Uniform}(-5, 5)$ and $y = 0.5\, x^2 + \varepsilon$, the parabola is symmetric: roughly equal numbers of points sit on the upward and downward arms. The line of best fit through this cloud is essentially flat, so the linear slope $\beta_1$ really is zero on average -- helpful information in general, but not good for testing nonlinear relationships. Meanwhile, the quadratic F-test compares the fitted quadratic model against an intercept-only baseline, and that comparison detects *any* systematic structure (linear or otherwise), so it picks up the $x^2$ term immediately.

**Question 2.7.** What does the simulation in Q2.6 demonstrate about ignoring a non-linear (here, quadratic) relationship and fitting a linear model anyway? Assign `q2_7_ans` to one of `1`, `2`, `3`, or `4`.

1. Even when the truth is non-linear, the linear $t$-test has roughly equal power to the correctly specified quadratic test. Model misspecification doesn't really hurt you.
2. The linear $t$-test mistakenly rejects $H_0$ very often (severely inflated Type I error), because misspecified models always inflate Type I error.
3. The linear $t$-test has near-zero power against this alternative. It can't "see" a relationship that lives entirely in the curvature of $y$ in $x$ — even though there is a strong, easily detectable relationship that the quadratic model picks up nearly always. A residual-vs-fitted plot is what would alert us to the violation in practice.
4. The two tests are equivalent because both are using OLS under the hood.

<!--
BEGIN QUESTION
name: q2_7
-->



```R
q2_7_ans <- ... # YOUR CODE HERE

```


```R
. = ottr::check("tests/q2_7.R")
```

### Simulation 2: Heteroskedasticity inflates Type I error of the slope $t$-test

Now we'll show what equal-variance failures actually do under the null. The classical $t$-test for the slope assumes residuals have a constant variance $\sigma^2$ that does not depend on $x$. When it does, the standard-error formula `lm` reports is built on a pooled residual-variance estimate, which can be too small. A too-small denominator inflates the $t$-statistic, pushing the empirical rejection rate above the nominal $\alpha = 0.05$.

You'll simulate data with $\beta_1 = 0$ (so the null is true) but with errors whose standard deviation grows with $|x|$: $\varepsilon_i \sim N\!\left(0,\, (0.5 + 2|x_i|)^2\right)$ on $x \sim \mathrm{Uniform}(-5, 5)$. Compare the empirical Type I error rate of `lm(y ~ x)` to a homoskedastic baseline that uses a constant $\sigma = 5$.


**Question 2.8.** Write **two** functions:

* `sim_hetero_q28(n, reps)` that, in each of `reps` replicates, draws $x \sim \mathrm{Uniform}(-5, 5)$ of length `n`, draws $\varepsilon_i \sim N(0,\, (0.5 + 2|x_i|)^2)$, sets $y_i = \varepsilon_i$ (so $\beta_1 = 0$), fits `lm(y ~ x)`, and counts replicates whose slope $t$-test $p$-value is $< 0.05$. Returns the empirical Type I error rate.
* `sim_homo_q28(n, reps)` that does the same thing with **constant** residual SD: $\varepsilon_i \sim N(0, 5^2)$.

Call each one with `n = 50` and `reps = 2000`, **resetting `set.seed(414)` before each call**, and store the results in `typeI_hetero_q28` and `typeI_homo_q28`.

<!--
BEGIN QUESTION
name: q2_8
-->



```R
sim_hetero_q28 <- function(n, reps) {
    ... # YOUR CODE HERE
}

sim_homo_q28 <- function(n, reps) {
    ... # YOUR CODE HERE
}

set.seed(414) # DO NOT DELETE OR CHANGE THIS LINE!
typeI_hetero_q28 <- ... # YOUR CODE HERE
typeI_hetero_q28

set.seed(414) # DO NOT DELETE OR CHANGE THIS LINE!
typeI_homo_q28 <- ... # YOUR CODE HERE
typeI_homo_q28

```


```R
. = ottr::check("tests/q2_8.R")
```

### Side-by-side: heteroskedastic vs. homoskedastic Type I error

The bar chart compares the empirical Type I error rate under heteroskedasticity (`typeI_hetero_q28`) with the homoskedastic baseline (`typeI_homo_q28`). The dashed line marks the nominal $\alpha = 0.05$ rate. The homoskedastic case sits right on the line; the heteroskedastic case is meaningfully above it.



```R
rates_q28 <- c(typeI_homo_q28, typeI_hetero_q28)
cols_q28 <- ifelse(abs(rates_q28 - 0.05) > 0.02, "firebrick", "steelblue")
bp_q28 <- barplot(rates_q28,
                  names.arg = c("Homoskedastic\n(baseline)",
                                "Heteroskedastic\n(sd = 0.5 + 2|x|)"),
                  col = cols_q28,
                  ylab = "Empirical Type I error rate",
                  main = "Type I error of the slope t-test under (un)equal variance (alpha = 0.05)",
                  ylim = c(0, max(rates_q28, 0.05) * 1.4))
text(bp_q28, rates_q28 + 0.005,
     labels = sprintf("%.3f", rates_q28), cex = 1.0)
abline(h = 0.05, lty = 2)

```

**Question 2.9.** What does the simulation in Q2.8 demonstrate about the equal-variance condition? Assign `q2_9_ans` to one of `1`, `2`, `3`, or `4`.

1. Heteroskedasticity has no effect on Type I error — both rates are essentially the same as the nominal 0.05.
2. Under the heteroskedastic data-generating process the empirical Type I error rate of the slope $t$-test is meaningfully above the nominal $\alpha = 0.05$, while the homoskedastic baseline is well calibrated near 0.05. This is one concrete consequence of violating the equal-variance condition.
3. Heteroskedasticity inflates statistical power but leaves Type I error untouched.
4. The homoskedastic baseline also has elevated Type I error, so this comparison says nothing about heteroskedasticity.

<!--
BEGIN QUESTION
name: q2_9
-->



```R
q2_9_ans <- ... # YOUR CODE HERE

```


```R
. = ottr::check("tests/q2_9.R")
```

**Why does heteroskedasticity inflate the Type I error rate?** Under $H_0: \beta_1 = 0$, the slope $t$-test computes its standard error using the OLS formula $\widehat{\mathrm{SE}}(\hat\beta_1) = \hat\sigma / \sqrt{\sum (x_i - \bar x)^2}$, which assumes a *single* common residual variance $\sigma^2$. When the true variance grows with $x$, that pooled $\hat\sigma$ may underestimate the true standard error of $\hat\beta_1$, so the test statistic $\hat\beta_1 / \widehat{\mathrm{SE}}$ gets divided by something too small, ends up too extreme, and the test rejects more often than the nominal $5\%$ — even though there's no real relationship.

### Wrap-up: identifying violations from diagnostic plots

These last two questions are conceptual checks on the diagnostic toolbox you just used. There's no code to write — just match each described pattern to the LINE condition it most directly diagnoses.


**Question 2.10.** A residuals-vs-fitted plot for a fitted multiple regression shows a clear **U-shape**: residuals are positive at small fitted values, dip to negative around the middle, and rise to positive again at large fitted values. Which LINE condition is most directly indicated as violated by this pattern? Assign `q2_10_ans` to one of `1`, `2`, `3`, or `4`.

1. **L**inearity — the U-shape says the conditional mean of $y$ is curved in the predictors, not linear, so a linear-only model is missing structure.
2. **I**ndependence — a U-shape in the residuals-vs-fitted plot is the standard signature of dependent observations.
3. **N**ormality — residuals with a U-shape have non-normal marginal distributions.
4. **E**qual variance — a U-shape in the residuals-vs-fitted plot is exactly the funnel pattern that indicates heteroskedasticity.

<!--
BEGIN QUESTION
name: q2_10
-->



```R
q2_10_ans <- ... # YOUR CODE HERE

```


```R
. = ottr::check("tests/q2_10.R")
```

**Question 2.11.** For a different fitted multiple regression, you make all four of the standard LINE diagnostic plots. The residuals-vs-fitted plot shows a clear **funnel** (the spread grows as fitted values increase), and the Q-Q plot shows the residuals deviating from the diagonal in **both** the upper and lower tails (heavier tails than a normal). Which LINE conditions does this set of plots most directly indicate as violated? Assign `q2_11_ans` to a vector containing the numbers of all that apply.

1. **L**inearity
2. **I**ndependence
3. **N**ormality
4. **E**qual variance

<!--
BEGIN QUESTION
name: q2_11
-->



```R
q2_11_ans <- ... # YOUR CODE HERE

```


```R
. = ottr::check("tests/q2_11.R")
```

---

## Congratulations, you are finished!!


To submit your assignment:

1. Select `Kernel -> Restart Kernel and Run All Cells...` to ensure that you have executed all cells, including the test cells, and that all tests passed.
2. Read through the notebook to make sure all cells ran and everything looks as expected.
3. Download your notebook (`File -> Download`) and upload it to Gradescope.
4. Stick around while the Gradescope autograder executes. Look over the output it produces and make sure it is what you expect. The autograder will run your notebook and then re-run all of the tests.
5. Check the autograder output for any errors and fix them if necessary.

