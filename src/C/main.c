/*
 * Academic License - for use in teaching, academic research, and meeting
 * course requirements at degree granting institutions only.  Not for
 * government, commercial, or other organizational use.
 *
 * main.c
 *
 * Code generation for function 'main'
 *
 */

/*************************************************************************/
/* This automatically generated example C main file shows how to call    */
/* entry-point functions that MATLAB Coder generated. You must customize */
/* this file for your application. Do not modify this file directly.     */
/* Instead, make a copy of this file, modify it, and integrate it into   */
/* your development environment.                                         */
/*                                                                       */
/* This file initializes entry-point function arguments to a default     */
/* size and value before calling the entry-point functions. It does      */
/* not store or use any values returned from the entry-point functions.  */
/* If necessary, it does pre-allocate memory for returned values.        */
/* You can use this file as a starting point for a main function that    */
/* you can deploy in your application.                                   */
/*                                                                       */
/* After you copy the file, and before you deploy it, you must make the  */
/* following changes:                                                    */
/* * For variable-size function arguments, change the example sizes to   */
/* the sizes that your application requires.                             */
/* * Change the example values of function arguments to the values that  */
/* your application requires.                                            */
/* * If the entry-point functions return values, store these values or   */
/* otherwise use them as required by your application.                   */
/*                                                                       */
/*************************************************************************/
#include "main.h"
#include "lint.h"
#include "lint_terminate.h"
#include "rt_nonfinite.h"

static void main_lint(double a1, double a2) {
    double result;

    /* Call the entry-point 'lint'. */
    result = lint(a1, a2);
    printf("%g", result);
}

int main(int argc, char* argv[]) {
    /* The initialize function is being called automatically from your entry-point function. So, a call to initialize is not included here. */
    /* Invoke the entry-point functions. You can call entry-point functions multiple times. */
    main_lint(
        strtod(argv[argc - 2], NULL),
        strtod(argv[argc - 1], NULL)
    );

    lint_terminate();
    return 0;
}