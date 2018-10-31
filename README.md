<h1 align="center">
  TickSlider
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;">Primitives to build simple React tick slider components</p>

<hr />

## The problem

You need an tick slider experience in your application and you want it to be
accessible. You also want it to be simple and flexible to account for your use
cases.

## This solution

This is a component that controls user interactions and state for you so you can
create tick slider components. It uses a
[render prop](https://reactjs.org/docs/render-props.html) which gives you
maximum flexibility with a minimal API because you are responsible for the
rendering of everything and you simply apply props to what you're rendering.

This differs from other solutions which render things for their use case and
then expose many options to allow for extensibility resulting in a bigger API
that is less flexible as well as making the implementation more complicated and
harder to contribute to.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
  - [rootStyle](#rootstyle)
  - [options](#options)
  - [value](#value)
  - [onValueChange](#onvaluechange)
  - [children](#children)
- [Render Prop Function](#render-prop-function)
  - [actions](#actions)
  - [state](#state)
- [Inspiration](#inspiration)
- [Other Solutions](#other-solutions)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via
[npm](https://www.npmjs.com/package/react-tick-slider) which is bundled with
[node](https://nodejs.org/en/) and should be installed as one of your project's
`dependencies`:

```
npm install --save react-tick-slider
```

> This package also depends on `react` and `prop-types`. Please make sure you
> have those installed as well.

## Usage

> [Try it out in the browser](https://codesandbox.io/s/github/zyhou/react-tick-slider-example/tree/master/)

```jsx
import React from 'react'
import TickSlider from 'react-tick-slider'

<TickSlider
    rootStyle={containerStyle}
    options={[{label: 'value 1',value: 1}, {label: 'value 2',value: 2}]} // your tick
    value={2} // default tick selected
    onValueChange={handleValueChange}
>
    {({ choices, selectedChoice, selectChoice }) => (
    <Fragment>
        <div className="slider">
            ...render your slider here
        </div>
        <CircleContainer>
            {choices.map(choice => (
                ...render your tick here
            ))}
            <div className="cricle">
                ...render your circle here
            </div>
        </CircleContainer>
    </Fragment>
    )}
</TickSlider>
```

<TickSlider /> is the only component. It doesn't render anything itself, it just
calls the render function and renders that.
["Use a render prop!"]([https://reactjs.org/docs/render-props.html])

## Props

### rootStyle

> `object` | defaults to `{}`

This is an object with any inline styles you want applied to the root div.

### options

> `array of object` | defaults to `[]`

This represent your tick. The object you are passed to generate your tick:

<!-- This table was generated via http://www.tablesgenerator.com/markdown_tables -->

| property | type          | description                                                |
| -------- | ------------- | ---------------------------------------------------------- |
| label    | string/number | Tick label, you can use it in title or aria-label property |
| value    | number        | Tick value                                                 |
|          |               |                                                            |

### value

> `number` | defaults to `null`

This is the default tick selected.

### onValueChange

> `function(value: number)` | optional, no useful default

This return the `value` of the tick selected.

### children

> `function`

This is calls the render function and renders that.

## Render Prop Function

### actions

These are functions you can call to change the state of the downshift component.

<!-- This table was generated via http://www.tablesgenerator.com/markdown_tables -->

| property     | type                     | description                                                |
| ------------ | ------------------------ | ---------------------------------------------------------- |
| selectChoice | function(choice: object) | selects the selectedChoice and trigger onValueChange event |
|              |                          |                                                            |

### state

These are values that represent the current state of the tick-slider component.

<!-- This table was generated via http://www.tablesgenerator.com/markdown_tables -->

| property       | type                                                           | description                            |
| -------------- | -------------------------------------------------------------- | -------------------------------------- |
| choices        | object {label: string/number, value: number, position: number} | This is your ticks with multiple props |
| selectedChoice | object {label: string/number, value: number, position: number} | This is tick selected                  |
|                |                                                                |                                        |

## Inspiration

I was heavily inspired by [Kent C. Dodds](https://github.com/kentcdodds) and
this repository
[Awesome react render props](https://github.com/jaredpalmer/awesome-react-render-props]).

## Other Solutions

You can implement these other solutions using `tick-slider`, but if you'd prefer
to use these out of the box solutions, then that's fine too:

- [`react-compound-slider`](https://github.com/sghall/react-compound-slider)

## LICENSE

MIT
