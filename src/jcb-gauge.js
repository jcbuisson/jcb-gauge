import { LitElement, css, html } from 'lit'

/**
   * A custom-element which displays a badge containing a mark as a fraction
   * @attr {String} numerator - The text to display on the upper part of the fraction
   * @attr {String} denominator - The text to display on the lower part of the fraction
   * @cssprop --jcb-badge-text-color - Controls the color of the mark text (default: black)
   * @cssprop --jcb-badge-text-font-family - Controls the font family of the mark text (default: Roboto, Helvetica, Arial, sans-serif)
   */
export class Gauge extends LitElement {

   static get properties() {
      return {
         numerator: { type: String },
         denominator: {type: String},
      }
   }

   constructor() {
      super()
      // default values - before override by attributes
      this.numerator = "0"
      this.denominator = "10"
   }

   // render() {
   //    return html`
   //       <svg width="100%" height="100%" viewBox="0 0 113 113" fill="none" xmlns="http://www.w3.org/2000/svg">
   //          <!-- red area -->
   //          <path fill-rule="evenodd" clip-rule="evenodd" d="M83.1656 14.9589C88.8604 20.6536 93.0299 27.5885 95.4113 35.1288L95.3619 35.1449C95.4793 35.6347 95.5415 36.1461 95.5415 36.6719C95.5415 40.2771 92.619 43.1996 89.0138 43.1996C85.8958 43.1996 83.2884 41.0135 82.6407 38.0904C80.8433 32.9069 77.8871 28.1434 73.9341 24.1904C67.0651 17.3214 57.7488 13.4624 48.0346 13.4624C38.3204 13.4624 29.004 17.3214 22.135 24.1904C18.1821 28.1433 15.226 32.9068 13.4285 38.0902C13.3355 38.5101 13.202 38.9148 13.0324 39.3001C12.9841 39.4567 12.9368 39.6136 12.8907 39.7709L12.8207 39.7359C11.7232 41.7967 9.5531 43.1996 7.05534 43.1996C3.4502 43.1996 0.527668 40.2771 0.527668 36.6719C0.527668 36.3417 0.552191 36.0172 0.599514 35.7001L0.491821 35.6651C2.84276 27.9174 7.074 20.7884 12.9035 14.9589C22.2209 5.64153 34.8579 0.407104 48.0346 0.407104C61.2113 0.407104 73.8483 5.64153 83.1656 14.9589Z" fill="#FE7151"/>
         
   //          <!-- mask for clipping orange and green cones -->
   //          <mask id="mask0_10_131" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="96" height="44">
   //             <!-- red area again, but for clipping orange and green cones -->
   //             <path fill-rule="evenodd" clip-rule="evenodd" d="M83.2015 14.9589C88.8962 20.6536 93.0658 27.5885 95.4471 35.1288L95.3978 35.1449C95.5152 35.6347 95.5774 36.1461 95.5774 36.6719C95.5774 40.2771 92.6548 43.1996 89.0497 43.1996C85.9318 43.1996 83.3244 41.0136 82.6766 38.0906C80.8792 32.9071 77.923 28.1435 73.9699 24.1904C67.101 17.3214 57.7846 13.4624 48.0704 13.4624C38.3562 13.4624 29.0399 17.3214 22.1709 24.1904C18.218 28.1433 15.2619 32.9067 13.4644 38.09C13.3714 38.5101 13.2378 38.9149 13.0681 39.3003C13.0199 39.4568 12.9727 39.6137 12.9265 39.7709L12.8565 39.7359C11.7591 41.7967 9.58895 43.1996 7.09119 43.1996C3.48606 43.1996 0.563526 40.2771 0.563526 36.6719C0.563526 36.3417 0.588048 36.0172 0.63537 35.7001L0.527649 35.6651C2.87859 27.9174 7.10983 20.7884 12.9394 14.9589C22.2567 5.64153 34.8937 0.407104 48.0704 0.407104C61.2471 0.407104 73.8841 5.64153 83.2015 14.9589Z" fill="#FE7151"/>
   //          </mask>

   //          <g mask="url(#mask0_10_131)">
   //             <!-- orange cone -->
   //             <path d="M48.0346 53.3538L91.6893 -11.9229H4.37987L48.0346 53.3538Z" fill="#FED74C"/>
   //             <!-- green cone -->
   //             <path d="M48.0346 53.3538L70.9612 -11.9229H25.108L48.0346 53.3538Z" fill="#5DC67A"/>
   //          </g>
      
   //          <!-- needle -->
   //          <path d="M13.1814 29.8716C12.7648 29.4322 12.774 28.7409 13.2021 28.3128C13.6303 27.8846 14.3215 27.8754 14.7609 28.292L52.0442 63.6421C52.8609 64.4164 52.8781 65.7119 52.0823 66.5077L51.397 67.193C50.6012 67.9888 49.3058 67.9715 48.5315 67.1549L13.1814 29.8716Z" fill="black"/>
   //    </svg>
   //    `
   // }

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
      const nas1 = Math.PI/20*0
      const nas1x = R2*Math.sin(nas1)
      const nas1y = R2*Math.cos(nas1)
      const nas2 = -Math.PI/20*0
      const nas2x = R2*Math.sin(nas2)
      const nas2y = R2*Math.cos(nas2)

