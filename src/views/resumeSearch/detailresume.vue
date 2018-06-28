<template>
<el-container>
  <el-main class="header">
    <div>
      <img :src="detailinfo.headerImg  || headuser"  :onerror="defaultImg" />
    </div>
  </el-main>
<el-main class="userinfo">
      <h3>
        {{detailinfo.userName}}
      </h3>
      <p>
        <!-- <span>简历来源:{{detailinfo.platId|capitalize}}</span> -->
        <span v-if="detailinfo.askTime">投递时间{{detailinfo.askTime}}</span>
      </p>
      <div>
    <el-row class="tel" >
       <span class='svg-container'>
          <icon-svg :icon-class="'person'"/>
      </span>
      <span v-if="detailinfo.sex">&nbsp;&nbsp;{{detailinfo.sex |capitalize}}&nbsp;&nbsp;</span>
       <span v-if="detailinfo.age">|&nbsp;&nbsp;{{detailinfo.age}}岁&nbsp;&nbsp;
      </span>
      <span v-if="detailinfo.degree">|&nbsp;&nbsp;{{detailinfo.degree |capitalize}}&nbsp;&nbsp;</span>
       <span v-if="detailinfo.workLengthMax">|&nbsp;&nbsp;{{detailinfo.workLength}}工作经验&nbsp;&nbsp;</span>
      <span v-if="detailinfo.address">|&nbsp;&nbsp;{{detailinfo.address}}&nbsp;&nbsp;</span>
       <span v-if="detailinfo.isMarry">|&nbsp;&nbsp;{{detailinfo.isMarry}}&nbsp;&nbsp;</span>
    <span v-if="detailinfo.politicalStatus">|&nbsp;&nbsp;{{detailinfo.politicalStatus}}&nbsp;&nbsp;</span>
      </el-row>
      <el-row type="flex" justify="center" class="tel">
        <el-col :span="8">
      <div class="grid-content bg-purple">
        <span class='svg-container'>
          <icon-svg :icon-class="'tel'"/>
      </span>
        <span>
          {{detailinfo.phone}}
        </span>
      </div>
      </el-col>
       <el-col :span="8">
      <div class="grid-content bg-purple">
        <span class='svg-container '>
          <icon-svg :icon-class="'email'"/>
      </span>
        <span>
        {{detailinfo.email}}
        </span>
      </div>
      </el-col>
  </el-row>
      </div>
      <div class="button">
        <div class="innerbutton">
          期望工作
        </div>
    </div>
</el-main>
<el-main class="expeectwork">
  <div class="jobinfo">
    <el-row class="row1">
       <span class='svg-container sex'>
          <icon-svg :icon-class="'work'"/>
      </span>
       <span>{{detailinfo.expectJob}}</span>
        <span>
        期望薪资：{{ detailinfo.expectSalaryMin }}- {{ detailinfo.expectSalaryMax }}
        </span>
          <span>{{detailinfo.expectJobProperty}}</span>
           <span>
             <span class='svg-container sex'>
          <icon-svg :icon-class="'address'"/>
      </span>
             {{detailinfo.expectAddress}}
             </span>
    </el-row>
    <el-row class="row2">
       <p>
         自我评价：{{detailinfo.selfEvaluation}}
       </p>
    </el-row>
  </div>
   <div class="button">
        <div class="innerbutton">
          工作经历
        </div>
    </div>
  </el-main>
<el-main class="workLength">
  <div class="worklengthinfo" v-for="(item, index) in detailinfo.workExpList" :key="index" >
      <h3>
      {{item.company}}
    </h3>
    <el-row class="info">
        <el-col :span="12">
          <div class="grid-content bg-purple-dark">
            {{item.industry}}
          </div>
        </el-col>
        <el-col :span="12" class="right">
          <div class="grid-content bg-purple-dark">
           {{item.companyAsset}}
          </div>
        </el-col>
    </el-row>
    <el-row class="info">
        <el-col :span="12">
          <div class="grid-content bg-purple-dark">
            {{item.position}} | 薪资{{item.salary}}
          </div>
        </el-col>
        <el-col :span="12" class="right">
          <div class="grid-content bg-purple-dark">
           {{item.year}} |  {{item.length}}
          </div>
        </el-col>
    </el-row>
    <el-row class="info">
       <div class="grid-content bg-purple-light">
              工作描述
              </div>
              <p v-for="(e,i) in item.desc" :key="i">
               {{e}}
              </p>
    </el-row>
  </div>
    <div class="button">
        <div class="innerbutton">
          项目经验
        </div>
    </div>
