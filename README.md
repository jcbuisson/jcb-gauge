
# jcb-gauge

A custom-element which displays a gauge, using possibility distributions for representing norm and value.
(see: https://pubmed.ncbi.nlm.nih.gov/18261889/)

<img src="https://jcbuisson.github.io/assets/gauge.png" height="300" />


## Properties

| Property                         | Attribute | Modifiers | Type                           | Default                                 | Description                                      |
|----------------------------------|-----------|-----------|--------------------------------|-----------------------------------------|--------------------------------------------------|
| `domain`                         | `domain`  |           | `object`                       | {"inf":0,"sup":100}                     |                                                  |
| `name`                           | `name`    |           | `String`                       | ""                                      | The text to display on the lower part of the gauge |
| `norm`                           | `norm`    |           | `object`                       | {"d1":40,"d2":60,"dt1":5,"dt2":5,"h":0} |                                                  |
| `value`                          | `value`   |           | `object`                       | {"d1":50,"d2":50,"dt1":2,"dt2":2,"h":0} |                                                  |


## CSS Custom Properties

| Property                  | Description                                      |
|---------------------------|--------------------------------------------------|
| `--jcb-gauge-green`       | Controls the green color (full compatibility between value and norm) |
| `--jcb-gauge-lightgreen`  | Controls the green color (light)                 |
| `--jcb-gauge-lightorange` | Controls the orange color (light)                |
| `--jcb-gauge-lightred`    | Controls the red color (light)                   |
| `--jcb-gauge-orange`      | Controls the orange color (all other compatibility situations) |
| `--jcb-gauge-red`         | Controls the red color (when zero compatibility between value and norm) |
