import { LitElement, css, html } from 'lit'
   
const R2 = 850 
const R = 2000

/**
   * A custom-element which displays a gauge
   * @attr {String} title - The text to display on the lower part of the gauge
   * @attr {Object} domain - { inf, sup }
   * @attr {Object} norm - { d1, d2, dt1, dt2 }
   * @attr {Object} value - { d1, d2, dt1, dt2 }
   * @cssprop --jcb-gauge-red - Controls the red color (when zero compatibility between value and norm)
   * @cssprop --jcb-gauge-lightred - Controls the red color (light)
   * @cssprop --jcb-gauge-green - Controls the green color (full compatibility between value and norm)
   * @cssprop --jcb-gauge-lightgreen - Controls the green color (light)
   * @cssprop --jcb-gauge-orange - Controls the orange color (all other compatibility situations)
   * @cssprop --jcb-gauge-lightorange - Controls the orange color (light)
   */
export class Gauge extends LitElement {

   static get properties() {
      return {
         title: { type: String },
         subtitle: { type: String },
         domain: {type: Object},
         norm: { type: Object },
         value: { type: Object },
      }
   }

   constructor() {
      super()
      // default values - before override by attributes
      this.title = ""
      this.subtitle = ""
      this.domain = { inf: 0., sup: 100. }
      this.norm = { d1: 40., d2: 60., dt1: 5., dt2: 5., h: 0. }
      this.value = { d1: 50., d2: 50., dt1: 2., dt2: 2., h: 0. }
   }

   valueToAngle(val) {
      const MIN = -75.
      const MAX = +75.
      if (val < this.domain.inf) return MIN
      if (val > this.domain.sup) return MAX
      return MIN + (MAX-MIN) * (val - this.domain.inf) / (this.domain.sup - this.domain.inf)
   }
   
   // angle corresponding to the middle value of the kernel
   get kernelMiddleValue() {
      return (this.value.d2 + this.value.d1) / 2.
   }
   // needle rotation angle (in degree), aiming at the middle of the kernel
   get valueAngle() {
      return this.valueToAngle(this.kernelMiddleValue)
   }

   get valueKernelLeftAngle() {
      return this.valueToAngle(this.value.d1)
   }
   get valueKernelRightAngle() {
      return this.valueToAngle(this.value.d2)
   }

   get valueSupportLeftAngle() {
      return this.valueToAngle(this.value.d1 - this.value.dt1)
   }
   get valueSupportRightAngle() {
      return this.valueToAngle(this.value.d2 + this.value.dt2)
   }

   get normKernelLeftAngle() {
      return this.valueToAngle(this.norm.d1)
   }
   get normKernelRightAngle() {
      return this.valueToAngle(this.norm.d2)
   }

   get normSupportLeftAngle() {
      return this.valueToAngle(this.norm.d1 - this.norm.dt1)
   }
   get normSupportRightAngle() {
      return this.valueToAngle(this.norm.d2 + this.norm.dt2)
   }

   get valueLeftKernelToMiddleAngle() {
      return this.valueAngle - this.valueKernelLeftAngle
   }
   get middleToRightValueKernelAngle() {
      return this.valueAngle - this.valueKernelRightAngle
   }
   get valueLeftKernelX() {
      return R2*Math.sin(this.valueLeftKernelToMiddleAngle*Math.PI/180.)
   }
   get valueLeftKernelY() {
      return R2*Math.cos(this.valueLeftKernelToMiddleAngle*Math.PI/180.)
   }
   get valueRightKernelX() {
      return R2*Math.sin(this.middleToRightValueKernelAngle*Math.PI/180.)
   }
   get valueRightKernelY() {
      return R2*Math.cos(this.middleToRightValueKernelAngle*Math.PI/180.)
   }
   
   get valueLeftSupportToMiddleAngle() {
      return this.valueAngle - this.valueSupportLeftAngle
   }
   get middleToRightValueSupportAngle() {
      return this.valueAngle - this.valueSupportRightAngle
   }
   get valueLeftSupportX() {
      return R2*Math.sin(this.valueLeftSupportToMiddleAngle*Math.PI/180.)
   }
   get valueLeftSupportY() {
      return R2*Math.cos(this.valueLeftSupportToMiddleAngle*Math.PI/180.)
   }
   get valueRightSupportX() {
      return R2*Math.sin(this.middleToRightValueSupportAngle*Math.PI/180.)
   }
   get valueRightSupportY() {
      return R2*Math.cos(this.middleToRightValueSupportAngle*Math.PI/180.)
   }