      console.log('-120 -880    A 30 30 0 0 1   -100 -900  ...  100 -900   A 30 30 0 0 1    120 -880')
      console.log(`${-nas1x-20} ${-nas1y+20}    A 30 30 0 0 1   ${-nas1x} ${-nas1y}   ...   ${-nas2x} ${-nas2y}    A 30 30 0 0 1   ${-nas2x+20} ${-nas2y+20}`)

      return html`
         <svg viewBox="-1000 -1000 2000 1300" fill="none" xmlns="http://www.w3.org/2000/svg">

            <rect fill="white" x="-1000" y="-1000" width="2000" height="1300" />

            <!-- red area, fixed -->
            <path fill="#FE7151" fill-rule="evenodd" clip-rule="evenodd" d="M 739.593 -693.807 C 859.42 -573.981 947.152 -428.06 997.26 -269.4 L 996.219 -269.06 C 998.694 -258.753 1000 -247.992 1000 -236.928 C 1000 -161.073 938.505 -99.574 862.647 -99.574 C 797.038 -99.574 742.175 -145.576 728.546 -207.082 C 690.725 -316.148 628.521 -416.381 545.344 -499.559 C 400.808 -644.094 204.778 -725.296 0.375 -725.296 C -204.026 -725.296 -400.058 -644.094 -544.593 -499.559 C -627.768 -416.386 -689.968 -316.153 -727.793 -207.083 C -729.748 -198.249 -732.555 -189.736 -736.126 -181.627 C -737.144 -178.332 -738.14 -175.028 -739.106 -171.72 L -740.58 -172.456 C -763.676 -129.095 -809.339 -99.574 -861.893 -99.574 C -937.753 -99.574 -999.245 -161.073 -999.245 -236.928 C -999.245 -243.876 -998.728 -250.705 -997.734 -257.378 L -1000 -258.115 C -950.533 -421.14 -861.5 -571.141 -738.841 -693.807 C -542.786 -889.859 -276.882 -1000 0.375 -1000 C 277.638 -1000 543.541 -889.859 739.593 -693.807 Z" />
         
            <!-- mask for clipping orange and green cones -->
            <mask id="mask0_10_131" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="-1000" y="-1000" width="2000" height="1000">
               <!-- red area again, but for clipping orange and green cones -->
               <path fill="#FE7151" fill-rule="evenodd" clip-rule="evenodd" d="M 739.593 -693.807 C 859.42 -573.981 947.152 -428.06 997.26 -269.4 L 996.219 -269.06 C 998.694 -258.753 1000 -247.992 1000 -236.928 C 1000 -161.073 938.505 -99.574 862.647 -99.574 C 797.038 -99.574 742.175 -145.576 728.546 -207.082 C 690.725 -316.148 628.521 -416.381 545.344 -499.559 C 400.808 -644.094 204.778 -725.296 0.375 -725.296 C -204.026 -725.296 -400.058 -644.094 -544.593 -499.559 C -627.768 -416.386 -689.968 -316.153 -727.793 -207.083 C -729.748 -198.249 -732.555 -189.736 -736.126 -181.627 C -737.144 -178.332 -738.14 -175.028 -739.106 -171.72 L -740.58 -172.456 C -763.676 -129.095 -809.339 -99.574 -861.893 -99.574 C -937.753 -99.574 -999.245 -161.073 -999.245 -236.928 C -999.245 -243.876 -998.728 -250.705 -997.734 -257.378 L -1000 -258.115 C -950.533 -421.14 -861.5 -571.141 -738.841 -693.807 C -542.786 -889.859 -276.882 -1000 0.375 -1000 C 277.638 -1000 543.541 -889.859 739.593 -693.807 Z" />
            </mask>
         
            <g mask="url(#mask0_10_131)">
            <path fill="#FED74C" d="M 0 0 L ${-as1x} ${-as1y} L ${-as2x} ${-as2y} Z"/>
            <path fill="#5DC67A" d="M 0 0 L ${-ak1x} ${-ak1y} L ${-ak2x} ${-ak2y} Z"/>
            </g>
         
            <!-- needle -->
            <!--path fill="black" d="M 0 30 L -20 30 A 30 30 0 0 1 -50 0 L    -120 -880    A 30 30 0 0 1   -100 -900   A 450 450 0 0 1   100 -900   A 30 30 0 0 1    120 -880    L 50 0 A 30 30 0 0 1 20 30" /-->
            <path fill="black" d="M 0 30 L -20 30 A 30 30 0 0 1 -50 0 L    ${-nas1x-20} ${-nas1y+20}    A 30 30 0 0 1   ${-nas1x} ${-nas1y}   A 450 450 0 0 1   ${-nas2x} ${-nas2y}    A 30 30 0 0 1   ${-nas2x+20} ${-nas2y+20}    L 50 0 A 30 30 0 0 1 20 30" />
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

         :root {
         }

         #holder {
            fill: #FEAC4C;
         }

         .mark {
            fill: var(--jcb-badge-text-color, black);
            font-family: var(--jcb-badge-font-family, Roboto, Helvetica, Arial, sans-serif);
            font-weight: 500;
         }

         .numerator {
            font-size: 2.0em;
         }

         .denominator {
            font-size: 1.7em;
         }
      `
   }
}

window.customElements.define('jcb-gauge', Gauge)
