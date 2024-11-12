import{$ as F,A as p,G as c,J as f,K as v,L as b,M as e,N as t,O as d,P as j,Q as m,R as y,T as o,U as M,V as u,aa as L,ba as T,c as S,f as _,j as w,ka as P,la as H,m as I,ma as V,n as C,r as k,ra as A,s as E,t as l,u as h,wa as D,xa as G,z as s}from"./chunk-B4Q3333Y.js";var g=class r{constructor(i){this._httpClient=i}loadSpecialties(){return this._httpClient.get(D.API_URL+"specialties").pipe(_(i=>i))}static \u0275fac=function(n){return new(n||r)(I(V))};static \u0275prov=w({token:r,factory:r.\u0275fac,providedIn:"root"})};var O=()=>[],Z=r=>({"text-blue-600 bg-blue-100 hover:bg-blue-200 hover:text-blue-700":r});function U(r,i){if(r&1&&(e(0,"tr",7)(1,"th",13),o(2),t(),e(3,"td",14),o(4),t(),e(5,"td",14),o(6),t(),e(7,"td",15)(8,"button",16),l(),e(9,"svg",17),d(10,"path",18),t()(),h(),e(11,"button",19),l(),e(12,"svg",17),d(13,"path",20),t()(),h(),e(14,"button",21),l(),e(15,"svg",17),d(16,"path",22),t()()()()),r&2){let n=i.$implicit;s(2),u(" ",n.name," "),s(2),u(" ",n.description," "),s(2),u(" ",n.doctors," ")}}function q(r,i){if(r&1){let n=j();e(0,"li")(1,"button",23),m("click",function(){let x=k(n).$index,B=y();return E(B.updatePageIdx(x+1))}),o(2),t()()}if(r&2){let n=i.$index,a=y();s(),c("ngClass",T(2,Z,n+1===a.pageIdx)),s(),M(n+1)}}var $=class r{constructor(i,n,a){this._specialtyService=i;this._authService=n;this._router=a}specialtiesList=[];pages=0;pageIdx=1;ngOnInit(){this._authService.isLogged()?this.retrieveData():this._router.navigate(["/"])}retrieveData(){return S(this,null,function*(){yield this._specialtyService.loadSpecialties().subscribe(i=>{this.specialtiesList=i,this.paginationSetup()})})}paginationSetup(){this.specialtiesList.length===0&&(this.pages=1),this.pages=Math.ceil(this.specialtiesList.length/5)}updatePageIdx(i){this.pageIdx=i}showContentPage(i){return this.pageIdx=i,this.specialtiesList.slice((this.pageIdx-1)*5,this.pageIdx*5)}static \u0275fac=function(n){return new(n||r)(p(g),p(G),p(A))};static \u0275cmp=C({type:r,selectors:[["app-specialties"]],standalone:!0,features:[F],decls:33,vars:3,consts:[[1,"flex","flex-col","justify-center","font-IBM","bg-whiteFixed","rounded-md","shadow-sm","my-10","mx-20","p-6","space-y-4"],[1,"text-3xl","font-medium"],[1,"text-sm","text-slate-500"],[1,"relative","overflow-x-auto"],[1,"w-full","text-sm","text-left","rtl:text-right","text-gray-500"],[1,"text-xs","text-gray-700","uppercase","bg-gray-100"],["scope","col",1,"px-6","py-3"],[1,"bg-white","border-b","hover:bg-gray-50"],[1,"flex","justify-end"],["aria-label","Page navigation example"],[1,"inline-flex","-space-x-px","text-sm"],[1,"flex","items-center","justify-center","px-3","h-8","ms-0","leading-tight","text-gray-500","bg-white","border","border-e-0","border-gray-300","rounded-s-lg","hover:bg-gray-100","hover:text-gray-700",3,"click","disabled"],[1,"flex","items-center","justify-center","px-3","h-8","leading-tight","text-gray-500","bg-white","border","border-gray-300","rounded-e-lg","hover:bg-gray-100","hover:text-gray-700",3,"click","disabled"],["scope","row",1,"px-6","py-4","font-medium","text-gray-900","whitespace-nowrap"],[1,"px-6","py-4"],[1,"flex","flex-row","space-x-2","px-6","py-2"],["type","button",1,"text-white","bg-primaryGreen","hover:bg-secondaryGreen","focus:ring-4","focus:outline-none","focus:ring-blue-300","font-medium","rounded-lg","text-sm","p-2","text-center","inline-flex","items-center"],["aria-hidden","true","xmlns","http://www.w3.org/2000/svg","width","24","height","24","fill","none","viewBox","0 0 24 24",1,"w-4","h-4","text-white"],["stroke","currentColor","stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M5 11.917 9.724 16.5 19 7.5"],["type","button",1,"text-sm","p-2","text-center","inline-flex","items-center","text-white","bg-orange-300","hover:bg-orange-400","focus:ring-4","focus:outline-none","focus:ring-blue-300","font-medium","rounded-lg"],["stroke","currentColor","stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"],["type","button",1,"text-sm","p-2","text-center","inline-flex","items-center","text-white","bg-red-400","hover:bg-red-600","focus:ring-4","focus:outline-none","focus:ring-blue-300","font-medium","rounded-lg"],["stroke","currentColor","stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"],[1,"flex","items-center","justify-center","px-3","h-8","leading-tight","text-gray-500","bg-white","border","border-gray-300","hover:bg-gray-100","hover:text-gray-700",3,"click","ngClass"]],template:function(n,a){n&1&&(e(0,"div",0)(1,"div")(2,"h2",1),o(3,"Listado de Especialidades"),t(),e(4,"p",2),o(5,"A continuaci\xF3n se muestra un listado de las especialidades registradas."),t()(),e(6,"div")(7,"div",3)(8,"table",4)(9,"thead",5)(10,"tr")(11,"th",6),o(12," Especialidad "),t(),e(13,"th",6),o(14," Descripci\xF3n "),t(),e(15,"th",6),o(16," Doctores "),t(),e(17,"th",6),o(18," Acciones "),t()()(),e(19,"tbody"),v(20,U,17,3,"tr",7,f),t()()()(),e(22,"div",8)(23,"nav",9)(24,"ul",10)(25,"li")(26,"button",11),m("click",function(){return a.updatePageIdx(a.pageIdx-1)}),o(27,"Anterior"),t()(),v(28,q,3,4,"li",null,f),e(30,"li")(31,"button",12),m("click",function(){return a.updatePageIdx(a.pageIdx+1)}),o(32,"Siguiente"),t()()()()()()),n&2&&(s(20),b(a.showContentPage(a.pageIdx)),s(6),c("disabled",a.pageIdx===1),s(2),b(L(2,O).constructor(a.pages)),s(3),c("disabled",a.pageIdx===a.pages))},dependencies:[H,P],encapsulation:2})};export{$ as SpecialtiesComponent};
