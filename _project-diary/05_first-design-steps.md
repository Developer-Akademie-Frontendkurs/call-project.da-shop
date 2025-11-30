# First Design Implementations

- [Create color patterns with daisyUI](#create-color-patterns-with-daisyui)
- [Add `Hero` Section and `New Arrivals` Section to Home.js](#add-hero-section-and-new-arrivals-section-to-homejs)
- [Create and use custom tailwind components](#create-and-use-custom-tailwind-components)
  - [Introduction](#introduction)
  - [Own CSS classes](#own-css-classes)
  - [Custom base styles in tailwind](#custom-base-styles-in-tailwind)
  - [Custom design components in tailwind](#custom-design-components-in-tailwind)
- [Links](#links)

## Create color patterns with daisyUI

- visit the theme generator page from daisyUI at [daisyUI Theme Generator](https://daisyui.com/theme-generator/)
  - here you can set your color values for your theme and copy the required CSS code.
  - we have created a light and a dark color scheme. We need to add these to our `input.css` afterwards.
- Add the following lines to `input.css`

```css
@custom-variant dark (&:where([data-theme=ds-dark], [data-theme=ds-dark] *));

@plugin "daisyui/theme" {
  name: "ds-light";
  default: false;
  prefersdark: false;
  color-scheme: "light";
  --color-base-100: oklch(0.99 0 150);
  --color-base-200: oklch(0.96 0.005 150);
  --color-base-300: oklch(0.92 0.008 150);
  --color-base-content: oklch(21.24% 0.025 246.74);
  --color-primary: oklch(0.78 0.20 50);
  --color-primary-content: oklch(0.99 0 150);
  --color-secondary: oklch(0.78 0.16 230);
  --color-secondary-content: oklch(21.24% 0.025 246.74);
  --color-accent: oklch(0.86 0.14 125);
  --color-accent-content: oklch(21.24% 0.025 246.74);
  --color-neutral: oklch(50% 0.000 0);
  --color-neutral-content: oklch(0.99 0 150);
  --color-info: oklch(0.80 0.18 240);
  --color-info-content: oklch(21.24% 0.025 246.74);
  --color-success: oklch(0.80 0.18 145);
  --color-success-content: oklch(21.78% 0.000 0);
  --color-warning: oklch(0.86 0.20 90);
  --color-warning-content: oklch(21.24% 0.025 246.74);
  --color-error: oklch(0.76 0.24 25);
  --color-error-content: oklch(21.78% 0.000 0);
  --radius-selector: 0.25rem;
  --radius-field: 0.25rem;
  --radius-box: 0.25rem;
  --size-selector: 0.25rem;
  --size-field: 0.25rem;
  --border: 1.5px;
  --depth: 0;
  --noise: 0;
}

@plugin "daisyui/theme" {
  name: "ds-dark";
  default: true;
  prefersdark: true;
  color-scheme: "dark";
  --color-base-100: oklch(21.24% 0.025 246.74);
  --color-base-200: oklch(30% 0.022 246.74);
  --color-base-300: oklch(40% 0.020 246.74);
  --color-base-content: oklch(0.99 0 150);
  --color-primary: oklch(0.78 0.20 50);
  --color-primary-content: oklch(0.99 0 150);
  --color-secondary: oklch(0.78 0.16 230);
  --color-secondary-content: oklch(21.78% 0.000 0);
  --color-accent: oklch(0.86 0.14 125);
  --color-accent-content: oklch(21.78% 0.000 0);
  --color-neutral: oklch(50% 0.000 0);
  --color-neutral-content: oklch(0.99 0 150);
  --color-info: oklch(0.80 0.18 240);
  --color-info-content: oklch(21.78% 0.000 0);
  --color-success: oklch(0.80 0.18 145);
  --color-success-content: oklch(21.78% 0.000 0);
  --color-warning: oklch(0.86 0.20 90);
  --color-warning-content: oklch(21.78% 0.000 0);
  --color-error: oklch(0.76 0.24 25);
  --color-error-content: oklch(21.78% 0.000 0);
  --radius-selector: 0.25rem;
  --radius-field: 0.25rem;
  --radius-box: 0.25rem;
  --size-selector: 0.28125rem;
  --size-field: 0.28125rem;
  --border: 1.5px;
  --depth: 0;
  --noise: 0;
}
```

- So that we can use the colors of the theme in other HTML objects, we create them as global CSS variables for our theme. We also define some font sizes.
  - add this code to the `input.css` file

```diff
@theme {
    --breakpoint-456: 456px;
    --breakpoint-576: 576px;
    --breakpoint-768: 768px;
    --breakpoint-992: 992px;
    --breakpoint-1140: 1140px;
    --breakpoint-1440: 1440px;
    --breakpoint-1920: 1920px;

+   --color-light-base-100: oklch(0.99 0 150);
+   --color-light-base-200: oklch(0.96 0.005 150);
+   --color-light-base-300: oklch(0.92 0.008 150);
+   --color-light-primary: oklch(0.78 0.20 50);
+   --color-light-secondary: oklch(0.78 0.16 230);
+   --color-light-accent: oklch(0.86 0.14 125);
+   --color-light-neutral: oklch(50% 0.000 0);
+   --color-light-info: oklch(0.80 0.18 240);
+   --color-light-success: oklch(0.80 0.18 145);
+   --color-light-warning: oklch(0.86 0.20 90);
+   --color-light-error: oklch(0.76 0.24 25);
+   --color-dark-base-100: oklch(21.24% 0.025 246.74);
+   --color-dark-base-200: oklch(30% 0.022 246.74);
+   --color-dark-base-300: oklch(40% 0.020 246.74);
+   --color-dark-primary: oklch(0.78 0.20 50);
+   --color-dark-secondary: oklch(0.78 0.16 230);
+   --color-dark-accent: oklch(0.86 0.14 125);
+   --color-dark-neutral: oklch(50% 0.000 0);
+   --color-dark-info: oklch(0.80 0.18 240);
+   --color-dark-success: oklch(0.80 0.18 145);
+   --color-dark-warning: oklch(0.86 0.20 90);
+   --color-dark-error: oklch(0.76 0.24 25);
+
+   --text-16: 1rem;
+   --text-18: 1.125rem;
+   --text-20: 1.25rem;
+   --text-24: 1.5rem;
+   --text-30: 1.875rem;
+   --text-36: 2.25rem;
}
```

## Add `Hero` Section and `New Arrivals` Section to [Home.js](../src/views/HomeView/Home.js)

- Replace the getHTML function `Home.js` with

```js
async getHTML() {
        return /*html*/ `
            <section class="hero h-[calc(100vh-64px)] rounded-3xl" style="background-image: url(./assets/img/bg-hero.png);">
                <div class="hero-overlay rounded-3xl"></div>
                <div class="hero-content text-neutral-content text-center">
                    <div class="max-w-md">
                    <h1 class="mb-5 text-5xl font-bold">New Season, New You</h1>
                    <p class="mb-5">
                        Discover fresh layers, modern tailoring, and effortless looks for every day—think sharp lines,
                        rich textures, and easy silhouettes that flex from weekday to weekend.
                    </p>
                    <button class="btn btn-primary">Shop now</button>
                    </div>
                </div>
            </section>
            <section class="mt-6">
                <h2 class="h2">New Arrivals</h2>
                <div>
                    <article>
                        <img src="https://picsum.photos/id/1029/200/200" alt="">
                        <h3>Titel</h3>
                    </article>
                </div>

            </section>
        `;
    }
```

## Create and use custom tailwind components

### Introduction

tailwind works with so-called “utility classes” to use predefined CSS styles. daisyUI weaves these classes together in the background to create design components that we as developers can use and customize.

We can also define such “utility classes” or “component classes” ourselves. This makes sense if we want to use certain properties or components multiple times in our project. tailwind essentially distinguishes between “base styles” and “component classes” here.

### Own CSS classes

- Of course, it is also possible to create your own CSS classes with Tailwind.
- It is important to ensure that the name is not also used by Tailwind.
- We could define these classes directly in our `import.css`. However, for reasons of clarity and clean code, it is advisable to use a separate file for this.

```css
.my-custom-class {
    background-color: white;
    color: black;
}
```

### Custom base styles in tailwind

- used to assign the same CSS properties to HTML elements. For example, headings, paragraphs, etc.
- the advantage of this is that we can adjust all headings of a certain order in one step, for example.
- create a new folder in the `src` folder `css`
- in this new folder create a new file called `_base.css`
- In this file you can define your own base styles e.g. for a `h2` element
- It is, of course, possible to use our CSS variables defined earlier in `input.css` in these base classes.

```css
@layer base {
  h1 {
    font-size: var(--text-36)
  }

  h2 {
    font-size: var(--text-30);
  }
}
```

### Custom design components in tailwind

- used to assign for more complex classes
- possible to overwrite single properties with utility classes
- usecases are card, buttons, badges and more
- create a new file `_components.css` in the `./src/css` folder

```css
@layer components {
  .da-card {
    background-color: #ff0000;
    width: 200px;
    height: 200px;
    border-radius: var(--radius-3xl)
  }

  .da-secondary-card {
    background-color: var(--color-success);
    width: var(--container-2xs);
    height: 288px
  }
}
```

## Links

- [Adding custom styles in tailwind](https://tailwindcss.com/docs/adding-custom-styles)
