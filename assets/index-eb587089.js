import{r as Z,R as a}from"./isSymbol-659cbca8.js";import{g as me}from"./_commonjsHelpers-de833af9.js";import{t as pe}from"./throttle-7cfb2d79.js";var ee={exports:{}},q={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fe=Z,ge=Symbol.for("react.element"),he=Symbol.for("react.fragment"),ve=Object.prototype.hasOwnProperty,ye=fe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,_e={key:!0,ref:!0,__self:!0,__source:!0};function te(e,t,i){var r,s={},n=null,l=null;i!==void 0&&(n=""+i),t.key!==void 0&&(n=""+t.key),t.ref!==void 0&&(l=t.ref);for(r in t)ve.call(t,r)&&!_e.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)s[r]===void 0&&(s[r]=t[r]);return{$$typeof:ge,type:e,key:n,ref:l,props:s,_owner:ye.current}}q.Fragment=he;q.jsx=te;q.jsxs=te;ee.exports=q;var re=ee.exports;const c=re.jsx,we=re.jsxs;var ne={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(e){(function(){var t={}.hasOwnProperty;function i(){for(var r=[],s=0;s<arguments.length;s++){var n=arguments[s];if(n){var l=typeof n;if(l==="string"||l==="number")r.push(n);else if(Array.isArray(n)){if(n.length){var d=i.apply(null,n);d&&r.push(d)}}else if(l==="object"){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){r.push(n.toString());continue}for(var m in n)t.call(n,m)&&n[m]&&r.push(m)}}}return r.join(" ")}e.exports?(i.default=i,e.exports=i):window.classNames=i})()})(ne);var xe=ne.exports;const K=me(xe),Ce=a.createContext({isActive:!1,ghost:!1,getGhostArea:()=>null}),b=(e,t=0)=>a.useMemo(()=>e&&t?pe(e,t):e,[e,t]);var o=(e=>(e.Center="Center",e.Right="Right",e.RightTop="RightTop",e.Top="Top",e.TopLeft="TopLeft",e.Left="Left",e.LeftBottom="LeftBottom",e.Bottom="Bottom",e.BottomRight="BottomRight",e))(o||{}),U=(e=>(e[e.Five=0]="Five",e[e.Nine=1]="Nine",e))(U||{});const Re={[o.Center]:[{min:0,max:0}],[o.Right]:[{min:0,max:22.5},{min:337.5,max:360}],[o.RightTop]:[{min:22.5,max:67.5}],[o.Top]:[{min:67.5,max:112.5}],[o.TopLeft]:[{min:112.5,max:157.5}],[o.Left]:[{min:157.5,max:202.5}],[o.LeftBottom]:[{min:202.5,max:247.5}],[o.Bottom]:[{min:247.5,max:292.5}],[o.BottomRight]:[{min:292.5,max:337.5}]},Le={[o.Center]:[{min:0,max:0}],[o.Top]:[{min:45,max:135}],[o.Left]:[{min:135,max:225}],[o.Bottom]:[{min:225,max:315}],[o.Right]:[{min:315,max:360},{min:0,max:45}]},Ne=(e,t)=>{let i=o.Center;if(t===void 0)return i;const r=e===U.Five?Le:Re;for(const s of Object.keys(r))if(r[s].some(({min:d,max:m})=>t>=d&&t<m)){i=s;break}return i},Ae=(e,t)=>{const i=Math.sqrt(e*e+t*t);if(i===0)return;const r=Math.acos(e/i);return t>0?360-r*180/Math.PI:r*180/Math.PI},oe=e=>{const t=e*2;return{width:t,height:t}};const p=20,B=e=>e?"#a6a6a6":"#ddd",S=({isActive:e})=>c("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"893",width:p,height:p,children:c("path",{d:"M1003.52 240.64c-30.72-30.72-76.8-30.72-107.52 0L512 619.52 133.12 240.64C102.4 209.92 51.2 209.92 20.48 240.64s-30.72 76.8 0 107.52l435.2 435.2c30.72 30.72 76.8 30.72 107.52 0l435.2-435.2c30.72-30.72 30.72-76.8 5.12-107.52z",fill:B(e),"p-id":"894"})}),O=({isActive:e})=>c("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"1031",width:p,height:p,children:c("path",{d:"M20.48 783.36c30.72 30.72 76.8 30.72 107.52 0L512 404.48l378.88 378.88c30.72 30.72 76.8 30.72 107.52 0 30.72-30.72 30.72-76.8 0-107.52L563.2 240.64c-30.72-30.72-76.8-30.72-107.52 0L20.48 675.84c-25.6 30.72-25.6 76.8 0 107.52z",fill:B(e),"p-id":"1032"})}),P=({isActive:e})=>c("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"1169",width:p,height:p,children:c("path",{d:"M783.36 1003.52c30.72-30.72 30.72-76.8 0-107.52L404.48 512l378.88-378.88c30.72-30.72 30.72-76.8 0-107.52-30.72-30.72-76.8-30.72-107.52 0L240.64 455.68c-30.72 30.72-30.72 76.8 0 107.52l435.2 435.2c30.72 30.72 76.8 30.72 107.52 5.12z",fill:B(e),"p-id":"1170"})}),F=({isActive:e})=>c("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"1307",width:p,height:p,children:c("path",{d:"M240.64 20.48c-30.72 30.72-30.72 81.92 0 112.64l378.88 378.88-378.88 378.88c-30.72 30.72-30.72 76.8 0 107.52s76.8 30.72 107.52 0l435.2-435.2c30.72-30.72 30.72-76.8 0-107.52L348.16 20.48c-30.72-25.6-76.8-25.6-107.52 0z",fill:B(e),"p-id":"1308"})});try{S.displayName="Down",S.__docgenInfo={description:"",displayName:"Down",props:{isActive:{defaultValue:null,description:"",name:"isActive",required:!0,type:{name:"boolean"}}}}}catch{}try{O.displayName="Up",O.__docgenInfo={description:"",displayName:"Up",props:{isActive:{defaultValue:null,description:"",name:"isActive",required:!0,type:{name:"boolean"}}}}}catch{}try{P.displayName="Left",P.__docgenInfo={description:"",displayName:"Left",props:{isActive:{defaultValue:null,description:"",name:"isActive",required:!0,type:{name:"boolean"}}}}}catch{}try{F.displayName="Right",F.__docgenInfo={description:"",displayName:"Right",props:{isActive:{defaultValue:null,description:"",name:"isActive",required:!0,type:{name:"boolean"}}}}}catch{}const Me={[o.Left]:P,[o.Right]:F,[o.Top]:O,[o.Bottom]:S},W=e=>{const{renderArrows:t}=e,i=a.useMemo(()=>Object.assign(Me,t||{}),[t]),r=a.useMemo(()=>({[o.Left]:"arrow-left",[o.Right]:"arrow-right",[o.Top]:"arrow-up",[o.Bottom]:"arrow-down"}),[]),s=a.useMemo(()=>[o.Top,o.Right,o.Bottom,o.Left].map(n=>{const l=i[n];return l?c("div",{className:r[n],children:c(l,{isActive:e.direction===n})},n):null}),[r,e.direction,i]);return c("div",{className:"arrows-wrapper",children:s})};try{W.displayName="ArrowsWrapper",W.__docgenInfo={description:"",displayName:"ArrowsWrapper",props:{direction:{defaultValue:null,description:"",name:"direction",required:!0,type:{name:"enum",value:[{value:'"Center"'},{value:'"Right"'},{value:'"RightTop"'},{value:'"Top"'},{value:'"TopLeft"'},{value:'"Left"'},{value:'"LeftBottom"'},{value:'"Bottom"'},{value:'"BottomRight"'}]}},renderArrows:{defaultValue:null,description:"custom arrows render map",name:"renderArrows",required:!1,type:{name:"ICustomArrowsRenderMap"}}}}}catch{}const D=a.memo(({className:e="",radius:t})=>{const i=oe(t);return c("div",{className:e,style:i})});try{D.displayName="Controller",D.__docgenInfo={description:"",displayName:"Controller",props:{radius:{defaultValue:null,description:"",name:"radius",required:!0,type:{name:"number"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const J=a.memo(Z.forwardRef(({children:e,location:t,transition:i,style:r={},...s},n)=>{const l=a.useMemo(()=>({...r,transform:`translate(${t.left}px, ${t.top}px)`,...i&&{transition:`transform ${i/1e3}s`}}),[r,t,i]);return c("div",{className:"controller-wrapper",style:l,...s,ref:n,children:e})}));try{J.displayName="ControllerWrapper",J.__docgenInfo={description:"",displayName:"ControllerWrapper",props:{location:{defaultValue:null,description:"",name:"location",required:!0,type:{name:"ILocation"}},transition:{defaultValue:null,description:"Transition time for controller to return to origin (unit: ms)",name:"transition",required:!1,type:{name:"number"}}}}}catch{}const Q=a.memo(e=>{const{className:t="",controllerClassName:i="",baseRadius:r=75,controllerRadius:s=35,insideMode:n,throttle:l=0,renderController:d,directionCount:m=U.Five}=e,[h,$]=a.useState(),[x,z]=a.useState(0),G=a.useRef(null),y=a.useMemo(()=>Ne(m,h),[h,m]),V=a.useRef({left:0,top:0}),C=a.useRef(!1),[se,Y]=a.useState(0),v=a.useMemo(()=>n?r-s:r,[n,r,s]),j=a.useMemo(()=>{const f=r-s;return{top:f,left:f}},[r,s]),[ae,k]=a.useState(j),{ghost:ie,isActive:le,getGhostArea:X}=a.useContext(Ce),ce=K("react-joystick",t,{ghost:ie,"ghost-active":le}),E=K("react-joystick-controller",i),ue=oe(r),I=a.useCallback(f=>{const{clientX:M,clientY:T}=f,u=M-V.current.left,g=T-V.current.top,_=Math.sqrt(u*u+g*g);if(z(Math.min(_,v)),_<=v)k({left:u+(r-s),top:g+(r-s)});else{const w=v/_,H=n?v:v-s;k({left:u*w+H,top:g*w+H})}$(Ae(u,g))},[v,r,s,n]);a.useEffect(()=>{const f=u=>{var w;const g=u.target===X(),_=((w=u.target)==null?void 0:w.parentNode)===G.current;(g||_)&&(Y(0),C.current=!0,V.current={left:u.clientX,top:u.clientY},I(u))},M=u=>{C.current&&I(u)},T=()=>{C.current&&(C.current=!1,$(void 0),z(0),k(j),Y(200))};return document.addEventListener("mousedown",f),document.addEventListener("mousemove",M),document.addEventListener("mouseup",T),()=>{document.removeEventListener("mousedown",f),document.removeEventListener("mousemove",M),document.removeEventListener("mouseup",T)}},[I,j,X]);const R=b(e.onChange,l),L=b(e.onAngleChange,l),N=b(e.onDirectionChange,l),A=b(e.onDistanceChange,l);a.useEffect(()=>{R==null||R({angle:h,direction:y,distance:x})},[y,h,x,R]),a.useEffect(()=>{L==null||L(h)},[h,L]),a.useEffect(()=>{N==null||N(y)},[y,N]),a.useEffect(()=>{A==null||A(x)},[x,A]);const de=a.useMemo(()=>d?d({radius:s,className:E}):c(D,{radius:s,className:E}),[E,s,d]);return we("div",{className:ce,style:ue,children:[c(W,{renderArrows:e.renderArrows,direction:y}),c(J,{location:ae,transition:se,ref:G,children:de})]})});try{Q.displayName="Joystick",Q.__docgenInfo={description:"",displayName:"Joystick",props:{className:{defaultValue:null,description:"joystick container's extra className",name:"className",required:!1,type:{name:"string"}},controllerClassName:{defaultValue:null,description:"joystick controller's extra className",name:"controllerClassName",required:!1,type:{name:"string"}},baseRadius:{defaultValue:{value:"75"},description:"joystick base radius",name:"baseRadius",required:!1,type:{name:"number"}},controllerRadius:{defaultValue:{value:"35"},description:"joystick controller radius",name:"controllerRadius",required:!1,type:{name:"number"}},insideMode:{defaultValue:{value:"false"},description:"controller will always be inside joystick's base if `insideMode` is true",name:"insideMode",required:!1,type:{name:"boolean"}},directionCount:{defaultValue:{value:"DirectionCount.Five"},description:`direction count mode
five for: Center、Right、Top、Left、Bottom
nine for: Center、Right、RightTop、Top、TopLeft、Left、LeftBottom、Bottom、BottomRight`,name:"directionCount",required:!1,type:{name:"enum",value:[{value:"0"},{value:"1"}]}},throttle:{defaultValue:{value:"0"},description:"Trigger throttle (ms)",name:"throttle",required:!1,type:{name:"number"}},onChange:{defaultValue:null,description:"Trigger when the any of angle/direction/distance state is changing",name:"onChange",required:!1,type:{name:"((val: IJoystickChangeValue) => void)"}},onAngleChange:{defaultValue:null,description:"Trigger when the angle state is changing",name:"onAngleChange",required:!1,type:{name:"((angle?: number) => void)"}},onDirectionChange:{defaultValue:null,description:"Trigger when the direction state is changing",name:"onDirectionChange",required:!1,type:{name:"((direction: Direction) => void)"}},onDistanceChange:{defaultValue:null,description:"Trigger when the distance state is changing",name:"onDistanceChange",required:!1,type:{name:"((distance: number) => void)"}},renderController:{defaultValue:null,description:"Custom render controller",name:"renderController",required:!1,type:{name:"((props: IJoystickControllerProps) => ReactNode)"}},renderArrows:{defaultValue:null,description:"custom arrows render map",name:"renderArrows",required:!1,type:{name:"ICustomArrowsRenderMap"}}}}}catch{}export{U as D,Ce as G,Q as J,we as a,K as c,c as j};
//# sourceMappingURL=index-eb587089.js.map