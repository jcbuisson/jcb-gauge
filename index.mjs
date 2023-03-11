
import {html, css, LitElement} from 'lit'

function valueToAngle(liminf, limsup, val) {
   if (val < -1000000) {
     return 150.0;
   }
   if (val > 1000000) {
     return 30.0;
   }
   var ang = 30.0 + 120.0 * (val - liminf) / (limsup - liminf);
   ang = Math.max(ang, 30.0);
   ang = Math.min(ang, 150.0);
   return ang * Math.PI / 180.0;
}

const BASESIZE = 300. // adapted to a font size of 46

export class Gauge extends LitElement {

   static get styles() {
      return css`
         .nutri-galva {
            cursor: pointer;
         }
         
         .clippath-url {
            clip-path: url(#clipPath);
         }
         
         .text-anchor-middle {
            text-anchor: middle;
         }
         
         .fill-green {
            fill: #5bca72;
         }
         
         .fill-red {
            fill: #cc0000;
         }
         
         .fill-orange {
            fill: #f1b463;
         }
         
         .fill-white {
            fill: white;
         }
         
         .fill-gray {
            fill: #222222;
         }
         
         .fill-black {
            fill: black;
         }     
      `
   }
    
   static properties = {
      name: { type: String },
      size: { type: Number },
      domain: {type: Object},
      norm: { type: Object },
      value: { type: Object },
   }

   constructor() {
      super()
      this.name = 'UNNAMED'
      this.size = 120.
      this.domain = { inf: 0., sup: 100. }
      this.norm = { d1: 40., d2: 60., dt1: 5., dt2: 5., h: 0. }
      this.value = { d1: 50., d2: 50., dt1: 2., dt2: 2., h: 0. }
   }

   get basesize() {
      return BASESIZE
   }

   get scale() {
      return this.size / BASESIZE
   }
   
   get svgSize() {
      return (10 + BASESIZE*this.scale) + 'px'
   }

   get transform() {
      return `translate(5, 5) scale(${this.scale})`
   }

   get redPath() {
      return `M ${BASESIZE*0.5},${BASESIZE*0.75}  l ${this.xSupRed},${this.ySupRed}  a  ${BASESIZE*0.7},${BASESIZE*0.7}  0  0,0  ${this.xInfRed-this.xSupRed},${this.yInfRed-this.ySupRed}  z`
   }
   get orangePath() {
      return `M ${BASESIZE*0.5},${BASESIZE*0.75}  l ${this.xSupOrange},${this.ySupOrange}  a  ${BASESIZE*0.7},${BASESIZE*0.7}  0  0,0  ${this.xInfOrange-this.xSupOrange},${this.yInfOrange-this.ySupOrange}  z`
   }
   get greenPath () {
      return `M ${BASESIZE*0.5},${BASESIZE*0.75}  l ${this.xSupGreen},${this.ySupGreen}  a  ${BASESIZE*0.7},${BASESIZE*0.7}  0  0,0  ${this.xInfGreen-this.xSupGreen},${this.yInfGreen-this.ySupGreen}  z`
   }
   get whitePath() {
      return `M ${BASESIZE*0.5},${BASESIZE*0.75}  l ${this.xWhite},${this.yWhite}  a  ${BASESIZE*0.5},${BASESIZE*0.5}  0  0,0  ${-2.*this.xWhite},0  z`
   }
   get grayPath() {
      return `M ${BASESIZE*0.5},${BASESIZE*0.75}  l ${this.xSupGray},${this.ySupGray}  a  ${BASESIZE*0.65},${BASESIZE*0.65}  0  0,0  ${this.xInfGray-this.xSupGray},${this.yInfGray-this.ySupGray}  z`
   }
   get blackPath() {
      return `M ${BASESIZE*0.5},${BASESIZE*0.75}  l ${this.xSupBlack},${this.ySupBlack}  a  ${BASESIZE*0.65},${BASESIZE*0.65}  0  0,0  ${this.xInfBlack-this.xSupBlack},${this.yInfBlack-this.ySupBlack}  z`
   }

   get xWhite() {
      return -BASESIZE * 0.5 * Math.cos(150.0 * Math.PI / 180.0)
   }
   get yWhite() {
      return -BASESIZE * 0.5 * Math.sin(150.0 * Math.PI / 180.0)
   }

   get xInfRed() {
      let angInfRed = 30.0 * Math.PI / 180.0
      return -BASESIZE * 0.7 * Math.cos(angInfRed)
   }
   get yInfRed() {
      let angInfRed = 30.0 * Math.PI / 180.0
      return -BASESIZE * 0.7 * Math.sin(angInfRed)
   }
   get xSupRed () {
      let angSupRed = 150.0 * Math.PI / 180.0
      return -BASESIZE * 0.7 * Math.cos(angSupRed)
   }
   get ySupRed() {
      let angSupRed = 150.0 * Math.PI / 180.0
      return -BASESIZE * 0.7 * Math.sin(angSupRed)
   }

