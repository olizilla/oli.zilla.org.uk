---
link: http://jsbin.com/iKaGel/edit?css,output
layout: ../../layouts/2025.astro
slug: 2014/06/14/animated-css-logo-for-nodebots
---

# Animated CSS logo for nodebots

<style>
.nodebot{
  margin:0;
  z-index:2;
  opacity: 1;
  width:300px;
  height:300px;
  background-color: #F8E01E;
  position:relative;
}
.nodebot .icon{
  position:absolute;
  bottom:8%;
  right:8%;
  width:45.6%;
  height:50%;
}
.nodebot .icon * {
  background: #2e2e2c;
}
.nodebot .icon .bobble{
  width:12.5%;
  height:12%;
  border-radius: 100%;    
  margin:5% auto -3.8%;
}
.nodebot .antenna{
  width:6%;
  margin:0 auto 4%;
  height:16.5%;
  border-bottom-left-radius: 80% 30%;
  border-bottom-right-radius: 80% 30%;
}
.nodebot .head{
  width: 100%;
  height: 48.5%;
  border-top-left-radius: 15% 25%;
  border-top-right-radius: 15% 25%;
  position:relative;
}
.nodebot .head .eye{
  width:18%;
  height:33.5%;
  margin:0 18.2%;
  border-radius: 100%;
  background-color: #F8E01E;  
  display: inline-block;
  position:absolute;
  top:26%;
  left: 0px;
  -webkit-animation: blink 5s 2s infinite;
          animation: blink 5s 2s infinite
}
.nodebot .eye.right{
  left: auto;
  right:0;
}
.nodebot .head .eye.blink {
  height: 6%;
  top:36%;
  border-radius: 0;
  background-color: #000;  
}
.nodebot .neck{
  border-radius: 20px;    
  width: 69%;
  height: 6%;
  margin: 3.6% auto 0;
}
.nodebot .neck:last-child{
  width: 48%;
}

@-webkit-keyframes blink {
  0%, 4%, 8%, 100%{
    height:33.5%;
    border-radius: 100%;
    background-color: #F8E01E;  
    top:26%;
  }
  2%, 6% {
    height: 6%;
    top:36%;
    border-radius: 0;
    background-color: #000;
  }
}

@keyframes blink {
  0%, 4%, 8%, 100%{
    height:33.5%;
    border-radius: 100%;
    background-color: #F8E01E;  
    top:26%;
  }
  2%, 6% {
    height: 6%;
    top:36%;
    border-radius: 0;
    background-color: #000;
  }
}
</style>
<div class="nodebot">
  <div class="icon">
    <div class="bobble"></div>
    <div class="antenna"></div>
    <div class="head">
      <div class="eye left"></div>
      <div class="eye right"></div>
    </div>
    <div class="neck"></div>
    <div class="neck"></div>
  </div>
</div>