</el-main>
<el-main class="projectExp">
  <div class="projectinfo" v-for="(item, index) in detailinfo.projectList" :key="index">
    <li class="row1">
      <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <h3>
                {{item.projectName}}
              </h3>
              </div>
          </el-col>
          <el-col :span="12" class="right">
            <div class="grid-content bg-purple-light">
              {{item.projectDate}}
              </div>
          </el-col>
      </el-row>
    </li>
    <li class="row2">
      <el-row class="desc">
        <div class="grid-content bg-purple-light">
              开发描述:
              </div>
      </el-row>
      <el-row class="desc">
         <div class="grid-content bg-purple-light">
              <p>
                   1.{{item.developDesc}}
              </p>
         </div>
      </el-row>
      <el-row class="desc">
        <div class="grid-content bg-purple-light">
              项目职责描述：
              </div>
      </el-row>
      <el-row class="desc">
        <p v-for="(a, index) in item.dutyDesc" :key="index" >
           {{a}}
        </p>
      </el-row>
    </li>
  </div>
  <div class="button">
        <div class="innerbutton">
          教育经历
        </div>
    </div>
</el-main>
  <el-main class="education">
    <div v-for="(item,index) in detailinfo.educationList" :key="index">
      <div class="educationundegree">
          <el-row>
              <div class="grid-content bg-purple-light">
              <h3>{{item.university}}</h3>
              </div>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                  <span>{{item.degree |capitalize}} |</span>
                  <span>{{item.major}}</span>
              </div>
            </el-col>
            <el-col :span="12" class="right">
              <div class="grid-content bg-purple-light">
                  {{item.educationTime}}
              </div>
            </el-col>
          </el-row>
      </div>
  </div>
    <div class="button">
        <div class="innerbutton">
          技能
        </div>
    </div>
  </el-main>
  <el-footer style="height:auto">
    <div>
       <el-row class="desc" v-for=" (w,i) in detailinfo.certificateList" :key="i">
          <el-col :span="12" class="desc">
            <div class="grid-content bg-purple">
                {{w.certificateName}}
            </div>
            </el-col>
          <el-col :span="12" class="right">
            <div class="grid-content bg-purple-light">
              {{w.time}}
            </div>
            </el-col>
    </el-row>
    </div>
  </el-footer>