   get angInfOrange() {
      return valueToAngle(this.domain.inf, this.domain.sup, this.norm.d1 - this.norm.dt1)
   }
   get xInfOrange() {
      return -BASESIZE * 0.7 * Math.cos(this.angInfOrange)
   }
   get yInfOrange() {
      return -BASESIZE * 0.7 * Math.sin(this.angInfOrange)
   }
   get angSupOrange() {
      return valueToAngle(this.domain.inf, this.domain.sup, this.norm.d2 + this.norm.dt2)
   }
   get xSupOrange() {
      return -BASESIZE * 0.7 * Math.cos(this.angSupOrange)
   }
   get ySupOrange() {
      return -BASESIZE * 0.7 * Math.sin(this.angSupOrange)
   }

   get angInfGreen() {
      return valueToAngle(this.domain.inf, this.domain.sup, this.norm.d1)
   }
   get xInfGreen() {
      return -BASESIZE * 0.7 * Math.cos(this.angInfGreen)
   }
   get yInfGreen() {
      return -BASESIZE * 0.7 * Math.sin(this.angInfGreen)
   }
   get angSupGreen() {
      return valueToAngle(this.domain.inf, this.domain.sup, this.norm.d2)
   }
   get xSupGreen() {
      return -BASESIZE * 0.7 * Math.cos(this.angSupGreen)
   }
   get ySupGreen() {
      return -BASESIZE * 0.7 * Math.sin(this.angSupGreen)
   }

   get angInfGray() {
      return valueToAngle(this.domain.inf, this.domain.sup, this.value.d1 - this.value.dt1)
   }
   get xInfGray() {
      return -BASESIZE * 0.65 * Math.cos(this.angInfGray)
   }
   get yInfGray() {
      return -BASESIZE * 0.65 * Math.sin(this.angInfGray)
   }
   get angSupGray() {
      return valueToAngle(this.domain.inf, this.domain.sup, this.value.d2 + this.value.dt2)
   }
   get xSupGray() {
      return -BASESIZE * 0.65 * Math.cos(this.angSupGray)
   }
   get ySupGray() {
      return -BASESIZE * 0.65 * Math.sin(this.angSupGray)
   }

   get xInfBlack() {
      let angInfBlack = valueToAngle(this.domain.inf, this.domain.sup, this.value.d1)
      return -BASESIZE * 0.65 * Math.cos(angInfBlack)
   }
   get yInfBlack() {
      let angInfBlack = valueToAngle(this.domain.inf, this.domain.sup, this.value.d1)
      return -BASESIZE * 0.65 * Math.sin(angInfBlack)
   }
   get xSupBlack() {
      let angSupBlack = valueToAngle(this.domain.inf, this.domain.sup, this.value.d2)
      return -BASESIZE * 0.65 * Math.cos(angSupBlack)
   }
   get ySupBlack () {
      let angSupBlack = valueToAngle(this.domain.inf, this.domain.sup, this.value.d2)
      return -BASESIZE * 0.65 * Math.sin(angSupBlack)
   }

   get style() {
      if (this.value.d1 - this.value.dt1 > this.norm.d2 + this.norm.dt2 || this.value.d2 + this.value.dt2 < this.norm.d1 - this.norm.dt1) {
         return 'fill:#da2d2a;' // red
      } else if (this.value.d1 - this.value.dt1 >= this.norm.d1 && this.value.d2 + this.value.dt2 <= this.norm.d2) {
         return 'fill:#5bca72;' // green
      } else {
         return 'fill:#f1b463;' // orange
      }
   }

