import { LitElement, css, html } from 'lit'

/**
   * A custom-element which displays a gauge
   * @attr {String} name - The text to display on the lower part of the gauge
   * @cssprop --jcb-gauge-text-color - Controls the color of the text (default: black)
   * @cssprop --jcb-gauge-text-font-family - Controls the font family of the text (default: Roboto, Helvetica, Arial, sans-serif)
   */
export class Gauge extends LitElement {

   static get properties() {
      return {
         name: { type: String },
         domain: {type: Object},
         norm: { type: Object },
         value: { type: Object },
      }
   }

   constructor() {
      super()
      // default values - before override by attributes
      this.name = ""
      this.domain = { inf: 0., sup: 100. }
      this.norm = { d1: 40., d2: 60., dt1: 5., dt2: 5., h: 0. }
      this.value = { d1: 50., d2: 50., dt1: 2., dt2: 2., h: 0. }
   }
   
   // angle corresponding to the middle value of the kernel
   get kernelMiddleValue() {
      return (this.value.d2 + this.value.d1) / 2.
   }

   get valueAngle() {
      return valueToAngle(this.domain.inf, this.domain.sup, this.kernelMiddleValue)
   }

   get d1ToMiddleAngle() {
      return valueToAngle(this.domain.inf, this.domain.sup, this.kernelMiddleValue - this.value.d1)
   }

   get middleToD2Angle() {
      return valueToAngle(this.domain.inf, this.domain.sup, this.value.d2 - this.kernelMiddleValue)
   }

