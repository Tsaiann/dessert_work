(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-30ea379c"],{"897e":function(e,t,a){"use strict";var o=a("7a23");const c={class:"guide","data-space-bottom":"2.5rem"};function r(e,t,a,r,l,n){const m=Object(o["L"])("Breadcrumb");return Object(o["F"])(),Object(o["i"])("div",c,[Object(o["n"])(m,{home:r.home,model:r.pageData},null,8,["home","model"])])}var l={name:"GuideLine",props:{data:Array},setup(e){const t=e.data,a=Object(o["H"])({icon:"pi pi-home",to:"/content"});return{pageData:t,home:a}}},n=a("6b0d"),m=a.n(n);const d=m()(l,[["render",r]]);t["a"]=d},afab:function(e,t,a){"use strict";a.r(t);var o=a("7a23");const c={class:"cart container"},r={class:"row horizontal"},l={"data-width":"100%"},n={class:"row vertical center"},m=Object(o["j"])("i",{class:"pi pi-exclamation-circle",style:{"font-size":"3rem"},"data-space-bottom":"1rem"},null,-1),d=Object(o["j"])("nav",null,null,-1),i={class:"row horizontal center"},s={class:"cart-page"},b={class:"card"},u={class:"fillInfo"},j={class:"fillInfo-left"},p={class:"purchaser","data-space-bottom":"1rem"},O=Object(o["j"])("h2",null,"購買人資訊",-1),h={"data-inset":"1rem"},g={class:"field-checkbox"},C=Object(o["j"])("label",{for:"binary"},"購買人資料與會員資料相同",-1),v={"data-space-bottom":"0.5rem"},F=Object(o["j"])("p",null,"姓名",-1),f={"data-space-bottom":"0.5rem"},V=Object(o["j"])("p",null,"電話號碼",-1),k={"data-space-bottom":"0.5rem"},y=Object(o["j"])("p",null,"電子信箱",-1),I=Object(o["j"])("p",null,"收件地址",-1),w={class:"remark","data-space-bottom":"1.5rem"},P=Object(o["j"])("h2",null,"備註",-1),D={class:"row horizontal center","data-inset":"1rem"},x={class:"fillInfo-right"},S=Object(o["j"])("h2",null,"送貨資訊",-1),A={"data-inset":"1rem"},L={class:"field-checkbox"},N=Object(o["j"])("label",{for:"binary"},"收件人資料與購買人相同",-1),U={"data-space-bottom":"0.5rem"},E=Object(o["j"])("h3",null,"收件人姓名",-1),R=Object(o["j"])("p",null,"請填入收件人真實姓名，以確保順利收件",-1),T={"data-space-bottom":"0.5rem"},M=Object(o["j"])("h3",null,"聯絡電話",-1),J=Object(o["j"])("p",null,"取貨通知將以此電話聯繫",-1),z={"data-space-bottom":"0.5rem"},G=Object(o["j"])("h3",null,"電子信箱",-1),H=Object(o["j"])("h3",null,"收件地址",-1),_=Object(o["j"])("hr",{style:{"border-color":"#eae2d8"}},null,-1),B=Object(o["j"])("div",{"data-space-bottom":"0.5rem"},[Object(o["j"])("h3",null,"寄出時間/自取時間"),Object(o["j"])("p",null,"‧ 請謹慎選擇日期，若要更改需加收150元人工費"),Object(o["j"])("p",null,"‧ 出貨後2天內會到貨，時間會依照物流人員當天狀況而決定"),Object(o["j"])("p",null,"‧ 重大國定假日/年節/中秋或天災 (颱風/地震）有可能延遲到貨 (4天內到達)"),Object(o["j"])("p",null,"‧ 自取請在備註填寫自取時間")],-1),q={"data-space-bottom":"0.5rem"},W=Object(o["j"])("h3",null,"選擇日期",-1),K=Object(o["j"])("hr",{style:{"border-color":"#eae2d8"}},null,-1),Q={class:"row horizontal center","data-space-top":"2rem"};function X(e,t,a,X,Y,Z){const $=Object(o["L"])("Button"),ee=Object(o["L"])("Toast"),te=Object(o["L"])("guideLine"),ae=Object(o["L"])("Steps"),oe=Object(o["L"])("Checkbox"),ce=Object(o["L"])("InputText"),re=Object(o["L"])("Textarea"),le=Object(o["L"])("Calendar");return Object(o["F"])(),Object(o["i"])("div",c,[Object(o["n"])(ee,{position:"center",group:"cartCheckout"},{message:Object(o["W"])(e=>[Object(o["j"])("div",r,[Object(o["j"])("div",l,[Object(o["j"])("div",n,[m,Object(o["j"])("h4",null,Object(o["P"])(e.message.summary),1),d]),Object(o["j"])("div",i,[Object(o["n"])($,{class:"p-button-success",label:"取消",onClick:X.onRejectCheckout,"data-space-right":"1rem"},null,8,["onClick"]),Object(o["n"])($,{class:"p-button-secondary",label:"確定",onClick:t=>X.onConfirmCheckout(e.message.ID)},null,8,["onClick"])])])])]),_:1}),Object(o["n"])(te,{data:X.guideData},null,8,["data"]),Object(o["j"])("div",s,[Object(o["j"])("div",b,[Object(o["n"])(ae,{model:X.steps},null,8,["model"])]),Object(o["j"])("div",u,[Object(o["j"])("div",j,[Object(o["j"])("div",p,[O,Object(o["j"])("div",h,[Object(o["j"])("div",g,[Object(o["n"])(oe,{id:"binary",modelValue:X.purchaserChecked,"onUpdate:modelValue":t[0]||(t[0]=e=>X.purchaserChecked=e),binary:!0,onChange:X.purChecked},null,8,["modelValue","onChange"]),C]),Object(o["j"])("div",v,[F,Object(o["n"])(ce,{type:"text",modelValue:X.state.memberForm.Name,"onUpdate:modelValue":t[1]||(t[1]=e=>X.state.memberForm.Name=e),onChange:t[2]||(t[2]=e=>X.onChange("purchase"))},null,8,["modelValue"])]),Object(o["j"])("div",f,[V,Object(o["n"])(ce,{type:"text",modelValue:X.state.memberForm.Phone,"onUpdate:modelValue":t[3]||(t[3]=e=>X.state.memberForm.Phone=e),onChange:t[4]||(t[4]=e=>X.onChange("purchase"))},null,8,["modelValue"])]),Object(o["j"])("div",k,[y,Object(o["n"])(ce,{type:"text",modelValue:X.state.memberForm.Email,"onUpdate:modelValue":t[5]||(t[5]=e=>X.state.memberForm.Email=e),onChange:t[6]||(t[6]=e=>X.onChange("purchase"))},null,8,["modelValue"])]),Object(o["j"])("div",null,[I,Object(o["n"])(ce,{type:"text",modelValue:X.state.memberForm.Address,"onUpdate:modelValue":t[7]||(t[7]=e=>X.state.memberForm.Address=e),onChange:t[8]||(t[8]=e=>X.onChange("purchase"))},null,8,["modelValue"])])])]),Object(o["j"])("div",w,[P,Object(o["j"])("div",D,[Object(o["n"])(re,{modelValue:X.state.recipientForm.OrderRemark,"onUpdate:modelValue":t[9]||(t[9]=e=>X.state.recipientForm.OrderRemark=e),rows:"5",cols:"30",placeholder:"有任何額外需求請打在此處","data-width":"100%"},null,8,["modelValue"])])]),Object(o["j"])("button",{class:"button_cancel","data-width":"40%",onClick:t[10]||(t[10]=(...e)=>X.handlePrePage&&X.handlePrePage(...e))},"⇽ 返回購物車")]),Object(o["j"])("div",x,[S,Object(o["j"])("div",A,[Object(o["j"])("div",L,[Object(o["n"])(oe,{id:"binary",modelValue:X.recipientChecked,"onUpdate:modelValue":t[11]||(t[11]=e=>X.recipientChecked=e),binary:!0,onChange:X.recChecked},null,8,["modelValue","onChange"]),N]),Object(o["j"])("div",U,[E,Object(o["n"])(ce,{type:"text",modelValue:X.state.recipientForm.Recipient,"onUpdate:modelValue":t[12]||(t[12]=e=>X.state.recipientForm.Recipient=e),onChange:t[13]||(t[13]=e=>X.onChange("recipient"))},null,8,["modelValue"]),R]),Object(o["j"])("div",T,[M,Object(o["n"])(ce,{type:"text",modelValue:X.state.recipientForm.Phone,"onUpdate:modelValue":t[14]||(t[14]=e=>X.state.recipientForm.Phone=e),onChange:t[15]||(t[15]=e=>X.onChange("recipient"))},null,8,["modelValue"]),J]),Object(o["j"])("div",z,[G,Object(o["n"])(ce,{type:"text",modelValue:X.state.recipientForm.Email,"onUpdate:modelValue":t[16]||(t[16]=e=>X.state.recipientForm.Email=e),onChange:t[17]||(t[17]=e=>X.onChange("recipient"))},null,8,["modelValue"])]),Object(o["j"])("div",null,[H,Object(o["n"])(ce,{type:"text","data-space-bottom":"1rem",modelValue:X.state.recipientForm.Addr,"onUpdate:modelValue":t[18]||(t[18]=e=>X.state.recipientForm.Addr=e),onChange:t[19]||(t[19]=e=>X.onChange("recipient"))},null,8,["modelValue"])]),_,B,Object(o["j"])("div",q,[W,Object(o["n"])(le,{id:"icon",modelValue:X.date,"onUpdate:modelValue":t[20]||(t[20]=e=>X.date=e),showIcon:!0},null,8,["modelValue"])])])])]),K,Object(o["j"])("div",Q,[Object(o["j"])("button",{class:"button_confirm","data-width":"60%",onClick:t[21]||(t[21]=(...e)=>X.submitOrder&&X.submitOrder(...e))},"提交訂單")])])])}var Y=a("897e"),Z=a("6c02"),$=a("408b"),ee=a("46ef"),te=a("18cb"),ae=a("5502"),oe={name:"ShoppingData",components:{guideLine:Y["a"]},setup(){const e=Object(o["r"])("reload"),t=Object(Z["c"])(),a=Object(te["b"])(),c=Object(ae["b"])(),r=Object(o["I"])(!1),l=Object(o["I"])(!1),n=Object(o["I"])(),m=Object(o["H"])({memberForm:{Name:"",Phone:"",Email:"",Address:""},recipientForm:{Discounts:[],Recipient:"",Phone:"",Addr:"",OrderRemark:"",Email:"",PaymentMethod:c.getters["cartModules/getCartInfo"].payment,DeliveryMethod:c.getters["cartModules/getCartInfo"].delivery},discountForm:{MemberID:c.getters["memberModules/getID"],Amount:50},orderTotal:c.getters["cartModules/getTotal"]}),d=Object(o["H"])([{label:"購物車",to:"/cart"}]),i=Object(o["H"])([{label:"訂單資訊",to:"/cart"},{label:"填寫資料",to:"/fillInfo"},{label:"資料確認",to:"/finish"}]),s=Object(o["D"])(()=>{const e=JSON.parse(localStorage.getItem("recform")),t=JSON.parse(localStorage.getItem("purform"));null!==t&&(m.memberForm=t,null!==e&&(m.recipientForm=e))}),b=()=>{C(),t.push({name:"Cart"})},u=()=>{a.add({severity:"success",summary:"確定要送出訂單？",group:"cartCheckout"})},j=()=>{a.removeGroup("cartCheckout")},p=async()=>{m.recipientForm.Discounts.push(JSON.parse(localStorage.getItem("cartInfo")).discount);const o=m.recipientForm;Object(ee["a"])($["q"],o,()=>{m.orderTotal>=2e3&&Object(ee["a"])($["e"],m.discountForm,()=>{}),c.commit("cartModules/SET_CARTINFO",m.recipientForm),t.push({name:"Finish"}),a.removeGroup("cartCheckout"),C(),e()}).catch(()=>{a.removeGroup("cartCheckout"),a.add({severity:"error",summary:"請確實填寫資料！",group:"errorBox"})})},O=async()=>{if(!0===r.value){const e="";await Object(ee["a"])($["o"],e,e=>{m.memberForm.Address=e.data.Data.Address,m.memberForm.Name=e.data.Data.Name,m.memberForm.Email=e.data.Data.Email,m.memberForm.Phone=e.data.Data.Phone,g("purchase")})}},h=()=>{!0===l.value&&(m.recipientForm.Addr=m.memberForm.Address,m.recipientForm.Recipient=m.memberForm.Name,m.recipientForm.Phone=m.memberForm.Phone,m.recipientForm.Email=m.memberForm.Email,g("recipient"))},g=e=>{const t={purchase:()=>{setTimeout(()=>{localStorage.setItem("purform",JSON.stringify(m.memberForm))},2e3)},recipient:()=>{setTimeout(()=>{localStorage.setItem("recform",JSON.stringify(m.recipientForm))},2e3)}};t[e]()},C=()=>{localStorage.removeItem("purform"),localStorage.removeItem("recform")};return{guideData:d,state:m,steps:i,purchaserChecked:r,recipientChecked:l,date:n,reloadForm:s,handlePrePage:b,submitOrder:u,onRejectCheckout:j,onConfirmCheckout:p,recChecked:h,purChecked:O,onChange:g}}},ce=a("6b0d"),re=a.n(ce);const le=re()(oe,[["render",X]]);t["default"]=le}}]);
//# sourceMappingURL=chunk-30ea379c.68a02176.js.map