   // called whenever a property changes
   render() {
      // console.log('this.value', this.value)
      return html`
         <svg xmlns="http://www.w3.org/2000/svg" width="${this.svgSize}" height="${this.svgSize}">
      
            <!-- define the square area as clipping zone -->
            <defs>
               <clipPath id="clipPath">
                  <rect x="0" y="0" width="${this.basesize}" height="${this.basesize}" />
               </clipPath>
            </defs>

            <g transform="${this.transform}">

               <!-- white background -->
               <rect x="0" y="0" width="${this.basesize}" height="${this.basesize}" fill="white" stroke="white" stroke-width="1px" ></rect>



               <!-- red area -->
               <path fill-rule="evenodd" clip-rule="evenodd" d="M83.1656 14.9589C88.8604 20.6536 93.0299 27.5885 95.4113 35.1288L95.3619 35.1449C95.4793 35.6347 95.5415 36.1461 95.5415 36.6719C95.5415 40.2771 92.619 43.1996 89.0138 43.1996C85.8958 43.1996 83.2884 41.0135 82.6407 38.0904C80.8433 32.9069 77.8871 28.1434 73.9341 24.1904C67.0651 17.3214 57.7488 13.4624 48.0346 13.4624C38.3204 13.4624 29.004 17.3214 22.135 24.1904C18.1821 28.1433 15.226 32.9068 13.4285 38.0902C13.3355 38.5101 13.202 38.9148 13.0324 39.3001C12.9841 39.4567 12.9368 39.6136 12.8907 39.7709L12.8207 39.7359C11.7232 41.7967 9.5531 43.1996 7.05534 43.1996C3.4502 43.1996 0.527668 40.2771 0.527668 36.6719C0.527668 36.3417 0.552191 36.0172 0.599514 35.7001L0.491821 35.6651C2.84276 27.9174 7.074 20.7884 12.9035 14.9589C22.2209 5.64153 34.8579 0.407104 48.0346 0.407104C61.2113 0.407104 73.8483 5.64153 83.1656 14.9589Z" fill="#FE7151"/>
            
               <!-- mask for clipping orange and green cones -->
               <mask id="mask0_10_131" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="96" height="44">
                  <!-- red area again, but for clipping orange and green cones -->
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M83.2015 14.9589C88.8962 20.6536 93.0658 27.5885 95.4471 35.1288L95.3978 35.1449C95.5152 35.6347 95.5774 36.1461 95.5774 36.6719C95.5774 40.2771 92.6548 43.1996 89.0497 43.1996C85.9318 43.1996 83.3244 41.0136 82.6766 38.0906C80.8792 32.9071 77.923 28.1435 73.9699 24.1904C67.101 17.3214 57.7846 13.4624 48.0704 13.4624C38.3562 13.4624 29.0399 17.3214 22.1709 24.1904C18.218 28.1433 15.2619 32.9067 13.4644 38.09C13.3714 38.5101 13.2378 38.9149 13.0681 39.3003C13.0199 39.4568 12.9727 39.6137 12.9265 39.7709L12.8565 39.7359C11.7591 41.7967 9.58895 43.1996 7.09119 43.1996C3.48606 43.1996 0.563526 40.2771 0.563526 36.6719C0.563526 36.3417 0.588048 36.0172 0.63537 35.7001L0.527649 35.6651C2.87859 27.9174 7.10983 20.7884 12.9394 14.9589C22.2567 5.64153 34.8937 0.407104 48.0704 0.407104C61.2471 0.407104 73.8841 5.64153 83.2015 14.9589Z" fill="#FE7151"/>
               </mask>

               <g mask="url(#mask0_10_131)">
                  <!-- orange cone -->
                  <path d="M48.0346 53.3538L91.6893 -11.9229H4.37987L48.0346 53.3538Z" fill="#FED74C"/>
                  <!-- green cone -->
                  <path d="M48.0346 53.3538L70.9612 -11.9229H25.108L48.0346 53.3538Z" fill="#5DC67A"/>
               </g>
         
               <!-- needle -->
               <path d="M13.1814 29.8716C12.7648 29.4322 12.774 28.7409 13.2021 28.3128C13.6303 27.8846 14.3215 27.8754 14.7609 28.292L52.0442 63.6421C52.8609 64.4164 52.8781 65.7119 52.0823 66.5077L51.397 67.193C50.6012 67.9888 49.3058 67.9715 48.5315 67.1549L13.1814 29.8716Z" fill="black"/>
      
               

               <!-- red sector -->
               <path d="${this.redPath}" stroke-width="1" class="fill-red clippath-url"></path>
               <!-- orange sector for support -->
               <path d="${this.orangePath}" stroke-width="1" class="fill-orange clippath-url" ></path>
               <!-- green sector for kernel -->
               <path d="${this.greenPath}" stroke-width="1" class="fill-green clippath-url"></path>

               <!-- white hiding sector -->
               <path d="${this.whitePath}" stroke="white" stroke-width="4px" class="fill-white clippath-url"></path>

               <!-- gray sector for data support -->
               <path d="${this.grayPath}" stroke="gray" stroke-width="1px" class="fill-gray clippath-url"></path>
               <!-- black sector for data kernel -->
               <path d="${this.blackPath}" stroke="black" stroke-width="6px" class="fill-black clippath-url"></path>

               <!-- footer -->
               <rect x="0" y="${this.basesize*0.75}" width="${this.basesize}" height="${this.basesize*0.25}" stroke="none" stroke-width="1" style="${this.style}" ></rect>
               <text x="${this.basesize*0.5}" y="${this.basesize*0.93}" font-family="Verdana" font-size="46" fill="black" class="text-anchor-middle" >
                  ${this.name}
               </text>

               <!-- frame -->
               <rect x="0" y="0" width="${this.basesize}" height="${this.basesize}" fill="none" stroke="gray" stroke-width="1px" ></rect>

            </g>
         </svg>
      `
   }
}

customElements.define('jcb-gauge', Gauge)
