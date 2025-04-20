import{D,a as r,j as v,J as S}from"./index-cd526759.js";import{R as o}from"./isSymbol-659cbca8.js";import"./_commonjsHelpers-de833af9.js";import"./throttle-7cfb2d79.js";const A=({throttle:i=0,directionCount:f})=>{const[e,x]=o.useState(),[y,C]=o.useState(!1);return r("div",{style:{width:250,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[v(S,{onChange:x,throttle:i,directionCount:f,onActiveChange:C}),r("div",{style:{width:"100%",userSelect:"none"},children:[r("div",{style:{marginTop:48},children:["angle: ",e==null?void 0:e.angle]}),r("div",{children:["direction: ",e==null?void 0:e.direction]}),r("div",{children:["distance: ",e==null?void 0:e.distance]}),i>0&&r("div",{children:["throttle: ",i,"ms"]}),r("div",{children:["active: ",y?"true":"false"]})]})]})},w={title:"Example",component:A,parameters:{layout:"centered"}},t={},s={args:{throttle:200}},n={args:{directionCount:D.Nine}};var a,c,d;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var m,l,p;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    throttle: 200
  }
}`,...(p=(l=s.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var u,g,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    directionCount: DirectionCount.Nine
  }
}`,...(h=(g=n.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};const E=["AddListener","ThrottleTrigger","NineDirection"];export{t as AddListener,n as NineDirection,s as ThrottleTrigger,E as __namedExportsOrder,w as default};
//# sourceMappingURL=addListeners.stories-832e074f.js.map
