import{D as y,a as r,j as D,J as f}from"./index-e7c0047f.js";import{R as C}from"./isSymbol-659cbca8.js";import"./_commonjsHelpers-de833af9.js";import"./throttle-7cfb2d79.js";const S=({throttle:n=0,directionCountMode:h})=>{const[e,x]=C.useState();return r("div",{style:{width:250,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[D(f,{onChange:x,throttle:n,directionCountMode:h}),r("div",{style:{width:"100%",userSelect:"none"},children:[r("div",{style:{marginTop:48},children:["angle: ",e==null?void 0:e.angle]}),r("div",{children:["direction: ",e==null?void 0:e.direction]}),r("div",{children:["distance: ",e==null?void 0:e.distance]}),n>0&&r("div",{children:["throttle: ",n,"ms"]})]})]})},A={title:"Example",component:S,parameters:{layout:"centered"}},t={},o={args:{throttle:200}},s={args:{directionCountMode:y.Nine}};var i,a,c;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(c=(a=t.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};var d,m,l;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    throttle: 200
  }
}`,...(l=(m=o.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var p,g,u;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    directionCountMode: DirectionCountMode.Nine
  }
}`,...(u=(g=s.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};const L=["AddListener","ThrottleTrigger","NineDirection"];export{t as AddListener,s as NineDirection,o as ThrottleTrigger,L as __namedExportsOrder,A as default};
//# sourceMappingURL=addListeners.stories-49858736.js.map
