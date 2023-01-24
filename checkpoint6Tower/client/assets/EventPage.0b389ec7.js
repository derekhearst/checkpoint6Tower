import{_ as H,g as x,r as B,w as P,h as G,c as i,u as t,a as e,d as _,t as g,j as R,i as k,n as z,F as V,b as j,k as I,l as y,v as f,m as J,q as b,A as v,P as u,s as p,x as M,o as a,e as O,C as W,p as X,f as K,y as Q}from"./index.c4afede8.js";const r=h=>(X("data-v-e5b193bf"),h=h(),K(),h),Y={key:0,class:"eventPage"},Z={class:"fancyBlur"},ee={key:0,src:"https://www.onlygfx.com/wp-content/uploads/2017/12/cancelled-stamp-1.png",class:"canceled"},te={key:1,src:"https://www.freeiconspng.com/thumbs/sold-out-png/sold-out-png-31.png",class:"canceled"},ne=["src"],oe={class:"eventDetails"},se={class:"eventHeader"},ae={class:"eventSubHeader"},ie={class:"eventDesc"},le={class:"eventFooter"},re={class:"eventCapacity"},ce=r(()=>e("span",null,"spots left",-1)),de={key:0,class:"d-flex gap-2"},ue=r(()=>e("i",{class:"mdi mdi-pencil"},null,-1)),ve=[ue],me={key:3,class:"btn btn-danger",disabled:""},pe={class:"attending"},_e={key:0},ge={key:1},ye={key:2,class:"attendingCard"},fe=["src","title"],be={class:"commentSection"},he={key:0},Ee={key:1},Ce={key:2,class:"commentBackground"},we=["onSubmit"],ke=r(()=>e("label",{for:"body"},"Make a Comment",-1)),Ie=r(()=>e("textarea",{id:"body",name:"body",rows:"3"},null,-1)),Se=r(()=>e("button",{class:"btn btn-primary",title:"post a comment"},"Post Comment",-1)),De=[ke,Ie,Se],xe={class:"commentList"},Be=["hidden"],Pe={class:"d-flex justify-content-between align-items-center"},Ve=r(()=>e("h3",{class:"m-0"},"Edit Event",-1)),Ue=r(()=>e("label",{for:"editName"},"Name",-1)),qe=r(()=>e("label",{for:"edescription"},"Description",-1)),Ne=r(()=>e("label",{for:"ecoverImg"},"Cover Image",-1)),je=r(()=>e("label",{for:"elocation"},"Location",-1)),Me=r(()=>e("label",{for:"estartDate"},"Start Date",-1)),Ae=r(()=>e("label",{for:"ecapacity"},"Capacity",-1)),Le=r(()=>e("label",{for:"etype"},"Type",-1)),Te=r(()=>e("option",{value:"concert"},"Concert",-1)),$e=r(()=>e("option",{value:"convention"},"Convention",-1)),Fe=r(()=>e("option",{value:"sport"},"Sport",-1)),He=r(()=>e("option",{value:"digital"},"Digital",-1)),Ge=[Te,$e,Fe,He],Re={class:"d-flex justify-content-between mt-3"},ze={class:"justify-content-end gap-2 d-flex"},Je=["onClick"],Oe={__name:"EventPage",setup(h){let m=Q(),s=x(()=>v.currentEvent),S=x(()=>v.currentEvent.peopleGoing),c=x(()=>({...v.currentEvent})),E=B(!1);P(()=>{v.myTickets.find(l=>l.eventId==v.currentEvent.id)?E.value=!0:E.value=!1});let D=B(!1);P(()=>{v.account.id==s.value.creatorId?D.value=!0:D.value=!1});async function U(){try{await b.getEventById(m.params.id),v.currentEvent.startDate=new Date(v.currentEvent.startDate).toISOString().slice(0,16)}catch(l){u.error("Error getting event"),p.log(l)}try{await b.getPeopleGoing(m.params.id)}catch(l){p.log(l),u.error("Error getting people going")}try{await M.getCommentsByEventId(m.params.id)}catch(l){p.log(l),u.error("Error getting comments")}}P(()=>{m.params.id&&U()}),G(async()=>{console.log("Event Page Mounted"),await U()});async function A(l){let n=l.target,C={body:n.body.value,creatorId:v.account.id,eventId:m.params.id};try{await M.createComment(C),u.success("Comment Created"),n.reset()}catch(w){p.log(w),u.error("Error creating comment")}}let d=B(!0);async function L(l){try{await u.confirm("Are you sure you want to save these changes?")&&(await b.editEvent(m.params.id,c.value),u.success("Event Updated"),d.value=!0)}catch(n){p.log(n),u.error("Error updating event")}}async function T(){try{await u.confirm("Are you sure you want to cancel this event?")&&(await b.cancelEvent(m.params.id),u.success("Event Canceled"),d.value=!0)}catch(l){p.log(l),u.error("Error canceling event")}}async function $(){try{await b.joinEvent(m.params.id),u.success("Event Joined")}catch(l){p.log(l),u.error("Error joining event")}}async function F(){try{await b.leaveEvent(m.params.id),u.success("Event Left")}catch(l){p.log(l),u.error("Error leaving event")}}return(l,n)=>{var C,w,q,N;return a(),i(V,null,[t(s).id?(a(),i("div",Y,[e("div",{class:"eventCard",style:z({"background-image":`url(${t(s).coverImg})`})},[e("div",Z,[t(s).isCanceled?(a(),i("img",ee)):t(s).capacity?_("",!0):(a(),i("img",te)),e("img",{src:t(s).coverImg,class:"coverImg",name:"cover image",alt:"coverImage"},null,8,ne),e("div",oe,[e("div",se,[e("div",null,g(t(s).name),1),e("div",null,g(new Date(t(s).startDate).toLocaleDateString()),1)]),e("div",ae,[e("div",null,g(t(s).location),1),e("div",null,g(t(s).type),1),e("div",null,g(new Date(t(s).startDate).toLocaleTimeString()),1)]),e("div",ie,g(t(s).description),1),e("div",le,[e("div",re,[R(g(t(s).capacity)+" ",1),ce]),t(v).account.id?(a(),i("div",de,[t(D)&&!t(s).isCanceled?(a(),i("button",{key:0,class:"btn editButton btn-success",onClick:n[0]||(n[0]=o=>k(d)?d.value=!1:d=!1),title:"edit your event"},ve)):_("",!0),!t(E)&&!t(s).isCanceled&&t(s).capacity?(a(),i("button",{key:1,onClick:$,class:"btn btn-primary",title:"attend this event"},"Attend")):!t(s).isCanceled&&t(E)?(a(),i("button",{key:2,onClick:F,class:"btn btn-warning",title:"leave this event"},"Unattend")):(a(),i("button",me,"Sold out"))])):_("",!0)])])])],4),e("div",pe,[(C=t(S))!=null&&C.length?(a(),i("label",_e,"See who is attending")):(a(),i("label",ge,"Nobody attending")),(w=t(S))!=null&&w.length?(a(),i("div",ye,[(a(!0),i(V,null,j(t(S),o=>(a(),i("img",{src:o.profile.picture,class:"attendingPicture",title:o.profile.name},null,8,fe))),256))])):_("",!0)]),e("div",be,[(q=t(s).comments)!=null&&q.length?(a(),i("label",he,"What people are saying")):(a(),i("label",Ee,"Nobody has said anything yet!")),((N=t(s).comments)==null?void 0:N.length)||t(v).account.id?(a(),i("div",Ce,[t(v).account.id?(a(),i("form",{key:0,onSubmit:I(A,["prevent"])},De,40,we)):_("",!0),e("div",xe,[(a(!0),i(V,null,j(t(s).comments,o=>(a(),O(W,{key:o.id,comment:o},null,8,["comment"]))),128))])])):_("",!0)])])):_("",!0),e("div",{class:"editModal",hidden:t(d),onClick:n[11]||(n[11]=o=>k(d)?d.value=!0:d=!0)},[e("form",{onClick:n[10]||(n[10]=I(()=>{},["stop"]))},[e("div",Pe,[Ve,e("button",{class:"closeButton",onClick:n[1]||(n[1]=I(o=>k(d)?d.value=!0:d=!0,["prevent"])),title:"stop editing this event"},"X")]),e("fieldset",null,[Ue,y(e("input",{name:"name",id:"editName",required:"","onUpdate:modelValue":n[2]||(n[2]=o=>t(c).name=o)},null,512),[[f,t(c).name]])]),e("fieldset",null,[qe,y(e("textarea",{name:"description",id:"edescription",rows:"3",required:"","onUpdate:modelValue":n[3]||(n[3]=o=>t(c).description=o)},null,512),[[f,t(c).description]])]),e("fieldset",null,[Ne,y(e("input",{name:"coverImg",id:"ecoverImg",type:"url",required:"","onUpdate:modelValue":n[4]||(n[4]=o=>t(c).coverImg=o)},null,512),[[f,t(c).coverImg]])]),e("fieldset",null,[je,y(e("input",{name:"location",id:"elocation",required:"","onUpdate:modelValue":n[5]||(n[5]=o=>t(c).location=o)},null,512),[[f,t(c).location]])]),e("fieldset",null,[Me,y(e("input",{name:"startDate",id:"estartDate",type:"datetime-local",required:"","onUpdate:modelValue":n[6]||(n[6]=o=>t(c).startDate=o)},null,512),[[f,t(c).startDate]])]),e("fieldset",null,[Ae,y(e("input",{name:"capacity",id:"ecapacity",type:"number",required:"","onUpdate:modelValue":n[7]||(n[7]=o=>t(c).capacity=o)},null,512),[[f,t(c).capacity]])]),e("fieldset",null,[Le,y(e("select",{id:"etype","onUpdate:modelValue":n[8]||(n[8]=o=>t(c).type=o),required:""},Ge,512),[[J,t(c).type]])]),e("div",Re,[e("button",{class:"btn btn-danger",type:"button",onClick:T,title:"cancel your event"},"Cancel Event"),e("div",ze,[e("button",{class:"btn btn-warning",type:"button",onClick:n[9]||(n[9]=o=>k(d)?d.value=!0:d=!0),title:"cancel your edits"},"Cancel"),e("button",{class:"btn btn-primary",onClick:I(L,["prevent"]),title:"save your changes"},"Save",8,Je)])])])],8,Be)],64)}}},Xe=H(Oe,[["__scopeId","data-v-e5b193bf"]]);export{Xe as default};