   get normSupportLeftX() {
      return R*Math.sin(this.normSupportLeftAngle*Math.PI/180.)
   }
   get normSupportLeftY() {
      return R*Math.cos(this.normSupportLeftAngle*Math.PI/180.)
   }
   get normSupportRightX() {
      return R*Math.sin(this.normSupportRightAngle*Math.PI/180.)
   }
   get normSupportRightY() {
      return R*Math.cos(this.normSupportRightAngle*Math.PI/180.)
   }

   get normKernelLeftX() {
      return R*Math.sin(this.normKernelLeftAngle*Math.PI/180.)
   }
   get normKernelLeftY() {
      return R*Math.cos(this.normKernelLeftAngle*Math.PI/180.)
   }
   get normKernelRightX() {
      return R*Math.sin(this.normKernelRightAngle*Math.PI/180.)
   }
   get normKernelRightY() {
      return R*Math.cos(this.normKernelRightAngle*Math.PI/180.)
   }

   get colorClass() {
      console.log(this.title, this.valueSupportLeftAngle, this.valueSupportRightAngle, this.normSupportLeftAngle, this.normSupportRightAngle, this.normKernelLeftAngle, this.normKernelRightAngle)
      if (this.valueSupportRightAngle < this.normSupportLeftAngle) return 'red'
      if (this.valueSupportLeftAngle > this.normSupportRightAngle) return 'red'
      if (this.valueSupportLeftAngle >= this.normKernelLeftAngle && this.valueSupportLeftAngle < this.normKernelRightAngle
         && this.valueSupportRightAngle >= this.normKernelLeftAngle && this.valueSupportRightAngle <= this.normKernelRightAngle) return 'green'
      return 'orange'
   }

