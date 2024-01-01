import{D as y,a as r,j as D,J as f}from"./index-eb587089.js";import{R as C}from"./isSymbol-659cbca8.js";import"./_commonjsHelpers-de833af9.js";import"./throttle-7cfb2d79.js";const S=({throttle:o=0,directionCount:h})=>{const[e,x]=C.useState();return r("div",{style:{width:250,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[D(f,{onChange:x,throttle:o,directionCount:h}),r("div",{style:{width:"100%",userSelect:"none"},children:[r("div",{style:{marginTop:48},children:["angle: ",e==null?void 0:e.angle]}),r("div",{children:["direction: ",e==null?void 0:e.direction]}),r("div",{children:["distance: ",e==null?void 0:e.distance]}),o>0&&r("div",{children:["throttle: ",o,"ms"]})]})]})},L={title:"Example",component:S,parameters:{layout:"centered"}},t={},s={args:{throttle:200}},n={args:{directionCount:y.Nine}};var i,a,c;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(c=(a=t.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};var d,m,l;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    throttle: 200
  }
}`,...(l=(m=s.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var p,g,u;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    directionCount: DirectionCount.Nine
  }
}`,...(u=(g=n.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};const w=["AddListener","ThrottleTrigger","NineDirection"];export{t as AddListener,n as NineDirection,s as ThrottleTrigger,w as __namedExportsOrder,L as default};
//# sourceMappingURL=addListeners.stories-56f761f5.js.map