</el-container>
</template>
<<script>
import { SEARCHINFO } from '../../json/search'
export default {
  data() {
    return {
      msg: '',
      headuser: require('@/assets/headuser.jpg'),
      defaultImg: 'this.src="' + require('@/assets/headuser.jpg') + '"'
    }
  },
  mounted() {
  },
  filters: { // 编码转文字
    capitalize: function(value) {
      return SEARCHINFO[value]
    }
  },
  props: ['detailinfo']
}
</script>
<style lang="scss" scoped>
.el-container{
  padding: 10px;
  background: #f8f8f8;
  border: 1px dashed #c5c5c5;
}
.el-main{
   min-height: 200px;
    overflow: visible;
 }
 .right{
      text-align: right;
    }
 .header{
   height: 130px;
  min-height:10px;
  position: relative;
  overflow: visible;
   background: -webkit-linear-gradient(left,#9afccf,#17afff);
   img{
     border-radius: 50%;
    height: 124px;
    position: absolute;
    width: 124px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
   }
   div{
     height: 130px;
     width: 130px;
     border-radius: 50%;
     position: absolute;
     left: 50%;
     top: 45px;
     padding: 2px;
     box-shadow: #e3e3e3 2px 2px;
     background-color: white;
    transform:translate(-50%);
    z-index: 200;
   }
 }
 .userinfo{
   padding-top: 70px;
   padding-left: 10%;
   padding-right: 10%;
   overflow: visible;
   box-sizing: border-box;
   background: #FAFAFA;
   position: relative;
   border-bottom: 1px solid #D3DCE4;
    .svg-container{
      font-size: 20px;
      color: #17afff;
      // border: 1px solid #17afff;
    }
   h3{
     text-align: center;
     font-family: PingFangSC-Regular;
      font-size: 36px;

      font-weight: normal;
      padding-bottom: 5px;
   }
   p{
     text-align: center;
     padding-right: 5px;
     font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #A0A0A0;
      padding: 20px;
   }
   .tel{
     padding-bottom: 20px;
   }
   div{
      line-height: 30px;
     font-family: PingFangSC-Regular;
      font-size: 18px;
      color: #8A8A8A;
      text-align: center;
   }
   .button{
   position: absolute;
   width: 200px;
   height: 50px;
   bottom: -25px;
   left: 50%;
   z-index: 200;
   transform: translate(-50%);
   background: #FAFAFA;
    .innerbutton{
     z-index: 200;
     position: absolute;
    width: 120px;
    height: 42px;
    bottom: 0px;
    left: 50%;
    line-height: 42px;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #FFFFFF;
   transform: translate(-50%);
   background: #2d8cf0;
   border-radius: 100px;
   }
  }
 }
.expeectwork{
    overflow: visible;
   box-sizing: border-box;
   position: relative;
   background-color: #FAFAFA;
     padding-top: 56px;
    border-bottom: 1px solid #D3DCE4;
   font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #8A8A8A;
    text-align: center;
    .svg-container{
      font-size: 20px;
      color: #17afff;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      fill: #17afff;
    }
    .jobinfo{
      padding-bottom: 40px;
      text-align: left;
      .row1{
        text-align: center;
      }
      .row2{
       p{
        padding-top: 30px;
        font-family: PingFangSC-Regular;
      font-size: 16px;
       color: #8A8A8A;
      line-height: 26px;
      padding-left: 25px;
      }
      }
      span{
        padding-left: 12px;
        padding-right: 12px;
      }

    }
    .button{
   position: absolute;
   width: 200px;
   height: 50px;
   bottom: -25px;
   left: 50%;
   z-index: 200;
   transform: translate(-50%);
   background: #FAFAFA;
    .innerbutton{
     z-index: 200;
     position: absolute;
    width: 120px;
    height: 42px;
    bottom: 0px;
    left: 50%;
    line-height: 42px;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #FFFFFF;
   transform: translate(-50%);
   background: #2d8cf0;
   border-radius: 100px;
   }
  }
 }
.workLength{
  .worklengthinfo{
    padding-bottom: 56px;
    padding-left: 20px;
    padding-right: 2z0px;
    h3{
    font-family: PingFangSC-Regular;
    font-size: 22px;
    color: #202020;
    font-weight: normal;
    padding-bottom: 10px;
  }
  .info{
    font-family: PingFangSC-Regular;
    font-size: 18px;
    padding-bottom: 10px;
    color: #A0A0A0;
    line-height: 40px;
  }
  }
  padding-top: 53px;
  position: relative;

  border-bottom: 1px solid #D3DCE4;
  background: #FAFAFA;
  .button{
    text-align: center;
   position: absolute;
   width: 200px;
   height: 50px;
   bottom: -25px;
   left: 50%;
   z-index: 200;
   transform: translate(-50%);
   background: #FAFAFA;
    .innerbutton{
     z-index: 200;
     position: absolute;
    width: 120px;
    height: 42px;
    bottom: 0px;
    left: 50%;
    line-height: 42px;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #FFFFFF;
   transform: translate(-50%);
   background: #2d8cf0;
   border-radius: 100px;
   }
  }
}
.projectExp{
  padding-top: 58px;
  background-color: #FAFAFA;
  padding-bottom: 72px;
  border-bottom: 1px solid #D3DCE4;
  position: relative;
   .el-row{
      padding-bottom: 10px;
    }
  .row1{
    .el-row{
      padding-bottom: 10px;
    }
    h3{
      color: #202020;
      font-size: 22px;
    }
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #A0A0A0;
    padding-bottom: 10px;
    border-bottom:1px solid #D3DCE4;
  }
  .button{
    text-align: center;
   position: absolute;
   width: 200px;
   height: 50px;
   bottom: -25px;
   left: 50%;
   z-index: 200;
   transform: translate(-50%);
   background: #FAFAFA;
    .innerbutton{
     z-index: 200;
     position: absolute;
    width: 120px;
    height: 42px;
    bottom: 0px;
    left: 50%;
    line-height: 42px;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #FFFFFF;
   transform: translate(-50%);
   background: #2d8cf0;
   border-radius: 100px;
   }
  }
  .row2{
    .desc{
      font-family: PingFangSC-Regular;
      font-size: 18px;
      color: #8A8A8A;
      line-height: 30px;
      p{
        font-family: PingFangSC-Regular;
      font-size: 18px;
      color: #8A8A8A;
      line-height: 30px;
      }
    }
  }
}
.education{
    padding-top: 53px;
    padding-bottom: 72px;
    position: relative;
    background-color: #FAFAFA;
    border-bottom: 1px solid #D3DCE4;

    .educationundegree{
      border-bottom: 1px solid #D3DCE4;
    }
    .el-row{
      padding-bottom: 10px;
      padding-top: 10px;
    }
    .el-col{
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #A0A0A0;
      .bg-purple{
        font-family: PingFangSC-Regular;
      font-size: 18px;
      color: #8A8A8A;
      line-height: 30px;
      }
    }
    h3{
      font-family: PingFangSC-Regular;
      font-size: 22px;
      color: #202020;
    }
     .button{
   position: absolute;
   width: 200px;
   height: 50px;
   bottom: -25px;
   left: 50%;
   text-align: center;
   z-index: 200;
   transform: translate(-50%);
   background: #FAFAFA;
    .innerbutton{
     z-index: 200;
     position: absolute;
    width: 120px;
    height: 42px;
    bottom: 0px;
    left: 50%;
    line-height: 42px;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #FFFFFF;
   transform: translate(-50%);
   background: #2d8cf0;
   border-radius: 100px;
   }
  }
}
.el-footer{
  padding-top: 53px;
  height: auto;
  padding-bottom: 50px;
  font-family: PingFangSC-Regular;
  font-size: 18px;
  color: #8A8A8A;
  background-color: #FAFAFA;
  .desc{
    .desc{
      font-family: PingFangSC-Regular;
      font-size: 22px;
      color: #202020;
    }
  }
  .right{
    font-family: PingFangSC-Regular;
font-size: 14px;
color: #A0A0A0;
  }
  .el-row{
    padding-bottom: 21px;
  }
}
</style>