   render() {
      return html`
         <svg viewBox="-1050 -1050 2100 1700" fill="none" xmlns="http://www.w3.org/2000/svg">

            <!-- background rectangle with rounded corners -->
            <rect class="${this.colorClass} light" x="-1050" y="-1050" rx="100" ry="100" width="2100" height="1700" />

            <!-- red area, fixed -->
            <path class="red" fill-rule="evenodd" clip-rule="evenodd" d="M 739.593 -693.807 C 859.42 -573.981 947.152 -428.06 997.26 -269.4 L 996.219 -269.06 C 998.694 -258.753 1000 -247.992 1000 -236.928 C 1000 -161.073 938.505 -99.574 862.647 -99.574 C 797.038 -99.574 742.175 -145.576 728.546 -207.082 C 690.725 -316.148 628.521 -416.381 545.344 -499.559 C 400.808 -644.094 204.778 -725.296 0.375 -725.296 C -204.026 -725.296 -400.058 -644.094 -544.593 -499.559 C -627.768 -416.386 -689.968 -316.153 -727.793 -207.083 C -729.748 -198.249 -732.555 -189.736 -736.126 -181.627 C -737.144 -178.332 -738.14 -175.028 -739.106 -171.72 L -740.58 -172.456 C -763.676 -129.095 -809.339 -99.574 -861.893 -99.574 C -937.753 -99.574 -999.245 -161.073 -999.245 -236.928 C -999.245 -243.876 -998.728 -250.705 -997.734 -257.378 L -1000 -258.115 C -950.533 -421.14 -861.5 -571.141 -738.841 -693.807 C -542.786 -889.859 -276.882 -1000 0.375 -1000 C 277.638 -1000 543.541 -889.859 739.593 -693.807 Z" />
         
            <!-- mask for clipping orange and green cones -->
            <mask id="mask0_10_131" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="-1000" y="-1000" width="2000" height="1000">
               <!-- red area again, but for clipping orange and green cones -->
               <path class="red" fill-rule="evenodd" clip-rule="evenodd" d="M 739.593 -693.807 C 859.42 -573.981 947.152 -428.06 997.26 -269.4 L 996.219 -269.06 C 998.694 -258.753 1000 -247.992 1000 -236.928 C 1000 -161.073 938.505 -99.574 862.647 -99.574 C 797.038 -99.574 742.175 -145.576 728.546 -207.082 C 690.725 -316.148 628.521 -416.381 545.344 -499.559 C 400.808 -644.094 204.778 -725.296 0.375 -725.296 C -204.026 -725.296 -400.058 -644.094 -544.593 -499.559 C -627.768 -416.386 -689.968 -316.153 -727.793 -207.083 C -729.748 -198.249 -732.555 -189.736 -736.126 -181.627 C -737.144 -178.332 -738.14 -175.028 -739.106 -171.72 L -740.58 -172.456 C -763.676 -129.095 -809.339 -99.574 -861.893 -99.574 C -937.753 -99.574 -999.245 -161.073 -999.245 -236.928 C -999.245 -243.876 -998.728 -250.705 -997.734 -257.378 L -1000 -258.115 C -950.533 -421.14 -861.5 -571.141 -738.841 -693.807 C -542.786 -889.859 -276.882 -1000 0.375 -1000 C 277.638 -1000 543.541 -889.859 739.593 -693.807 Z" />
            </mask>
         
            <g mask="url(#mask0_10_131)">
               <!-- orange area (support) -->
               <path class="orange" d="M 0 0 L ${this.normSupportLeftX} ${-this.normSupportLeftY} L ${this.normSupportRightX} ${-this.normSupportRightY} Z"/>
               <!-- green area (kernel) -->
               <path class="green" d="M 0 0 L ${this.normKernelLeftX} ${-this.normKernelLeftY} L ${this.normKernelRightX} ${-this.normKernelRightY} Z"/>
            </g>
         
            <!-- needle -->
            <path fill="#666" transform="rotate(${this.valueAngle})" d="M 0 30 L -20 30 A 60 60 0 0 1 -50 0 L ${-this.valueLeftSupportX-20} ${-this.valueLeftSupportY+20} A 60 60 0 0 1 ${-this.valueLeftSupportX} ${-this.valueLeftSupportY} A 900 900 0 0 1 ${-this.valueRightSupportX} ${-this.valueRightSupportY} A 60 60 0 0 1 ${-this.valueRightSupportX+20} ${-this.valueRightSupportY+20} L 50 0 A 60 60 0 0 1 20 30" />
            <path fill="black" transform="rotate(${this.valueAngle})" d="M 0 30 L -20 30 A 60 60 0 0 1 -50 0 L ${-this.valueLeftKernelX-20} ${-this.valueLeftKernelY+20} A 60 60 0 0 1 ${-this.valueLeftKernelX} ${-this.valueLeftKernelY} A 900 900 0 0 1 ${-this.valueRightKernelX} ${-this.valueRightKernelY} A 60 60 0 0 1 ${-this.valueRightKernelX+20} ${-this.valueRightKernelY+20} L 50 0 A 60 60 0 0 1 20 30" />

            <!-- lower area -->
            <rect class="${this.colorClass} fairlylight" x="-1050" y="150" rx="100" ry="100" width="2100" height="500" />
            <text text-anchor="middle" class="title" fill="black" x="0" y="360">
               ${this.title}
            </text>
            <text text-anchor="middle" class="subtitle" fill="#666" x="0" y="560">
               ${this.subtitle}
            </text>
         </svg>
      `
   }

   static get styles() {
      return css`
         /* :host selects the host element (<jcb-gauge>, not its shadow dom) */
         :host {
            display: inline-block; /* by default a CE is inline and width & height do not apply */
            width: 100%; /* <jcb-gauge> takes full parent width */
            height: 100%; /* <jcb-gauge> takes full parent height */
         }

         .red {
            fill: var(--jcb-gauge-red, #FE7151);
         }
         .green {
            fill: var(--jcb-gauge-green, #5DC67A);
         }
         .orange {
            fill: var(--jcb-gauge-orange, #FED74C);
         }

         .fairlylight {
            opacity: 0.4;
         }

         .light {
            opacity: 0.1;
         }

         .title {
            font-weight: bold;
            font-size: 200px;
            font-family: var(--jcb-gauge-font-family, sans-serif);
         }

         .subtitle {
            font-size: 150px;
            font-family: var(--jcb-gauge-font-family, sans-serif);
         }
      `
   }
}

window.customElements.define('jcb-gauge', Gauge)
