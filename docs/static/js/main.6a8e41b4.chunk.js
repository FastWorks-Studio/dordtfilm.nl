(this.webpackJsonpdordtfilm=this.webpackJsonpdordtfilm||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var i,a=n(0),r=n(1),o=n.n(r),s=n(8),l=n.n(s),u=(n(15),n(3)),c=n(2),d=n(5),h=n(4);n(16),n(17);!function(e){e[e.high=0]="high",e[e.medium=1]="medium",e[e.low=2]="low"}(i||(i={}));var p=function(){function e(){Object(u.a)(this,e)}return Object(c.a)(e,null,[{key:"resolutionClass",get:function(){var e=window.innerHeight*window.innerWidth;return e>=2073600?i.high:e>=921600?i.medium:i.low}}]),e}();p.isSafari=navigator.vendor&&navigator.vendor.indexOf("Apple")>-1&&navigator.userAgent&&-1===navigator.userAgent.indexOf("CriOS")&&-1===navigator.userAgent.indexOf("FxiOS"),p.isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),p.isIphone=/iPhone|iPod/i.test(navigator.userAgent),p.isIpad=/iPad/i.test(navigator.userAgent),p.isAndroid=/iPad/i.test(navigator.userAgent);var v,f=function(){function e(t){Object(u.a)(this,e),this.current=0,this.target=0,this.acceleration=void 0,this.inertia=void 0,this.velocity=0,this.onUpdate=void 0,this.timeout=void 0,this.disableWhenSettledAtTarget=!1,this.isAutoUpdating=!1,this.acceleration=(null===t||void 0===t?void 0:t.acceleration)||1,this.inertia=(null===t||void 0===t?void 0:t.inertia)||.85}return Object(c.a)(e,[{key:"moveTo",value:function(e){this.target=e.to,this.current=e.from,!1!==e.keepVelocity&&(this.velocity=0),this.disableWhenSettledAtTarget=!1!==e.disableWhenSettledAtTarget,!1!==e.selfUpdate&&this.setAutoUpdates(!0)}},{key:"update",value:function(e){var t=10*(10*(this.target-this.current)-this.velocity)*this.acceleration;this.velocity+=t*e,this.current+=this.velocity*e,this.onUpdate&&this.onUpdate(this.current),this.velocity*=this.inertia,this.disableWhenSettledAtTarget&&this.isSettled()&&this.setAutoUpdates(!1)}},{key:"setAutoUpdates",value:function(e){if(this.isAutoUpdating=e,e){var t=1e3/60,n=this;void 0!==this.timeout&&clearInterval(this.timeout),n.timeout=setInterval((function(){n.update(t/1e3)}),t)}else{if(void 0===this.timeout)return;clearInterval(this.timeout)}}},{key:"getIsAutoUpdating",value:function(){return this.isAutoUpdating}},{key:"stop",value:function(){this.setAutoUpdates(!1),this.disableWhenSettledAtTarget=!1,this.velocity=0}},{key:"isSettled",value:function(){var e=Math.abs(this.current-this.target).toFixed(0),t=Math.abs(this.velocity).toFixed(0);return"0"===e&&"0"===t}}]),e}(),b=function(){function e(){Object(u.a)(this,e),this.lut=function(){for(var e=[],t=0;t<256;t++)e[t]=(t<16?"0":"")+t.toString(16);return e}()}return Object(c.a)(e,null,[{key:"uuid",get:function(){return e.count+=1,e.count.toFixed(0)}}]),e}();b.count=0,function(e){e[e.translation=0]="translation",e[e.opacity=1]="opacity",e[e.scale=2]="scale",e[e.rotation=3]="rotation",e[e.blur=4]="blur"}(v||(v={}));var m,y=function(){function e(t,n){Object(u.a)(this,e),this.type=v.translation,this.x=void 0,this.y=void 0,this.x=t,this.y=n}return Object(c.a)(e,[{key:"value",get:function(){return{x:this.x,y:this.y}}}]),Object(c.a)(e,null,[{key:"x",value:function(t){return new e(t,0)}},{key:"y",value:function(t){return new e(0,t)}},{key:"xy",value:function(t,n){return new e(t,n)}}]),e}(),g=function(){function e(t){Object(u.a)(this,e),this.type=v.scale,this.value=void 0,this.value=t}return Object(c.a)(e,null,[{key:"amount",value:function(t){return new e(t)}}]),e}(),j=function(){function e(t){Object(u.a)(this,e),this.type=v.rotation,this.value=void 0,this.value=t}return Object(c.a)(e,null,[{key:"amount",value:function(t){return new e(t)}}]),e}(),k=function(){function e(t){Object(u.a)(this,e),this.type=v.opacity,this.value=void 0,this.value=t}return Object(c.a)(e,null,[{key:"amount",value:function(t){return new e(t)}}]),e}(),O=function(){function e(t){Object(u.a)(this,e),this.type=v.blur,this.value=void 0,this.value=t}return Object(c.a)(e,null,[{key:"amount",value:function(t){return new e(t)}}]),e}(),w=function(){function e(){Object(u.a)(this,e),this.transformations=[]}return Object(c.a)(e,[{key:"translated",value:function(e){return this.transformations.push(y.xy(e.x||0,e.y||0)),this}},{key:"scaled",value:function(e){return this.transformations.push(g.amount(e.amount)),this}},{key:"rotated",value:function(e){return this.transformations.push(j.amount(e.amount)),this}},{key:"opacity",value:function(e){return this.transformations.push(k.amount(e.amount)),this}},{key:"blurred",value:function(e){return this.transformations.push(O.amount(e.amount)),this}},{key:"properties",get:function(){var e={};return this.transformations.forEach((function(t){switch(t.type){case v.translation:e.translation=t.value;break;case v.rotation:e.rotation=t.value;break;case v.opacity:e.opacity=t.value;break;case v.scale:e.scale=t.value;break;case v.blur:e.blur=t.value;break;default:console.assert(!1,"handling ".concat(t.type," was not implemented"))}})),e}}],[{key:"identity",get:function(){return new e}}]),e}();!function(e){e[e.linear=0]="linear",e[e.ease=1]="ease",e[e.easeOut=2]="easeOut",e[e.easeIn=3]="easeIn",e[e.custom=4]="custom"}(m||(m={}));var x=function(){function e(t,n){Object(u.a)(this,e),this.type=void 0,this.formula=void 0,this.type=t,this.formula=n}return Object(c.a)(e,[{key:"value",value:function(e){switch(this.type){case m.linear:return e;case m.ease:return.5*Math.sin(e*Math.PI-.5*Math.PI)+.5;case m.easeIn:return 1-Math.cos(e*Math.PI*.5);case m.easeOut:return Math.sin(e*Math.PI*.5);case m.custom:return console.assert(this.formula,"formula should be set when AnimationCurveType is .custom"),void 0===this.formula||null===this.formula?e:this.formula(e);default:return console.log("AnimationCurveType ".concat(this.type," not implemented")),e}}}],[{key:"spring",value:function(t){return new e(m.custom,(function(e){var n=20*(1-I({optional:null===t||void 0===t?void 0:t.damping,fallback:.8}));return-Math.pow(Math.E,-e/.15)*Math.cos(e*n)+1}))}},{key:"custom",value:function(t){return new e(m.custom,t)}},{key:"linear",get:function(){return new e(m.linear)}},{key:"ease",get:function(){return new e(m.ease)}},{key:"easeOut",get:function(){return new e(m.easeOut)}}]),e}(),A=function(){function e(t,n){var i,a;Object(u.a)(this,e),this.element=void 0,this.startProperties=void 0,this.endProperties=void 0,this.animation=void 0,this.previousUpdate=void 0,this.startTime=void 0,this.element=t,this.animation=n,this.startProperties=(null===(i=n.from)||void 0===i?void 0:i.properties)||w.identity.properties,this.endProperties=(null===(a=n.to)||void 0===a?void 0:a.properties)||w.identity.properties,this.startTime=Date.now()+1e3*(n.delay||0),this.previousUpdate=Date.now()+1e3*(n.delay||0),C(n.delay)?(this.renderState(0),setTimeout(this.renderNextFrame.bind(this),1e3*(n.delay||0))):this.renderNextFrame()}return Object(c.a)(e,null,[{key:"animate",value:function(t,n){return null===t||void 0===t?null:new e(t,n)}}]),Object(c.a)(e,[{key:"cancel",value:function(){this.element=null}},{key:"renderNextFrame",value:function(){if(null!==this.element&&void 0!==this.element){var e=(this.previousUpdate-this.startTime)/(1e3*this.animation.duration);this.previousUpdate=Date.now(),this.renderState(e),e<1?requestAnimationFrame(this.renderNextFrame.bind(this)):(this.element=null,this.animation.completion&&this.animation.completion())}}},{key:"renderState",value:function(e){this.renderOpacity(e),this.renderTransform(e),this.renderFilter(e)}},{key:"renderOpacity",value:function(e){var t=this.interpolate({from:this.startProperties.opacity,to:this.endProperties.opacity,progress:e,fallback:1});P(t)||null===this.element||void 0===this.element||(this.element.style.opacity=(null===t||void 0===t?void 0:t.toFixed(4))||"")}},{key:"renderFilter",value:function(e){var t=this.interpolate({from:this.startProperties.blur,to:this.endProperties.blur,progress:e,fallback:0});null!==this.element&&void 0!==this.element&&void 0!==t&&null!==t&&(this.element.style.filter="blur(".concat(t.toFixed(4),"vmin)"))}},{key:"renderTransform",value:function(e){if(null!==this.element&&void 0!==this.element){var t=this.getScale(e),n=this.getRotation(e),i=this.getTranslation(e),a=[];null!==t&&a.push("scale(".concat(t.toFixed(4),")")),null!==n&&a.push("rotate(".concat(n.toFixed(4),"deg)")),null!==i&&a.push("translate3d(".concat(i.x.toFixed(4),"px, ").concat(i.y.toFixed(4),"px, 0px)"));var r=a.join(" ");this.element.style.transform=r}}},{key:"getScale",value:function(e){return this.interpolate({from:this.startProperties.scale,to:this.endProperties.scale,progress:e,fallback:1})}},{key:"getRotation",value:function(e){return this.interpolate({from:this.startProperties.rotation,to:this.endProperties.rotation,progress:e,fallback:0})}},{key:"getTranslation",value:function(e){var t,n,i,a,r=this.interpolate({from:null===(t=this.startProperties.translation)||void 0===t?void 0:t.x,to:null===(n=this.endProperties.translation)||void 0===n?void 0:n.x,progress:e,fallback:0}),o=this.interpolate({from:null===(i=this.startProperties.translation)||void 0===i?void 0:i.y,to:null===(a=this.endProperties.translation)||void 0===a?void 0:a.y,progress:e,fallback:0});return null===r&&null===o?null:{x:I({optional:r,fallback:0}),y:I({optional:o,fallback:0})}}},{key:"interpolate",value:function(e){var t;if(P(e.from)&&P(e.to))return null;var n=I({optional:e.from,fallback:I({optional:e.fallback,fallback:0})}),i=I({optional:e.to,fallback:I({optional:e.fallback,fallback:0})}),a=(null===(t=this.animation.curve)||void 0===t?void 0:t.value(e.progress))||e.progress;return(1-a)*n+a*i}}]),e}();function C(e){return null!==e&&void 0!==e}function P(e){return!1===C(e)}function I(e){return P(e.optional)?e.fallback:e.optional}var S,z=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var i=arguments.length,a=new Array(i),r=0;r<i;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).title=o.a.createRef(),e.subtitle=o.a.createRef(),e}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)("div",{className:"logo",children:[Object(a.jsx)("p",{className:"logo-title",ref:this.title,children:this.fallbackIfNull(this.props.title,"Dordrecht")}),Object(a.jsx)("p",{className:"logo-subtitle",ref:this.subtitle,children:this.fallbackIfNull(this.props.subtitle,"door de jaren heen")})]})})}},{key:"fallbackIfNull",value:function(e,t){return e||t}},{key:"prepareForAnimation",value:function(){var e,t,n=null===(e=this.title)||void 0===e?void 0:e.current;null!==n&&void 0!==n&&(n.style.opacity="0");var i=null===(t=this.subtitle)||void 0===t?void 0:t.current;null!==i&&void 0!==i&&(i.style.opacity="0")}},{key:"animateIn",value:function(e){A.animate(this.title.current,{from:w.identity.opacity({amount:0}).rotated({amount:10}).blurred({amount:10}).scaled({amount:.95}).translated({x:300}),delay:null===e||void 0===e?void 0:e.delay,duration:3,curve:x.spring()}),A.animate(this.subtitle.current,{from:w.identity.opacity({amount:0}).rotated({amount:-10}).blurred({amount:10}).scaled({amount:.95}).translated({x:-200}),delay:((null===e||void 0===e?void 0:e.delay)||0)+.4,duration:3,curve:x.spring()})}}]),n}(o.a.Component),M=(n(18),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)("div",{className:"page",style:{height:this.props.size,width:this.props.size}})})}}]),n}(o.a.Component)),B=(n(19),n(9));!function(e){e[e.notVisible=0]="notVisible",e[e.singlePixel=1]="singlePixel",e[e.barely=2]="barely"}(S||(S={}));var R=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var i=arguments.length,a=new Array(i),r=0;r<i;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).page=o.a.createRef(),e.backgroundContainer=o.a.createRef(),e.backgroundEntryContainer=o.a.createRef(),e.backgroundImage=o.a.createRef(),e.dim=o.a.createRef(),e.content=o.a.createRef(),e.player=o.a.createRef(),e.backgroundBlurRadius=69,e.contentBlurRadius=69,e.contentOpacity=69,e.dimOpacity=69,e.focalArea=.1,e.backgroundBlurIntensity=1,e.contentBlurIntensity=2,e.focalTransitionSize=.5,e.focalDim=.3,e.doParallax=!0,e.parallaxIntensity=.5,e.parallaxOffset=new f({acceleration:4,inertia:.7}),e.initialBackgroundScale=1.1,e.visibilityLevel=S.notVisible,e.focusUpdateIntervalMs=1e3/24,e.videoEndAnimation=null,e.enableSlowMode=!1,e.consecutiveModeSwitchUpdates=0,e.previousUpdate=0,e}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsxs)("div",{className:"parallax-page",ref:this.page,children:[Object(a.jsx)("div",{className:"parallax-page-background-container-entry",ref:this.backgroundEntryContainer,children:Object(a.jsxs)("div",{className:"parallax-page-background-container",ref:this.backgroundContainer,style:{backgroundColor:this.props.loadingColor||"#333333"},children:[Object(a.jsx)("div",{className:"parallax-page-background-image","aria-hidden":"true",ref:this.backgroundImage}),this.props.video&&Object(a.jsx)(E,{ref:this.player,video:"".concat(this.props.video),loopVideo:this.props.loopVideo,autoplay:this.autoplay,onEnded:this.onVideoEnded.bind(this),xOffset:this.props.backgroundXOffset})]})}),Object(a.jsx)("div",{className:"parallax-page-background-dim",ref:this.dim}),Object(a.jsx)("div",{className:"parallax-page-content-container",ref:this.content,children:this.props.children})]})}},{key:"componentDidMount",value:function(){var e;void 0!==this.props.focalDim&&(this.focalDim=this.props.focalDim),this.doParallax=!!(null===(e=this.page.current)||void 0===e?void 0:e.offsetParent),window.addEventListener("scroll",this.checkIfOnScreen.bind(this)),this.checkIfOnScreen(),!0===this.doParallax&&(Object(B.setInterval)(this.updateFocus.bind(this),this.focusUpdateIntervalMs),window.addEventListener("scroll",this.updateParallax.bind(this)),this.updateParallax()),this.loadBackgroundImage(this.props.image)}},{key:"onVideoEnded",value:function(){this.videoEndAnimation=A.animate(this.backgroundEntryContainer.current,{to:w.identity.opacity({amount:.8}).scaled({amount:1.1}).blurred({amount:1}),duration:4,curve:x.spring()})}},{key:"onVideoWillRewind",value:function(){var e;null===(e=this.videoEndAnimation)||void 0===e||e.cancel();var t=this.backgroundEntryContainer.current;void 0!==t&&null!==t&&(t.style.opacity="1",t.style.filter="",t.style.transform="")}},{key:"checkIfOnScreen",value:function(){this.isInViewport(.8)?this.handleVisibilityLevel(S.barely):this.isInViewport(.99)?this.handleVisibilityLevel(S.singlePixel):this.handleVisibilityLevel(S.notVisible)}},{key:"handleVisibilityLevel",value:function(e){if(this.visibilityLevel!==e){var t=this.visibilityLevel;this.visibilityLevel=e;var n=this.player.current;if(null!==n&&void 0!==n&&!1===this.autoplay)switch(this.visibilityLevel){case S.notVisible:n.stop();break;case S.singlePixel:if(t===S.barely)return;this.onVideoWillRewind(),n.rewind();break;case S.barely:n.play()}}}},{key:"loadBackgroundImage",value:function(e){var t=this;if(void 0!==e&&null!==e){var n="./images/".concat(this.props.image),i=document.createElement("img");i.style.opacity="0",i.src=n;var a=this;i.addEventListener("load",(function(e){var r,o=a.backgroundImage.current;if(void 0!==o&&null!==o){o.style.backgroundImage='url("'.concat(n,'")');var s=null===(r=t.page.current)||void 0===r?void 0:r.getBoundingClientRect(),l=t.props.backgroundXOffset;if(null!==i&&null!==s&&void 0!==s&&null!==l&&void 0!==l){var u=s.width/s.height,c=i.naturalWidth/i.naturalHeight,d=c/u-1;o.style.width="".concat((100*c).toFixed(0),"vh"),o.style.transform="translate3d(".concat(d*l*50,"vw, 0vw, 0vw)")}i=null;var h=a.backgroundEntryContainer.current;if(a.props.animateEntry){if(void 0===h||null===h)return;h.style.opacity="0",setTimeout((function(){A.animate(h,{from:w.identity.opacity({amount:0}).rotated({amount:10}).blurred({amount:2}).scaled({amount:1.5}),duration:7,curve:x.easeOut})}),200)}null!==a.props.onDidLoadBackground&&void 0!==a.props.onDidLoadBackground&&a.props.onDidLoadBackground(a)}}))}}},{key:"getOffsetInViewPort",value:function(){var e=this.page.current;if(void 0===e)return 0;var t=e.getBoundingClientRect();return this.clamped(t.y/t.height,{min:-1,max:1})}},{key:"updateParallax",value:function(){if(!1!==this.isInViewport(1.2)&&!1!==this.doParallax){var e=this.getOffsetInViewPort();this.updateParallaxOffset(e)}}},{key:"updateFocus",value:function(){if(this.adjustPerformance(),!1!==this.isInViewport(1.2)){var e=this.getOffsetInViewPort(),t=Math.max(0,Math.abs(e)-this.focalArea),n=Math.max(0,1-t*(1/this.focalTransitionSize));this.updateContentOpacity(n),this.updateDimValue(n),0!==n&&this.updateContentBlurRadius(t),this.updateBackgroundBlurRadius(t)}}},{key:"updateContentBlurRadius",value:function(e){var t=this.content.current;if(void 0!==t&&!0===this.props.blurContent){var n=2*e*this.contentBlurIntensity;Math.abs(n-this.contentBlurRadius)<.1||(this.contentBlurRadius=n,Math.abs(n)<.1?t.style.filter="":t.style.filter="blur(".concat(n,"vmax)"))}}},{key:"updateBackgroundBlurRadius",value:function(e){var t=this.backgroundContainer.current;if(void 0!==t&&!0===this.props.blurBackground){var n=.3*(1-Math.min(1,e*(1/this.focalTransitionSize)))*this.backgroundBlurIntensity;Math.abs(n-this.backgroundBlurRadius)<.1||(this.backgroundBlurRadius=n,Math.abs(n)<.1?t.style.filter="":t.style.filter="blur(".concat(n,"vmax)"))}}},{key:"updateDimValue",value:function(e){var t=this.dim.current;if(void 0!==t){var n=e*this.focalDim;n!==this.dimOpacity&&(this.dimOpacity=n,t.style.opacity="".concat(n))}}},{key:"updateContentOpacity",value:function(e){var t=this.content.current;if(void 0!==t){var n=parseFloat(e.toFixed(2));n!==this.contentOpacity&&(t.style.opacity="".concat(n))}}},{key:"updateParallaxOffset",value:function(e){var t=this.backgroundContainer.current;if(void 0!==t){var n,i=e*-(window.innerHeight*this.parallaxIntensity);p.isMobile?(this.parallaxOffset.target=i,this.parallaxOffset.update(.02),n=this.parallaxOffset.current):n=i,t.style.transform="translate3d(0px, ".concat(n,"px, 0px)")}}},{key:"isInViewport",value:function(e){var t,n=null===(t=this.page.current)||void 0===t?void 0:t.getBoundingClientRect();return!!n&&(n.y>=-n.height*e&&n.y<=n.height*e)}},{key:"clamped",value:function(e,t){return Math.max(t.min,Math.min(t.max,e))}},{key:"adjustPerformance",value:function(){var e=Date.now(),t=e-this.previousUpdate;this.previousUpdate=e;var n=t/this.focusUpdateIntervalMs;!1===this.enableSlowMode&&n>1.3||!0===this.enableSlowMode&&n<1.1?this.consecutiveModeSwitchUpdates+=1:this.consecutiveModeSwitchUpdates=Math.max(0,this.consecutiveModeSwitchUpdates-1),this.consecutiveModeSwitchUpdates>10&&this.switchSlowMode()}},{key:"switchSlowMode",value:function(){if(this.enableSlowMode=!this.enableSlowMode,this.consecutiveModeSwitchUpdates=0,this.enableSlowMode){var e=this.backgroundContainer.current;if(void 0===e||null===e)return;e.style.transform="",this.doParallax=!1}else this.doParallax=!0}},{key:"autoplay",get:function(){return void 0===this.props.loopVideo||null===this.props.loopVideo||this.props.loopVideo}}]),n}(o.a.Component),D=(n(22),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var i=arguments.length,a=new Array(i),r=0;r<i;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).div=o.a.createRef(),e}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)("div",{ref:this.div,className:"container",style:{justifyContent:this.justifyContent()},children:Object(a.jsx)("button",{className:"button",onClick:this.didTapCallToAction.bind(this),children:this.props.title})})})}},{key:"didTapCallToAction",value:function(){var e=this.props.action;if(!e){var t=this.props.action;return t?t():void 0}window.open(e,"_blank")}},{key:"justifyContent",value:function(){return!0===this.props.center?"center":"start"}},{key:"prepareForAnimation",value:function(){var e,t=null===(e=this.div)||void 0===e?void 0:e.current;null!==t&&void 0!==t&&(t.style.opacity="0")}},{key:"animateIn",value:function(e){A.animate(this.div.current,{from:w.identity.opacity({amount:0}).scaled({amount:.95}).translated({y:10}),delay:null===e||void 0===e?void 0:e.delay,duration:6,curve:x.spring()})}}]),n}(o.a.Component)),V=(n(23),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var i=arguments.length,a=new Array(i),r=0;r<i;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).button=o.a.createRef(),e.img=o.a.createRef(),e}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsxs)("button",{className:"socialmediabutton-button",ref:this.button,onClick:this.didTapCallToAction.bind(this),children:[Object(a.jsx)("img",{className:"socialmediabutton-icon",ref:this.img,alt:this.props.iconAlt,src:"./icons/".concat(this.props.icon)}),this.props.title]})}},{key:"didTapCallToAction",value:function(){var e=this.props.action;if(!e){var t=this.props.action;return t?t():void 0}window.open(e,"_blank")}},{key:"prepareForAnimation",value:function(){var e,t,n=null===(e=this.button)||void 0===e?void 0:e.current;null!==n&&void 0!==n&&(n.style.opacity="0");var i=null===(t=this.img)||void 0===t?void 0:t.current;null!==i&&void 0!==i&&(i.style.opacity="0")}},{key:"animateIn",value:function(e){A.animate(this.button.current,{from:w.identity.opacity({amount:0}).blurred({amount:5}).translated({x:-130}),duration:2,delay:null===e||void 0===e?void 0:e.delay,curve:x.spring()}),A.animate(this.img.current,{from:w.identity.opacity({amount:0}).translated({x:-10}).rotated({amount:-15}),duration:1.5,delay:null===e||void 0===e?void 0:e.delay,curve:x.spring()})}}]),n}(o.a.Component)),F=(n(24),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var i=arguments.length,a=new Array(i),r=0;r<i;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).button=o.a.createRef(),e.img=o.a.createRef(),e.container=o.a.createRef(),e}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)("button",{ref:this.button,className:"down-arrow",onClick:this.didTap.bind(this),"aria-hidden":"true",style:{cursor:void 0===this.props.action?"":"pointer"},children:Object(a.jsx)("div",{className:"down-arrow-container",ref:this.container,children:Object(a.jsx)("img",{ref:this.img,className:"down-arrow-image",src:"./icons/arrow-down.svg",alt:"Pijl naar beneden: indicatie dat hieronder nog meer mogelijk is"})})})})}},{key:"didTap",value:function(){void 0!==this.props.action&&this.props.action()}},{key:"prepareForAnimation",value:function(){var e,t=null===(e=this.button)||void 0===e?void 0:e.current;null!==t&&void 0!==t&&(t.style.opacity="0")}},{key:"animateIn",value:function(e){var t=this.container.current;A.animate(this.button.current,{from:w.identity.opacity({amount:0}).blurred({amount:5}).translated({y:-150}),delay:null===e||void 0===e?void 0:e.delay,duration:3,curve:x.easeOut,completion:function(){t&&(t.style.animation="float 3s infinite")}})}}]),n}(o.a.Component)),T=(n(25),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsx)("a",{href:this.props.url,rel:"noreferrer",target:"_blank",children:this.props.text})}}]),n}(o.a.Component)),N=(n(26),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsx)("h1",{children:this.props.text})}}]),n}(o.a.Component)),L=(n(27),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsx)("p",{children:this.props.children})}}]),n}(o.a.Component)),E=(n(28),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var i=arguments.length,a=new Array(i),r=0;r<i;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).container=o.a.createRef(),e.div=o.a.createRef(),e.player=o.a.createRef(),e}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsx)(W,{ref:this.container,children:Object(a.jsx)("div",{className:"player-container",ref:this.div,children:Object(a.jsx)("video",{className:"player-video",ref:this.player,src:"/video/".concat(this.props.video),muted:!0,loop:this.loopVideo,autoPlay:this.autoplay,playsInline:!0,onPlay:this.onPlay.bind(this),"aria-hidden":"true"})})})}},{key:"componentDidMount",value:function(){window.addEventListener("resize",this.updatePlayerSize.bind(this));var e=this.player.current;if(void 0!==e&&null!==e){e.style.opacity="0";var t=this.props.onEnded;null!==t&&void 0!==t&&e.addEventListener("ended",t)}}},{key:"rewind",value:function(){var e=this.player.current;null!==e&&void 0!==e&&(e.currentTime=0)}},{key:"play",value:function(){var e=this.player.current;if(null!==e&&void 0!==e){var t=this;e.play().then((function(e){t.onPlay()}))}}},{key:"stop",value:function(){var e=this.player.current;null!==e&&void 0!==e&&e.pause()}},{key:"onPlay",value:function(){var e=this.player.current;void 0!==e&&null!==e&&(e.style.opacity="1",this.updatePlayerSize())}},{key:"updatePlayerSize",value:function(){var e=this.div.current;if(void 0!==e&&null!==e){var t=e.getBoundingClientRect();if(void 0!==t&&null!==e){var n=this.player.current;if(void 0!==n&&null!==n){var i=n.videoWidth,a=n.videoHeight;if(0!==i&&0!==a){var r=i/a,o=t.width/t.height,s=n.style;if(void 0!==s&&null!==s)if(r>o){if(s.height="100%",null!==this.props.xOffset&&void 0!==this.props.xOffset){var l=r/o-1;s.transform="translate3d(".concat(l*this.props.xOffset*50,"vw, 0vw, 0vw)")}}else{var u=t.width/r;s.height="".concat((u/t.height*100).toFixed(1),"%")}}}}}}},{key:"loopVideo",get:function(){return void 0===this.props.loopVideo||null===this.props.loopVideo||this.props.loopVideo}},{key:"autoplay",get:function(){return void 0===this.props.autoplay||null===this.props.autoplay||this.props.autoplay}}]),n}(o.a.Component)),U=(n(29),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var i=arguments.length,a=new Array(i),r=0;r<i;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).id=b.uuid,e.aspectRatio=16/9,e.videoSize={width:640,height:480},e}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsx)("div",{className:"youtubeplayer-container",id:this.containerId,children:Object(a.jsx)("div",{className:"youtubeplayer-centercontainer",children:Object(a.jsx)("iframe",{title:this.props.name,className:"youtubeplayer-iframe",id:this.playerId,width:"".concat(this.videoSize.width,"px"),height:"".concat(this.videoSize.height,"px"),src:"https://www.youtube.com/embed/".concat(this.props.watchId),allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"})})})}},{key:"componentDidMount",value:function(){this.aspectRatio=this.props.aspectRatio||this.aspectRatio,window.addEventListener("resize",this.determinePlayerSize.bind(this)),this.determinePlayerSize()}},{key:"determinePlayerSize",value:function(){var e=document.getElementById(this.containerId);if(void 0!==e&&null!==e){var t=e.getBoundingClientRect();if(void 0!==t&&null!==t){var n=window.innerWidth/window.innerHeight,i=t.width/Math.max(1,n);this.updatePlayerSize({width:i,height:i/this.aspectRatio})}}}},{key:"updatePlayerSize",value:function(e){!1!==(e.width!==this.videoSize.width||e.height!==this.videoSize.height)&&(this.videoSize=e,this.setState({}))}},{key:"playerId",get:function(){return"youtubeplayer-".concat(this.id,"-").concat(this.props.watchId)}},{key:"containerId",get:function(){return"youtubeplayercontainer-".concat(this.id,"-").concat(this.props.watchId)}}]),n}(o.a.Component)),W=(n(30),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsx)("div",{className:"fill-container",children:this.props.children})}}]),n}(o.a.Component)),H=(n(31),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var i=arguments.length,a=new Array(i),r=0;r<i;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).div=o.a.createRef(),e}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsx)("div",{ref:this.div,className:"stickybar-container",children:this.props.children})}},{key:"prepareForAnimation",value:function(){}},{key:"animateIn",value:function(e){}},{key:"animatables",get:function(){return o.a.Children.toArray(this.props.children).map((function(e){return e})).filter((function(e){return null!==e&&void 0!==e}))}}]),n}(o.a.Component)),K=(n(32),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var i=arguments.length,a=new Array(i),r=0;r<i;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).blurLogo=window.innerHeight*window.innerWidth<=1e6,e.logo=o.a.createRef(),e.button=o.a.createRef(),e.fbButton=o.a.createRef(),e}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsxs)(R,{image:"home.jpg",video:"home.mp4",blurBackground:!1,blurContent:this.blurLogo,loadingColor:"#000000",focalDim:0,animateEntry:!0,onDidLoadBackground:this.didLoadBackground.bind(this),children:[Object(a.jsx)(H,{children:Object(a.jsx)(V,{ref:this.fbButton,title:"Like ons",icon:"facebook.png",iconAlt:"facebook logo",action:"https://www.facebook.com/dordtfilm"})}),Object(a.jsx)(z,{ref:this.logo})]})}},{key:"componentDidMount",value:function(){var e,t,n;null===(e=this.logo.current)||void 0===e||e.prepareForAnimation(),null===(t=this.button.current)||void 0===t||t.prepareForAnimation(),null===(n=this.fbButton.current)||void 0===n||n.prepareForAnimation()}},{key:"didLoadBackground",value:function(e){this.props.onDidLoadBackground&&this.props.onDidLoadBackground();var t=this.logo.current;null===t||void 0===t||t.animateIn({delay:.7});var n=this.button.current;null===n||void 0===n||n.animateIn({delay:2.5});var i=this.fbButton.current;null===i||void 0===i||i.animateIn({delay:2.3})}}]),n}(o.a.Component)),J=(n(33),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsxs)(R,{image:"about.jpg",video:"boat.mp4",loopVideo:!1,loadingColor:"#626850",backgroundXOffset:.4,children:[Object(a.jsx)(L,{children:"Deze film is met liefdevolle toewijding gemaakt om u de stad te laten ervaren als nooit tevoren. Zie de pracht van de stad en de Dordtse Biesbosch in alle vier de seizoenen en uit allerlei hoeken gefilmd. Bovendien zijn we te land, ter zee en in de lucht."}),Object(a.jsxs)(L,{children:["Natuurlijk komt u van alles te weten over de geschiedenis van de stad en wat Dordrecht nu zo bijzonder maakt. Vergeet echter die slome, stoffige geschiedenislessen van vroeger; hier houden we het vlot en boeiend, afgewisseld met een paar ",Object(a.jsx)("del",{children:"flauwe"})," uitstekende grapjes."]}),Object(a.jsx)(L,{children:"Wat maakt de stad zo bijzonder? Wat maakt een Dordtenaar speciaal? Zijn de inwoners trots op hun stad? We praten hierover met Dordtenaren en andere experts. Samen proberen we te ontdekken wat de Dordtse identiteit kenmerkt en komen we tot soms verrassende ontdekkingen over de stad en haar inwoners."})]})}}]),n}(o.a.Component)),X=(n(34),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var i=arguments.length,a=new Array(i),r=0;r<i;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).blurLogo=window.innerHeight*window.innerWidth<=1e6,e}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsxs)(R,{image:"experience.jpg",video:"experience.mp4",loadingColor:"#77969D",loopVideo:!1,children:[Object(a.jsx)(N,{text:"De ervaring"}),Object(a.jsx)(L,{children:"We nemen u mee door het prachtige oude stadscentrum, de wijken eromheen en de schitterende natuur die het Dordtse eiland te bieden heeft. Door het gebruik van de meest moderne filmtechnieken zoals drones, bewegende camera\u2019s, haarscherpe beelden en surroundgeluid wordt u figuurlijk het beeld ingezogen."}),Object(a.jsxs)(L,{children:["Deze film moet u absoluut gezien hebben als u zichzelf nog Schapenkop wilt durven noemen, \xf3f als u als niet-Dordtenaar meer wilt weten over deze geweldige stad. Ervaar het zelf in ",Object(a.jsx)("em",{children:"Dordrecht door de jaren heen."})]})]})}}]),n}(o.a.Component)),Z=(n(35),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsxs)(R,{image:"people.jpg",video:"people.mp4",loopVideo:!1,loadingColor:"#4E5354",children:[Object(a.jsx)(N,{text:"Over de film"}),Object(a.jsxs)(L,{children:["Onze enthousiaste verteller ",Object(a.jsx)(T,{url:"https://www.coenkoopmans.nl/",text:"Coen Koopmans"})," neemt u vlot, gepassioneerd en soms met een knipoog mee door de hele geschiedenis. Althans, die van Dordrecht. Deze jongeman laat zich graag informeren door experts. Veel mensen zullen ",Object(a.jsx)(T,{url:"https://www.jaapbouman.nl/",text:"Jaap Bouman"})," kennen als d\xe9 stadshistoricus van Dordrecht, hoewel hijzelf die titel weigert. Boswachter ",Object(a.jsx)(T,{url:"http://www.fotoneut.nl/",text:"Jacques van der Neut"})," geeft een trotse rondleiding door de prachtige natuur van de Dordtse Biesbosch.",Object(a.jsx)(T,{url:"http://baskakes.nl/",text:"Bas Kakes"})," verzorgt onder meer de regie, de montage en het camerawerk. ",Object(a.jsx)(T,{url:"https://www.linkedin.com/in/kevin-van-den-hoek-9302b8145/",text:"Kevin van den Hoek"})," verzorgt de grafische vormgeving en special effects, terug te zien in onder andere het titelontwerp en de poster."]})]})}}]),n}(o.a.Component)),_=(n(36),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsxs)(R,{image:"passion.jpg",video:"passion.mp4",loopVideo:!1,backgroundXOffset:.5,loadingColor:"#A08569",children:[Object(a.jsx)(N,{text:"Passie"}),Object(a.jsx)(L,{children:"Het script is gebaseerd op de kennis en liefde voor de stad van scriptadviseur Arend van der Perk. Hij was de opa van zowel Bas Kakes als Coen Koopmans. Door de jaren heen heeft Arend zijn passie voor zijn stad veelvuldig en bewonderenswaardig intens laten blijken. Zo raadt hij bijvoorbeeld af om te reizen naar verre landen, want \u201cde Biesbosch is het mooiste dat er is\u201d."}),Object(a.jsx)(L,{children:"Eind 2018 besloten Kakes en Koopmans dat ze hun volgende film op die passie zouden baseren. De makers hebben al jaren ervaring in het produceren van films en maken met deze titel hun debuut in het genre \u2018documentaire\u2019."})]})}}]),n}(o.a.Component)),q=(n(37),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsxs)(R,{image:"contact.jpg",video:"contact.mp4",blurBackground:!1,children:[Object(a.jsx)(N,{text:"Contact"}),Object(a.jsx)(L,{children:"Wilt u contact opnemen met de makers?"}),Object(a.jsx)(M,{size:"5vh"}),Object(a.jsx)(D,{title:"Mail ons",action:"mailto:info@dordtfilm.nl"})]})}}]),n}(o.a.Component)),Y=(n(38),o.a.Component,function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var i=arguments.length,a=new Array(i),r=0;r<i;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).downArrow=o.a.createRef(),e.debounceTimeout=null,e}return Object(c.a)(n,[{key:"render",value:function(){return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(K,{onDidLoadBackground:this.onDidLoadHome.bind(this)}),Object(a.jsx)(J,{}),Object(a.jsx)(X,{}),Object(a.jsx)(Z,{}),Object(a.jsx)(_,{}),Object(a.jsx)(q,{}),Object(a.jsx)(F,{ref:this.downArrow})]})}},{key:"componentDidMount",value:function(){var e;this.setupSafariResizeFix(),this.setupDownArrowAlphaUpdates(),null===(e=this.downArrow.current)||void 0===e||e.prepareForAnimation()}},{key:"onDidLoadHome",value:function(){var e;null===(e=this.downArrow.current)||void 0===e||e.animateIn({delay:3})}},{key:"setupDownArrowAlphaUpdates",value:function(){var e=this;document.addEventListener("scroll",(function(){var t,n=Math.min(1,Math.max(0,1-window.scrollY/(.1*window.innerHeight))),i=null===(t=e.downArrow.current)||void 0===t?void 0:t.img.current;void 0!==i&&null!==i&&(i.style.opacity="".concat(n))}))}},{key:"refreshPage",value:function(){window.location.reload()}},{key:"setupSafariResizeFix",value:function(){!1!==p.isSafari&&!0!==p.isMobile&&(window.onresize=this.debounce(this.refreshPage,100).bind(this))}},{key:"debounce",value:function(e,t){var n=this;return function(){null!==n.debounceTimeout&&clearTimeout(n.debounceTimeout),n.debounceTimeout=setTimeout((function(){n.debounceTimeout=null,e.apply(n,arguments)}),t)}}}]),n}(o.a.Component));l.a.render(Object(a.jsx)(o.a.StrictMode,{children:Object(a.jsx)(Y,{})}),document.getElementById("root"))}],[[39,1,2]]]);
//# sourceMappingURL=main.6a8e41b4.chunk.js.map