   render() {
      const R = 2000

      const as1 = Math.PI/6
      const as1x = R*Math.sin(as1)
      const as1y = R*Math.cos(as1)
      const as2 = -Math.PI/6
      const as2x = R*Math.sin(as2)
      const as2y = R*Math.cos(as2)

      const ak1 = Math.PI/8
      const ak1x = R*Math.sin(ak1)
      const ak1y = R*Math.cos(ak1)
      const ak2 = -Math.PI/8
      const ak2x = R*Math.sin(ak2)
      const ak2y = R*Math.cos(ak2)

      const R2 = 850 
      const nas1 = Math.PI/10*0
      const nas1x = R2*Math.sin(nas1)
      const nas1y = R2*Math.cos(nas1)
      const nas2 = -Math.PI/10*0
      const nas2x = R2*Math.sin(nas2)
      const nas2y = R2*Math.cos(nas2)
      
      // const compatColor = "#D2FCD9"
      // const compatColorLighter = "#F1FEF0"
      const compatColor = "#F6C8BB"
      const compatColorLighter = "#FDF0ED"

      return html`
         <svg viewBox="-1050 -1050 2100 1500" fill="none" xmlns="http://www.w3.org/2000/svg">

            <!-- background rectangle with rounded corners -->
            <rect fill="${compatColorLighter}" x="-1050" y="-1050" rx="100" ry="100" width="2100" height="1500" />

            <!-- red area, fixed -->
            <path fill="#FE7151" fill-rule="evenodd" clip-rule="evenodd" d="M 739.593 -693.807 C 859.42 -573.981 947.152 -428.06 997.26 -269.4 L 996.219 -269.06 C 998.694 -258.753 1000 -247.992 1000 -236.928 C 1000 -161.073 938.505 -99.574 862.647 -99.574 C 797.038 -99.574 742.175 -145.576 728.546 -207.082 C 690.725 -316.148 628.521 -416.381 545.344 -499.559 C 400.808 -644.094 204.778 -725.296 0.375 -725.296 C -204.026 -725.296 -400.058 -644.094 -544.593 -499.559 C -627.768 -416.386 -689.968 -316.153 -727.793 -207.083 C -729.748 -198.249 -732.555 -189.736 -736.126 -181.627 C -737.144 -178.332 -738.14 -175.028 -739.106 -171.72 L -740.58 -172.456 C -763.676 -129.095 -809.339 -99.574 -861.893 -99.574 C -937.753 -99.574 -999.245 -161.073 -999.245 -236.928 C -999.245 -243.876 -998.728 -250.705 -997.734 -257.378 L -1000 -258.115 C -950.533 -421.14 -861.5 -571.141 -738.841 -693.807 C -542.786 -889.859 -276.882 -1000 0.375 -1000 C 277.638 -1000 543.541 -889.859 739.593 -693.807 Z" />
         
            <!-- mask for clipping orange and green cones -->
            <mask id="mask0_10_131" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="-1000" y="-1000" width="2000" height="1000">
               <!-- red area again, but for clipping orange and green cones -->
               <path fill="#FE7151" fill-rule="evenodd" clip-rule="evenodd" d="M 739.593 -693.807 C 859.42 -573.981 947.152 -428.06 997.26 -269.4 L 996.219 -269.06 C 998.694 -258.753 1000 -247.992 1000 -236.928 C 1000 -161.073 938.505 -99.574 862.647 -99.574 C 797.038 -99.574 742.175 -145.576 728.546 -207.082 C 690.725 -316.148 628.521 -416.381 545.344 -499.559 C 400.808 -644.094 204.778 -725.296 0.375 -725.296 C -204.026 -725.296 -400.058 -644.094 -544.593 -499.559 C -627.768 -416.386 -689.968 -316.153 -727.793 -207.083 C -729.748 -198.249 -732.555 -189.736 -736.126 -181.627 C -737.144 -178.332 -738.14 -175.028 -739.106 -171.72 L -740.58 -172.456 C -763.676 -129.095 -809.339 -99.574 -861.893 -99.574 C -937.753 -99.574 -999.245 -161.073 -999.245 -236.928 C -999.245 -243.876 -998.728 -250.705 -997.734 -257.378 L -1000 -258.115 C -950.533 -421.14 -861.5 -571.141 -738.841 -693.807 C -542.786 -889.859 -276.882 -1000 0.375 -1000 C 277.638 -1000 543.541 -889.859 739.593 -693.807 Z" />
            </mask>
         
            <g mask="url(#mask0_10_131)">
               <!-- orange area (support) -->
               <path fill="#FED74C" d="M 0 0 L ${-as1x} ${-as1y} L ${-as2x} ${-as2y} Z"/>
               <!-- green area (kernel) -->
               <path fill="#5DC67A" d="M 0 0 L ${-ak1x} ${-ak1y} L ${-ak2x} ${-ak2y} Z"/>
            </g>
         
            <!-- needle -->
            <path fill="black" transform="rotate(${this.valueAngle})" d="M 0 30 L -20 30 A 60 60 0 0 1 -50 0 L ${-nas1x-20} ${-nas1y+20} A 60 60 0 0 1 ${-nas1x} ${-nas1y} A 900 900 0 0 1 ${-nas2x} ${-nas2y} A 60 60 0 0 1 ${-nas2x+20} ${-nas2y+20} L 50 0 A 60 60 0 0 1 20 30" />

            <!-- lower area -->
            <rect fill="${compatColor}" x="-1050" y="150" rx="100" ry="100" width="2100" height="300" />
            <text text-anchor="middle" style="white-space: pre; fill: black; text-align: center; font: bold 100px sans-serif;" x="0" y="330">
               ${this.name} ${this.kernelMiddleValue}
            </text>
         </svg>
      `
   }

   static get styles() {
      return css`
         /* :host selects the host element (<jcb-gauge>, not its shadow dom) */
         :host {
            display: inline-block; /* by default a CE is inline and width & height do not apply */
            width: 100%; /* <jcb-gauge> takes full parent size */
            height: 100%;
         }
      `
   }
}

function valueToAngle(liminf, limsup, val) {
   const MIN = -75.
   const MAX = +75.
   if (val < liminf) return MAX
   if (val > limsup) return MIN
   return MIN + (MAX-MIN) * (val - liminf) / (limsup - liminf)
}

window.customElements.define('jcb-gauge', Gauge)
