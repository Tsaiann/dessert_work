(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3d57a0a5"],{"54f2":function(e,t,a){"use strict";a.r(t);var n=a("7a23");const c={class:"member container"},o={class:"member-page"},r={class:"aside-menu"},m=["onClick"],b={class:"member-list"};function i(e,t,a,i,u,s){const l=Object(n["L"])("guideLine"),d=Object(n["L"])("router-view");return Object(n["F"])(),Object(n["i"])("div",c,[Object(n["n"])(l,{data:i.guideData},null,8,["data"]),Object(n["j"])("div",o,[Object(n["j"])("ul",r,[(Object(n["F"])(!0),Object(n["i"])(n["a"],null,Object(n["J"])(i.memberList,(e,t)=>(Object(n["F"])(),Object(n["i"])("li",{key:t,onClick:t=>i.routerChange(e.name,e.path,e.to)},Object(n["P"])(e.name),9,m))),128))]),Object(n["j"])("div",b,[Object(n["n"])(d)])])])}var u=a("897e"),s=a("6c02"),l={name:"Member",components:{guideLine:u["a"]},setup(){const e=Object(s["c"])(),t=Object(n["H"])([{name:"我的帳戶",path:"Homepage",to:"/member/homepage"},{name:"訂單查詢",path:"Order",to:"/member/order"},{name:"收藏清單",path:"Like",to:"/member/like"},{name:"專屬優惠",path:"Discount",to:"/member/discount"}]),a=Object(n["H"])([{label:"",to:e.currentRoute.value.fullPath}]),c=Object(n["D"])(()=>{for(let n in t)t[n].path==e.currentRoute.value.name&&(a[0].label=t[n].name)}),o=(t,n,c)=>{a[0].label=t,a[0].to=c,e.push({name:n})};return{memberList:t,guideData:a,changeRouterName:c,routerChange:o}}},d=a("6b0d"),j=a.n(d);const p=j()(l,[["render",i]]);t["default"]=p},"897e":function(e,t,a){"use strict";var n=a("7a23");const c={class:"guide","data-space-bottom":"2.5rem"};function o(e,t,a,o,r,m){const b=Object(n["L"])("Breadcrumb");return Object(n["F"])(),Object(n["i"])("div",c,[Object(n["n"])(b,{home:o.home,model:o.pageData},null,8,["home","model"])])}var r={name:"GuideLine",props:{data:Array},setup(e){const t=e.data,a=Object(n["H"])({icon:"pi pi-home",to:"/content"});return{pageData:t,home:a}}},m=a("6b0d"),b=a.n(m);const i=b()(r,[["render",o]]);t["a"]=i}}]);
//# sourceMappingURL=chunk-3d57a0a5.36de4d29.js.map