<template>
  <div class="resumedetails" id="resumeDetails">
    <!--简历详情 -->
      <div class="resumup">
      <div class="details-head">
         <Row>
            <Col span="18" style="padding-top:7px;">
              <div class="grid-content bg-purple">
                <div class="details-top">
                  <p>{{detailsedetailed.jobSeekerName}}</p>
                  <div class="personLiable">负责人：<span>{{detailsedetailed.handleUserName}}</span></div>
                </div>
              </div>
            </Col>
            <Col span="18" style="padding-top:7px;">
              <div class="grid-content bg-purple">
                  <div class="leftheight">
                    <div class="details-cont">
                      <Row :gutter="20" v-if="detailsedetailed.jobList.length">
                            <span class="fl">
                                投递职位：
                            </span>
                          <Col span="21">
                            <div class="grid-content bg-purple wordbreak" >
                              {{detailsedetailed.jobList[0].jobName}}
                              <Tag  v-bind:class="{ 'publishState': detailsedetailed.jobList[0].publishState === '130002', 'timeout': detailsedetailed.jobList[0].publishState === '130001'|| detailsedetailed.jobList[0].publishState === '130003' || detailsedetailed.jobList[0].publishState === '130004' || detailsedetailed.jobList[0].publishState === '130005' || detailsedetailed.jobList[0].publishState === '130006' }" color="green">
                                {{detailsedetailed.jobList[0].publishState |codeformat}}
                              </Tag>
                              <Dropdown trigger="click" v-if="detailsedetailed.jobList.length>1">
                                  <a href="javascript:void(0)" style="color:#000;">
                                    <Icon type="arrow-down-b" style="color:#2d8cf0;"></Icon>
                                  </a>
                                  <DropdownMenu slot="list" v-for='item in detailsedetailed.jobList' :key="item">
                                      <DropdownItem v-if="!(item.jobName===detailsedetailed.jobList[0].jobName)">
                                        {{item.jobName}} 
                                        <Tag  v-bind:class="{ 'publishState': item.publishState === '130002', 'timeout': item.publishState === '130001'|| item.publishState === '130003' || item.publishState === '130004' || item.publishState === '130005' || item.publishState === '130006' }" color="green">
                                            {{item.publishState |codeformat}}
                                        </Tag>
                                      </DropdownItem>
                                  </DropdownMenu>
                              </Dropdown>
                            </div>
                          </Col>
                    </Row>
                    <Button type="text" icon="compose" size="mini" class="detailediting" @click='detailditing($event,detailsedetailed.resumeState,detailsedetailed.resumeId,detailsedetailed.seekerId)' v-show="!isrelevance && +detailsedetailed.resumeState !== 60009">编辑</Button>
                    <Row style="clear: both">
                      <Col :span="8">
                        <div class="grid-content bg-purple">
                          <p class="basic"><span>性别：</span><span>{{detailsedetailed.sex|codeformat}}</span></p>
                        </div>
                      </Col>
                      <Col :span="8">
                        <div class="grid-content bg-purple-light">
                          <p class="basic"><span>期望地点：</span><span>{{detailsedetailed.expectPlace|| `未填写`}}</span></p>
                        </div>
                      </Col>
                      <Col :span="8">
                        <div class="grid-content bg-purple">
                          <p class="basic"><span>毕业院校：</span><span>{{detailsedetailed.university|| `未填写`}}</span></p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="8">
                        <div class="grid-content bg-purple">
                          <p class="basic"><span>年龄：</span><span>{{detailsedetailed.age}}岁</span></p>
                        </div>
                      </Col>
                      <Col span="8">
                        <div class="grid-content bg-purple-light">
                          <p class="basic"><span>学历：</span><span>{{detailsedetailed.degree| codeformat}}</span></p>
                        </div>
                      </Col>
                      <Col span="8">
                        <div class="grid-content bg-purple">
                          <p class="basic"><span>电话：</span><span>{{detailsedetailed.phone}}</span></p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="8">
                        <div class="grid-content bg-purple">
                          <p class="basic"><span>工作经验：</span><span>{{detailsedetailed.workLength}}</span><span v-if="detailsedetailed.workLength"></span></p>
                        </div>
                      </Col>
                      <Col span="8">
                        <div class="grid-content bg-purple-light">
                          <p class="basic"><span>专业：</span><span>{{detailsedetailed.major}}</span></p>
                        </div>
                      </Col>
                      <Col span="8">
                        <div class="grid-content bg-purple">
                          <p class="basic"><span>邮箱：</span><span>{{detailsedetailed.email}}</span></p>
                        </div>
                      </Col>
                    </Row>
                    </div>
                    <div class="personLiable1"> <span>简历类型： {{detailsedetailed.flowType|codeformat}}</span>&nbsp;&nbsp;渠道来源：<span>{{detailsedetailed.resumeFrom| codeformat}}</span></div>
                    <!-- 简历json渲染部分结束 -->
                  </div>
                </div>
            </Col>
            <Col span="6" class="right_position" v-if="detailsedetailed.resumeState == '60011'">
                <div class="grid-content bg-purple">
                  <div class="rightbox">
                    <div class="rightone-info">
                      信息待确认
                    </div>
                  </div>
                </div>
            </Col>
            <Col :span="6" class="right_position" v-if="detailsedetailed.resumeState != '60011'">
              <div class="grid-content bg-purple">
                <div class="rightbox">
                  <div class="rightone">
                    <div class="righttitle">
                      <Button type="primary"  class="guanlian" v-show="isrelevance" @click='relevance' :disabled="isget">
                        <icon-svg icon-class="relevance"></icon-svg>
                        关联职位
                      </Button>
                      <Modal
                        title="关联职位"
                        v-model="showrelevance"
                        center>
                        <Select v-model="jobandhr" value-key="id" filterable placeholder="请选择">
                          <Option
                            v-for="item in listforjob"
                            :key="item.id"
                            :label="item.jobName"
                            :value="item.id">
                            <span style="float: left">{{ item.jobName}}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.publishUserName }}</span>
                          </Option>
                        </Select >
                        <div class="relevance_text">请选择需要关联的职位，不关联职位简历不可处理！</div>
                        <span slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="torelevanceJob">确 定</el-button>
                          <el-button @click="showrelevance = false">取 消</el-button>
                        </span>
                      </Modal>
                      <div class="righttitle" v-show="+detailsedetailed.resumeState === 60009">
                        <span class="el-dropdown-link">
                          <a style="color:#ccc;">已入职</a>
                        </span>
                      </div>
                      <el-dropdown type="primary" @command='handleCommand' style="width:103px; height:32px; line-height:32px;" trigger="click" v-show="!isrelevance && +detailsedetailed.resumeState !== 60009">
                        <Button type="primary">
                          {{detailsedetailed.resumeState|codeformat}}
                          <Icon type="arrow-down-b"></Icon>
                        </Button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command='60001' :disabled="detailsedetailed.resumeState>=60001">待处理</el-dropdown-item>
                        <el-dropdown-item command='60010' :disabled="detailsedetailed.resumeState==60008 ||detailsedetailed.resumeState==60010">面试中</el-dropdown-item>
                        <el-dropdown-item command='60008' :disabled="detailsedetailed.resumeState==60008" >待入职</el-dropdown-item>
                        <el-dropdown-item command='60009'>已入职</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                      <Modal
                        title="移入已入职"
                        v-model="isentry"
                        width="22%"
                        class="entry"
                        center>
                          <Form :model="form">
                            <FormItem  label="入职部门" :label-width="`100px`">
                              <el-cascader 
                                  placeholder="可搜索部门"
                                  :options="deptlist"
                                  filterable
                                  change-on-select
                                  v-model="deptId"
                                >
                              </el-cascader>
                            </FormItem >
                            <FormItem label="入职职位" :label-width="`100px`">
                              <Select v-model="joinjob" value-key="id" filterable placeholder="请选择">
                                <Option
                                  v-for="item in listforjob"
                                  :key="item.id"
                                  :label="item.jobName"
                                  :value="item.id">
                                  <span style="float: left">{{ item.jobName}}</span>
                                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.publishUserName }}</span>
                                </Option>
                              </Select>
                            </FormItem>
                          </Form >
                          <span slot="footer" class="dialog-footer">
                            <Button type="primary" @click="shiftin">确 定</Button>
                            <Button @click="isentry = false">取 消</Button>
                          </span>
                        </Modal>
                    </div>
                    <div class="rithtlise" v-show="!isrelevance">
                      <Row>
                        <!-- 发送offer -->
                        <Row>
                          <Col :span="12">
                            <div class="grid-content bg-purple">
                                <Button type="text" @click="sendoffer('offer')" v-if="+detailsedetailed.resumeState !== 60001 && +detailsedetailed.resumeState !== 60009"><a>发送offer</a></Button>
                                <Button disabled type="text" v-else><a style="color: #c0c4cc">发送offer</a></Button>
                            </div>
                          </Col>
                          <!-- 分配 -->
                          <Col :span="12" class="allottowho">
                            <div class="grid-content bg-purple-light" id="resumeDetails_assigns">
                              <Button type="text" v-if="+detailsedetailed.resumeState !== 60009" @click="allotlis"><a>分配</a></Button>
                              <Button disabled type="text" v-else><a style="color: #c0c4cc">分配</a></Button>
                              <Modal 
                               title='分配简历' 
                               v-model='dialogFormVisible4'>
                                <Form :model='form'>
                                  <div class='block recommender'>
                                    <div class="dilo_header">
                                        <div style="display:flex;height:40px;line-height:40px">
                                            <span>分配给</span>
                                            <p @click="isTree=true">
                                                <Input v-model="orgName" placeholder="EHR组织架构" :readonly="true" width="225" style="margin-left:20px"></Input>
                                            </p>
                                          </div>
                                        <TreeCom v-if="isTree" @sendman="sendman" :FirstName="FirstName" :FirstId="FirstId" :personType="personType" :leafNode="leafNode" :isMan="isMam"></TreeCom>
                                    </div>
                                  </div>
                                </Form>
                                <div slot='footer' class='dialog-footer'>
                                  <el-button type='primary' @click="addpeop"  size='small'>确 定</el-button>
                                  <el-button @click='dialogFormVisible4 = false' size='small'>取 消</el-button>
                                </div>
                              </Modal>
                            </div>
                          </Col>
                        </Row>
                        <!-- 简历放弃逻辑代码 -->
                        <Col :span="12">
                            <div class="grid-content bg-purple">
                                <Button type="text" @click="sendoffer('view')" v-if="+detailsedetailed.resumeState !== 60008 && +detailsedetailed.interviewStatus === 1 && +detailsedetailed.resumeState !== 60009"><a>面试通知</a></Button>
                                <Button disabled type="text" v-else><a style="color: #c0c4cc">面试通知</a></Button>
                            </div>
                        </Col>
                        <!-- 面试通知排序在上面、推送简历table未写入 -->
                        <Col :span="12" class="resumeDetails_abandon">
                          <div class="grid-content bg-purple" id="resumeDetails_abandon">
                            <Button type="text" @click="giveUptoother" v-if="+detailsedetailed.resumeState !== 60009"><a>放弃</a></Button>
                            <Button disabled type="text" v-else><a style="color: #c0c4cc">放弃</a></Button>
                            <Modal
                              title="提示"
                              v-model="togiveUp"
                              width="300"
                              :before-close="handleClose">
                              <span>您选择的简历放弃后将不可操作,确认放弃？</span>
                              <span slot="footer" class="dialog-footer">
                                <Button type="primary" @click="giveUpto">确 定</Button>
                                <Button @click="togiveUp = false">取 消</Button>
                              </span>
                            </Modal>
                            <Modal 
                              class="talent" 
                              title='进入人才库' 
                              v-model='dialogFormVisible3'
                            >
                              <Form :model='form1' ref="ruleGiveup" :label-width="80" :rules="rulegiveup">
                                <div class='block recommender'>
                                  <FormItem prop='talentType' label='人才分类'>
                                    <Select v-model='form1.talentType' placeholder='请选择' style="width:300px;">
                                      <Option
                                        v-for='item in options2'
                                        :key='item.value'
                                        :value='item.value'>
                                        {{item.label}}
                                      </Option>
                                    </Select>
                                  </FormItem >
                                </div>
                                <div class='block recommender'>
                                  <FormItem prop='poolType' label='移入'>
                                    <Select v-model='form1.poolType' placeholder='请选择' style="width:300px;">
                                      <Option
                                        v-for='item in options3'
                                        :key='item.value'
                                        :label='item.label'
                                        :value='item.value'>
                                      </Option>
                                    </Select>
                                  </FormItem>
                                </div>
                                <div class='recommender'>
                                  <FormItem prop='reason' label='入库原因'>
                                    <Select v-model='form1.reason' placeholder='请选择' style="width:200px;">
                                      <Option
                                        v-for='item in options4'
                                        :key='item.value'
                                        :label='item.label'
                                        :value='item.value'>
                                      </Option>
                                    </Select>
                                  </FormItem>
                                </div>
                                <div class='recommender comments'>                   
                                  <FormItem label='备注' prop='comments'>
                                    <Input type='textarea' v-model='form1.comments' placeholder='请输入' style="width:300px;"></Input>
                                  </FormItem>
                                </div>
                              </Form>
                              <div slot='footer' class='dialog-footer'>
                                <Button type='primary' @click="giveUpclick">确 定</Button>
                                <Button @click='dialogFormVisible3 = false'>取 消</Button>
                              </div>
                            </Modal>
                          </div>
                        </Col>
                        <!-- 简历放弃 -->
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
         </Row>
        <!-- 简历json渲染部分 -->
        <div class="details-bottom">
          <Tabs v-model="activeName" @tab-click="handleClick">
            <!-- 简历详情 -->
            <TabPane  label="简历详情" name="1">
              <iframe :src="detailsedetailed.pdfPath" v-cloak frameborder="0" id="pdfContainer" name="pdfContainer" class="pdf" v-if="detailsedetailed.pdfPath" ></iframe>
              <detailresume :detailinfo='detailinfo' v-cloak v-else-if="detailsedetailed.inWay === `190002`||detailsedetailed.inWay === `190001`||detailsedetailed.inWay === `190005`"></detailresume>              
              <div v-else>
                <div class="photoBox" v-cloak>
                  <img class="photoBox_img" src="../../assets/404/404.png">
                  <p>
                    简历暂时无法预览，请下载简历查看！
                  </p>
                </div>
              </div>
            </TabPane >
            <TabPane  label="拨打记录" name="3">
              <div class="callRecord" v-for="item in callRecordList">
                <p class="callRecord_type">
                  <!-- item.dialResult === '240004'?'未接通':'接通' -->
                  <span>{{callmessage_map[item.dialResult]}}</span><span v-if="item.dialResult != '240001' && item[callValueForm_map[item.dialResult]]"
                  >{{item.dialResult === '240003'?myDate(item[callValueForm_map[item.dialResult]]) : '&nbsp;&nbsp;' + (item[callValueForm_map[item.dialResult]] || '')}}</span>
                </p>
                <p class="callRecord_man">
                  <span>{{item.dialPersonName}}</span><span
                  >{{item.createdDate | moment}}</span>
                </p>
              </div>
              <div class="callRecord_add" @click="callRecordVisible = true" v-show="!isrelevance && +detailsedetailed.resumeState !== 60009" >
                <Icon type="plus-circled"></Icon> 添加拨打记录
              </div>
              <!-- 拨打记录弹窗部分 -->
              <Modal 
                title="添加拨打记录" 
                custom-class='callRecord_dialog' 
                v-model="callRecordVisible"
                >
                <Form :label-width="40" class="callrecord-row">
                  <RadioGroup v-model="callRecordRadio">
                    <FormItem>
                      <Row style="margin: 5px;">
                          <Col span="8">
                              <Radio label="240001">确认面试</Radio>
                          </Col>
                          <Col span="8" offset="8"></Col>
                      </Row>
                      <Row style="margin: 5px;">
                          <Col span="4">
                            <Radio label="240002">拒绝面试</Radio>
                          </Col>
                          <Col span="12" offset="4" style="display:flex">
                          <div style="width:20px" class="el-bt-show"><span v-show='callRecordRadio == "240002" && !callValueForm[240002]' style="color:red;">*</span></div>
                            <Select :disabled='callRecordRadio != "240002"' v-model="callValueForm[240002]" placeholder="请选择" style="width:420px">
                                <Option
                                  v-for="item in calloptions"
                                  :key="item[0]"
                                  :label="item[1]"
                                  :value="item[0]">
                                </Option>
                              </Select>
                          </Col>
                      </Row>
                      <Row style="margin: 5px;">
                          <Col span="4">
                            <Radio label="240003">再联系</Radio>
                          </Col>
                          <Col span="12" offset="4" style="display:flex">
                          <div class="el-bt-show" style="width:20px"><span v-show='callRecordRadio == "240003" && !callValueForm[240003]' style="color:red;">*</span></div>
                            <DatePicker 
                              :disabled='callRecordRadio != "240003"'
                              v-model="callValueForm[240003]"
                              type="datetime"
                              value-format ='yyyy-MM-dd HH:mm'
                              placeholder="选择日期时间"
                              style="width:420px"
                              >
                            </DatePicker >
                          </Col>
                      </Row>
                      <Row style="margin: 5px;">
                          <Col span="4">
                            <Radio  label="240004">未接通</Radio>
                          </Col>
                          <Col span="12" offset="4" style="display:flex">
                            <div class="el-bt-show" style="width:20px"><span v-show='callRecordRadio == "240004" && !callValueForm[240004]' style="color:red;">*</span></div>
                            <Select :disabled='callRecordRadio != "240004"' v-model="callValueForm[240004]" placeholder="请选择" style="width:420px">
                                <Option
                                v-for="item in calloptions2"
                                :key="item[0]"
                                :label="item[1]"
                                :value="item[0]">
                              </Option>
                            </Select>
                          </Col>
                      </Row>
                </FormItem>
                </RadioGroup>
                </Form>
                <div slot="footer" class="dialog-footer">
                  <Button type="primary" class="primary" @click="add_callRecord">确 定</Button>
                  <Button @click="callRecordVisible = false">取 消</Button>
                </div>
              </Modal>
            </TabPane>
            <!-- 面试记录 -->
            <TabPane label="面试记录" name="4" class="resumeReaded">
              <Collapse  v-model="interviewactiveName" accordion v-if="interviewRecordList.length">
              <Panel  v-for="(item, index) in interviewRecordList" :key="item.id">
                <div class="interviewjob_box" :name="index+1">
                  <div class="interviewjob">
                    <span>
                    招聘职位：{{item.jobName}}
                    </span>
                      <Tag color="blue" v-if="item.interviewStatus ==0">面试中</Tag>
                      <Tag color="green" v-if="item.interviewStatus ==1">通过</Tag>
                      <Tag color="red" v-if="item.interviewStatus ==2">不通过</Tag>
                      <Button type="text">详情</Button>
                      <Button type="text" v-if="item.interviewStatus == '0'||item.interviewStatus == '1'" data-value='1' @click.stop="interRecordIndex($event, index, 0)" v-show="!isrelevance && +detailsedetailed.resumeState !== 60009">添加面试</Button>
                  </div>
                    <div class="handler">
                      <p>
                        {{item.handlerName}} | <span>{{item.interviewTime | moment}}</span> {{interviewConst[item.interviewTurnAll]}}轮
                      </p>
                    </div>
                </div>
              <div class="interviewRecordList" slot="content">
                <li v-for="(items,indexs) in interviewRecordList[index].interviewTurnEntities">
                  <span class="interviewr">{{interviewConst[items.count]}}面：{{items.interviewerName}} </span>
                  <div class="interscore" v-if="items.result != '0'">
                    <span>| {{interviewStatu[items.result]}}： {{items.interviewComment}}&nbsp;&nbsp;</span>
                    <Row>
                      <Col span="8"> <el-rate disabled-void-color="#c5c5c5" :value='items.score' disabled show-score text-color="#ff9900" style="font-size:none;margin-top: 6px;"></el-rate></Col>
                      <Col span="2"></Col>
                    </Row> 
                  </div>
                  <span class="feedbackTime">{{myDate(items.feedbackTime)}}</span>
                  <p class="interview_del">{{myDate(items.interviewTime)}}
                    <span>
                      <i v-if="items.isFeedback == '1' && items.result != '3'"  :data-value='items.id' @click.stop="interRecordIndex($event, index, 1, indexs)" v-show="!isrelevance">编辑</i>
                      <i v-if="items.isFeedback == '1' && items.result != '3'" @click="addinterFeed_index(index,indexs)" v-show="!isrelevance">结束</i>
                      <i v-if="items.isFeedback == '0' && items.result == '0'" :data-value='items.id' @click.stop="interRecordIndex($event, index, 1, indexs)">编辑</i>
                      <i v-if="items.isFeedback == '0' && items.result == '0'"  @click="delInterview(index,indexs)">删除</i>
                      <i v-if="items.isFeedback == '0' && items.result == '4'" style="color: #C5C5C5">未进行</i>
                    </span>
                  </p>
                </li>
              </div>
              </Panel >
              </Collapse >
              <!-- 添加面试记录的弹窗面试记录的弹窗 -->
                <Modal
                  class="interRecord_head"
                  :title="mskey"
                  v-model="interRecordVisible"
                  width="30%"
                  center>
                  <div  class="interRecord_body">
                    <Form :label-width="80">
                      <FormItem label="选择面试官">
                        <el-select
                          v-model="man"
                          filterable
                          remote
                          reserve-keyword
                          @change="getman"
                          placeholder="请输入关键词"
                          style="width:200px;"
                          :remote-method="getInterviewMan">
                          <el-option
                            v-for="item in interviews"
                            :key="item.id"
                            :label="item.employeeName"
                            :value="item.id">
                            <span id="getManName" style="float: left">{{ item.employeeName }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.dept }}</span>
                          </el-option>
                        </el-select>
                        <el-popover
                          ref="popover4"
                          placement="right"
                          popper-class='scroll'
                          v-model="visible2"
                          trigger="click">
                          <el-tree
                              :props="defultlabel"
                              :load="lodatree"
                              ref="tree"
                              @current-change='getnode'
                              @node-click='getnode'
                              lazy>
                            </el-tree>
                        </el-popover>
                        <Button type="primary" v-popover:popover4>
                          <icon-svg icon-class='job_xqbm'/>
                        </Button>
                      </FormItem>
                      <FormItem label="面试时间">
                        <el-date-picker
                          size="small"
                          v-model="interviewTimeDate"
                          type="datetime"
                          value-format ='yyyy-MM-dd HH:mm'
                          :picker-options="pickerOptions1"
                          placeholder="选择日期时间">
                        </el-date-picker>
                      </FormItem>
                    </Form>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <Button v-show="isBtnFlag" type="primary" @click="addInterview">确 定</Button>
                    <Button v-show="!isBtnFlag" type="primary">确 定</Button>
                    <Button @click="interRecordVisible = false">取 消</Button>
                  </span>
                </Modal>
                <!-- 反馈弹窗部分 -->
                <Modal
                  class="fankui_head"
                  title="面试反馈"
                  v-model="interFeedVisible"
                  width="30%"
                  center>
                  <Form ref="ruleFormfk" :rules="rulesform" :model="interFeedFrom" :label-width="100">
                  <div class="fankui_bodey">
                      <FormItem label="选择面试官" prop="msMan">
                              <el-select
                              v-model="interFeedFrom.msMan"
                              filterable
                              remote
                              reserve-keyword
                              @change="getman"
                              style="width:200px;"
                              placeholder="请输入关键词"
                              :remote-method="getInterviewMan">
                              <el-option
                                v-for="item in interviews"
                                :key="item.id"
                                :label="item.employeeName"
                                :value="item.id">
                                <span id="getManName" style="float: left">{{ item.employeeName }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.dept }}</span>
                              </el-option>
                            </el-select>
                            <el-popover
                            ref="popover5"
                            placement="right"
                            popper-class='scroll'
                            v-model="visible5"
                            trigger="click">
                            <el-tree
                                  :props="defultlabel"
                                  :load="lodatree"
                                  ref="tree"
                                  @current-change='getnode'
                                  @node-click='getnode'
                                  lazy>
                              </el-tree>
                          </el-popover>
                          <Button type="primary" v-popover:popover5>
                            <icon-svg icon-class='job_xqbm'/>
                          </Button>
                      </FormItem>
                      <FormItem label="面试时间" prop="msTimeData">
                        <el-date-picker
                          size="small"
                          v-model="interFeedFrom.msTimeData"
                          type="datetime"
                          value-format ='yyyy-MM-dd HH:mm'
                          style="width:200px;"
                          placeholder="选择日期时间">
                        </el-date-picker>
                      </FormItem>
                      <FormItem label="到访" prop="visited">
                        <RadioGroup v-model="interFeedFrom.visited">
                          <Radio :label="1">到访</Radio>
                          <Radio :label="0">未到访</Radio>
                        </RadioGroup>
                      </FormItem>
                      <FormItem label="评分" prop="code">
                        <el-rate show-text v-model="interFeedFrom.code" :texts='texts'></el-rate>
                      </FormItem>
                      <FormItem label="面试反馈(选填)" prop="feedRecord">
                        <input :maxlength="500" type="textarea" :autosize="true"  style="width:200px;" v-model="interFeedFrom.feedRecord"></input>
                      </FormItem>
                  </div>
                  </Form>
                  <span slot="footer" class="dialog-footer">
                    <Button @click="interFeed(1)">通  过</Button>
                    <Button type="primary" @click="interFeed(2)">不通过</Button>
                  </span>
                </Modal>
            </TabPane>
            <!-- 操作记录 -->
            <TabPane label="操作记录" name="5">
                <div class="operation" v-for="(item,index) in handnum" :key="index">
                  <p class="opertitle" v-if="item.action ==210001">{{index + 1}}. {{'移入'+item.operName+'阶段'}}</p>
                  <p class="opertitle" v-if="item.action ==210011">{{index + 1}}. {{'从人才库调转简历到到简历库'}}</p>
                  <p class="opertitle" v-if="item.action ==210002">{{index + 1}}. {{`移动简历进入人才库`}}</p>
                  <p class="opertitle" v-if="item.action ==210003">{{index + 1}}. {{`评价简历`}}</p>
                  <p class="opertitle" v-if="item.action ==210004">{{index + 1}}. <span v-if="item.jobName"> {{`发送面试通知,绑定新职位`+ item.jobName}}</span> <span v-else> {{`发送了面试通知`}}</span></p>
                  <!-- <p class="opertitle" v-if="item.action ==210004 && itm">{{index + 1}}. {{`发送了面试通知`}}</p> -->
                  <p class="opertitle" v-if="item.action ==210005">{{index + 1}}. <span v-if="item.jobName"> {{`发送offer,绑定新职位`+ item.jobName}}</span> <span v-else> {{`发送了offer`}}</span></p>
                  <p class="opertitle" v-if="item.action ==210006">{{index + 1}}. {{`放弃简历,自动流转`}}</p>
                  <p class="opertitle" v-if="item.action ==210007">{{index + 1}}. {{`录入了简历`}}</p>
                  <p class="opertitle" v-if="item.action ==210008">{{index + 1}}. {{`简历到期,自动流转`}}</p>
                  <p class="opertitle" v-if="item.action ==210009">{{index + 1}}. {{`简历到期,自动进入人才库`}}</p>
                  <p class="opertitle" v-if="item.action ==210010">{{index + 1}}. {{`分配简历给${item.concatPeople}`}}</p>
                  <p class="opertitle" v-if="item.action ==210012">{{index + 1}}. {{`${item.detail}`}}</p>
                  <p class="oprtpeop">操作人：{{item.operUserName}} <span>{{item.createTime|timeFormat}}</span> </p>
                </div>
            </TabPane>
          </Tabs>
          <div class="downrum" @click="download">
            <Button type="primary"><Icon type="ios-download-outline"></Icon> 下载简历</Button>
          </div>
            <Modal
              v-model="Delmodal1"
              title="是否删除该面试"
              @on-ok="okDelmodal1">
          </Modal>
        </div>
      </div>
    </div>
     <Spin fix v-if="isShowLoading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>

<script>
  import TreeCom from '../resume/TreeCom.vue'
  import { details, evaluate, score, allotTo, move, giveUp, queryAbandon, dialRecords, insertDialRecord, interviewRecords, insertInterviewTurn, deleInterviewTurn, saveInterviewTurn, relevanceJob, finishInterview } from '../../api/resumeApi/resumelist'
  import { downloaResumeFromother } from '../../api/resumeApi/download'
  import detailresume from '../../views/resumeSearch/detailresume.vue'
  import { listWithPublishName } from '../../api/resumeSearchApi/notice'
  import { deptlistAll } from '../../api/jobApi/jobMessage'
  import { deptsAll } from '../../utils/deptlist'
  import { getInterviews, searchinterview } from '../../api/jobApi/newCreat'
  import * as types from '../../store/modules/accentCenter/actionTypes'
  import { mapActions, mapGetters } from 'vuex'
  // 这里是生成组织机构树的递归方法
  import { callValueForm, callValueForm_map, callmessage_map, calloptions, calloptions2, interviewConst, interviewStatu, interviewStatuType, options2, options3, options4 } from '../../json/resumedetail'
  export default {
    data() {
      const validafeedRecord = (rule, value, callback) => {
        if (value === '') {
          callback()
        }
        if (value.length > 50) {
          callback(new Error('不能超过50个字符'))
        } else {
          callback()
        }
      }
      const validacode = (rule, value, callback) => {
        if (value === 0 || !value) {
          callback(new Error('分数不能为空'))
        } else {
          callback()
        }
      }
      const validavisited = (rule, value, callback) => {
        if (value !== 0 && value !== 1) {
          callback(new Error('请选择是否到访'))
        } else {
          callback()
        }
      }
      const validamsTimeData = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择日期'))
        } else {
          callback()
        }
      }
      const validamsMan = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择面试官'))
        } else {
          callback()
        }
      }
      const talentType = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择'))
        } else {
          callback()
        }
      }
      const poolType = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择'))
        } else {
          callback()
        }
      }
      const reason = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择'))
        } else {
          callback()
        }
      }
      return {
        options6: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000
          }
        },
        isShowLoading: true,
        isTree: false,
        FirstName: '',
        FirstId: 0,
        personType: 0,
        leafNode: 0,
        orgName: '',
        orgId: 0,
        man: '',
        Delmodal1: false,
        delIndex: 0,
        delIndexs: 0,
        isBtnFlag: true,
        isCall: false,
        isCallRecord: true,
        isshowTree: false,
        isFlag: false,
      // 这里是设置默认属性的地方 isLeaf代表的是是否为叶子节点是叶子节点时就不会有下拉的箭头
        defultlabel: {
          value: 'id',
          label: 'name',
          isLeaf: `leafNode`
        },
        visible2: false,
        visible5: false,
        person: {},
      // 选择的这个人是谁
        interviews: [], // 这里是渲染到搜索框下的列表
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 86400000
          }
        },
        interviewactiveName: '1',
        detailinfo: {}, // 简历详情的数据
        resume: require('@/assets/resume.png'),
        callRecordVisible: false, //  拨打记录弹窗
        interRecordVisible: false, //  添加面试弹窗
        interFeedVisible: false, // 反馈弹窗
        callRecordRadio: 'callValue1', //  拨打记录的选项值
        callRecordList: [], //  拨打记录的list数据
        interviewRecordList: [],  //  面试记录的列表
        InterviewPeople: {  //  添加记录面试官信息
          interviewerName: '',
          interviewerId: ''
        },
        interFeedFrom: {
          msMan: '',
          msTimeData: '',
          visited: 1,
          code: '1',
          feedRecord: ''
        },  //  面试反馈
        interviewTimeDate: '',  //  面试时间
        add_interRecordIndex: '', //  添加面试的索引
        interFeed_index: {  //  存储反馈索引
          val: '',
          vals: ''
        },
        texts: ['差', '差', '良', '良', '优'], //  评分显示文字
        path: '',
        dialogFormVisible1: false,
        dialogFormVisible3: false,
        dialogFormVisible4: false,
        togiveUp: false,
        // 关联职位和HR的
        jobandhr: '',
        showrelevance: false, // 显示关联职位的弹框
        handnum: [],
        callValueForm: callValueForm,
        callValueForm_map: callValueForm_map,
        callmessage_map: callmessage_map,
        calloptions: calloptions,
        calloptions2: calloptions2,
        interviewConst: interviewConst,
        interviewStatu: interviewStatu,
        interviewStatuType: interviewStatuType,
        options2: options2,
        options3: options3,
        options4: options4,
        allot: '',
        listforjob: [],
        options5: [
        ],
        handledata: [],
        resumeState: '',
        resumeId: '',
        seekerId: '',
        msId: '',
        mskey: '添加面试',
        manClear: '',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          score: ''
        },
        isget: true,
        form1: {
          'resumeId': '',
          'seekerId': '',
          'talentType': '',
          'poolType': '',
          'reason': '',
          'comments': '',
          'enterStage': ''
        },
        isrelevance: true,
        formLabelWidth: '120px',
        activeName: '1',
        value2: null,
        detailsedetailed: {},
        options: '',
        listblishName: [],
        isentry: false,
        deptlist: [],
        joinjob: '',
        deptId: [],
        rulesform: {
          msMan: [
            { validator: validamsMan, trigger: 'blur' }
          ],
          msTimeData: [
            { validator: validamsTimeData, trigger: 'change' }
          ],
          visited: [
            { validator: validavisited, trigger: 'change' }
          ],
          code: [
            { validator: validacode, trigger: 'change' }
          ],
          feedRecord: [
            { validator: validafeedRecord, trigger: 'change' }
          ]
        },
        rulegiveup: {
          talentType: [
           { validator: talentType, trigger: 'change' }
          ],
          poolType: [
           { validator: poolType, trigger: 'change' }
          ],
          reason: [
           { validator: reason, trigger: 'change' }
          ]
        }
      }
    },
    watch: {
      callRecordRadio(val) {  //  拨打记录选择后清空其他输入框
        for (var k in this.callValueForm) {
          if (k !== val) {
            this.callValueForm[k] = ''
          }
        }
      }
    },
    computed: {
      ...mapGetters('accentCenter', [
        'orgLeftList',
        'detaliList'
      ])
    },
    components: {
      detailresume,
      TreeCom
    },
    mounted() {
      this.isShowLoading = true
      this[types.HANDEL_ORGLEFTLIST]().then(res => {
        if (this.orgLeftList.length > 0) {
          this.FirstId = this.orgLeftList[0].id
          this.FirstName = this.orgLeftList[0].organizationName
          this.personType = this.orgLeftList[0].personType
          this.leafNode = this.orgLeftList[0].leafNode
        }
      })
      this.callValueForm = {
        '240002': '', //  拨打记录、拒绝面试
        '240003': '', //  拨打记录、再联系
        '240004': '' //  拨打记录、未接通
      }
      // 获取部门列表
      deptlistAll().then(res => {
        this.deptlist = deptsAll(res)
      })
      listWithPublishName().then(res => {
        this.listforjob = res.result
        details({
          resumeId: obj.resumeId,
          seekerId: obj.seekerId
        }).then(res => {
          this.isShowLoading = false
          if (res.code === -1) {
            return false
          }
          this.isget = false
          if (res.result.resumeDetail) {
            this.detailinfo = JSON.parse(res.result.resumeDetail)
          }
          if (this.detailinfo.workLengthMax < 10) {
            if (this.detailinfo.workLengthMax === this.detailinfo.workLengthMin) {
              if (!this.detailinfo.workLengthMax === `0`) {
                this.detailinfo.workLength === `未填写`
              } else {
                this.detailinfo.workLength = this.detailinfo.workLengthMax + `年`
              }
            } else {
              this.detailinfo.workLength = this.detailinfo.workLengthMin + `-` + this.detailinfo.workLengthMax + `年`
            }
          } else {
            this.detailinfo.workLength = '10年以上'
          }
          this.detailsedetailed = res.result
          this.joinjob = this.detailsedetailed.jobId
          this.listforjob.map(item => {
            item.id === this.joinjob ? this.isFlag = true : ''
          })
          this.isFlag ? this.joinjob : this.joinjob = ''
          if (this.detailsedetailed.workLengthMax < 10) {
            if (this.detailsedetailed.workLengthMax === this.detailsedetailed.workLengthMin) {
              if (!this.detailsedetailed.workLengthMax === `0`) {
                this.detailsedetailed.workLength === `未填写`
              } else {
                this.detailsedetailed.workLength = this.detailsedetailed.workLengthMax + `年`
              }
            } else {
              this.detailsedetailed.workLength = this.detailsedetailed.workLengthMin + `-` + this.detailsedetailed.workLengthMax + `年`
            }
          } else {
            this.detailsedetailed.workLength = '10年以上'
          }
          this.fileName = res.result.resumeName
          this.path = res.result.pdfPath
          this.isrelevance = this.detailsedetailed.jobList.length === 0
          // 下载用的简历地址
          this.resumePath = res.result.resumePath            // 获取简历详情
          this.get_interviewRecords()
          score({ seekerId: this.detailsedetailed.seekerId, resumeId: this.detailsedetailed.resumeId }).then(res => {
            this.handledata = res.result.filter(function(item) {
              return item.action === `210003`
            })
            this.handnum = res.result
          })
        })
      })
      if (this.$route.query.t) {
        window.sessionStorage.setItem(`Authorization`, this.$route.query.t)
        window.sessionStorage.setItem(`token_type`, this.$route.query.token_type)
        window.sessionStorage.setItem('roleId', this.$route.query.roleId)
        window.sessionStorage.setItem('loginCount', this.$route.query.loginCount)
        window.sessionStorage.setItem('userName', this.$route.query.userName)
        window.sessionStorage.setItem('usernameEmail', this.$route.query.usernameEmail)
      }
      if (this.$route.query.tabIndex) {
        this.activeName = this.$route.query.tabIndex
      }
      var obj = this.$route.query
      this.resumeId = obj.resumeId
      this.seekerId = obj.seekerId
      this.resumeState = obj.resumeState
      this.get_DialRecords()  //  拨打记录
    },
    methods: {
      ...mapActions('accentCenter', [
        types.HANDEL_ORGLEFTLIST,
        types.HANDEL_ORGDEATIL
      ]),
      // 搜索的时候显示到选择框上面的list列表的获取
      getInterviewMan(query) {
        if (query) {
          searchinterview({
            employeeName: query
          }).then(res => {
            this.interviews = res
          })
        }
      },
    // 这里是讲选择框的数据赋值到这个人上去并将这个人的id传递给父组件
      getman(val) {
        this.interviews.map(item => {
          if (item.id === val) {
            this.InterviewPeople.interviewerName = item.employeeName
          }
        })
      // this.person.name = document.getElementById('getManName').innerText
        this.InterviewPeople.interviewerId = val
        // this.$emit('sendman', [this.person])
      },
        // 获取节点的时候得到这个节点的数据
      getnode(data, node) {
        if (data.type === '1') {
        // 当选中一个人的时候将这个人的值赋值到input里面
          this.interFeedFrom.msMan = data.name
          this.man = data.name
          this.InterviewPeople.interviewerName = data.name
          this.InterviewPeople.interviewerId = data.id
        // 将这个弹出框隐藏
          this.visible2 = false
          this.visible5 = false
        } else {
          this.man = ''
          this.interFeedFrom.msMan = ''
        }
      },
      getInter() {
        this.isshowTree = true
      },
      lodatree(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: '尚德机构', id: 0, leafNode: '0' }])
        }
        if (node.data.type === '1') {
          this.person = {
            id: node.data.id,
            name: node.data.name
          }
        }
        if (node.level >= 1) {
          if (node.data.leafNode !== '1') {
            this.getchild(node.data.id, node, resolve)
          } else {
            return resolve([])
          }
        }
      },
    // 懒加载子节点
      getchild(id, node, resolve) {
        let data = []
        getInterviews({
          id: id
        }).then(res => {
          data = res.map(item => {
            item.leafNode = item.leafNode === '1' && item.type === '1'
            return item
          })
          return resolve && resolve(data)
        })
      },
      relevance() {
        this.showrelevance = true
      },
      torelevanceJob() {
        var it = this
        var a = this.listforjob.filter(function(item) {
          return item.id === it.jobandhr
        })
        if (a.length === 0) {
          this.$message.error('请选择职位哦！')
        } else {
          relevanceJob({
            jobName: a[0].jobName,
            jobId: a[0].id,
            resumeId: this.detailsedetailed.resumeId,
            seekerId: this.detailsedetailed.seekerId,
            resumeFlowId: this.detailsedetailed.resumeFlowId
          }).then(res => {
            if (res.code === 200) {
              this.showrelevance = false
              this.$message.success(res.message)
              this.$router.push({ path: '/layout/resume' })
            }
          })
        }
      },
      sendman(a) {  //  选择面试人的组件
        this.orgName = a.name
        this.orgId = a.id
      },
      endingInterview(val) {  //  结束面试
        this.$confirm('是否确定结束该面试', '结束面试', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          finishInterview({
            interviewRecordId: this.interviewRecordList[val].id,
            resumeFlowId: this.detailsedetailed.resumeFlowId
          }).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '结束成功',
                type: 'success'
              })
              this.get_interviewRecords()
            }
          })
        })
      },
      interRecordIndex(e, val, key, index) { //  记录当前添加面试的索引
        this.isBtnFlag = true
        if (key === 0) {
          this.man = ''
          this.InterviewPeople.interviewerName = ''
          this.InterviewPeople.interviewerId = ''
          this.interviewTimeDate = ''
        } else {
          this.interviewRecordList[val].interviewTurnEntities.map(item => {
            if (item.count === index + 1) {
              this.man = item.interviewerName
              this.InterviewPeople.interviewerName = item.interviewerName
              this.InterviewPeople.interviewerId = item.interviewerId
              this.interviewTimeDate = this.myDate(item.interviewTime)
            }
          })
        }
        key === 0 ? this.mskey = '添加面试' : this.mskey = '编辑面试'
        e.target.dataset.value ? this.msId = e.target.dataset.value : this.msId = ''
        this.add_interRecordIndex = val
        this.interRecordVisible = true
      },
      addInterview() {  //  添加面试||编辑面试
        this.interRecordVisible = false
        this.isBtnFlag = false
        if (this.mskey === '添加面试') {
          // this.InterviewPeople.interviewerName = ''
          // this.InterviewPeople.interviewerId = ''
          if (this.interviewRecordList[this.add_interRecordIndex].interviewTurnEntities.length < 5) {
            insertInterviewTurn({
              turnId: this.msId,
              resumeId: this.resumeId,
              resumeFlowId: this.detailsedetailed.resumeFlowId,
              interviewRecordId: this.interviewRecordList[this.add_interRecordIndex].id,
              interviewerName: this.InterviewPeople.interviewerName,
              interviewerId: this.InterviewPeople.interviewerId,
              interviewTime: (new Date(this.interviewTimeDate).getTime()),
              count: this.interviewRecordList[this.add_interRecordIndex].interviewTurnEntities.length + 1
            }).then(res => {
              if (res.code === 200) {
                this.manClear = ''
                this.man = ''
                this.interFeedFrom.msMan = ''
                this.interviews = []
                this.InterviewPeople.interviewerName = ''
                this.InterviewPeople.interviewerId = ''
                this.interviewTimeDate = ''
                this.get_interviewRecords()
              }
            })
          } else {
            this.$message({
              message: '最多五轮面试',
              type: 'error'
            })
          }
        } else if (this.mskey === '编辑面试') {
          insertInterviewTurn({
            turnId: this.msId,
            resumeId: this.resumeId,
            resumeFlowId: this.detailsedetailed.resumeFlowId,
            interviewRecordId: this.interviewRecordList[this.add_interRecordIndex].id,
            interviewerName: this.InterviewPeople.interviewerName,
            interviewerId: this.InterviewPeople.interviewerId,
            interviewTime: (new Date(this.interviewTimeDate).getTime()),
            count: this.interviewRecordList[this.add_interRecordIndex].interviewTurnEntities.length + 1
          }).then(res => {
            if (res.code === 200) {
              this.man = ''
              this.interFeedFrom.msMan = ''
              this.interviews = []
              this.InterviewPeople.interviewerName = ''
              this.InterviewPeople.interviewerId = ''
              this.interviewTimeDate = ''
              this.get_interviewRecords()
            }
          })
        }
      },
      delInterview(val, vals) { // 删除面试轮次
        this.Delmodal1 = true
        this.delIndex = val
        this.delIndexs = vals
      },
      okDelmodal1() {
        deleInterviewTurn({
          interviewRecordId: this.interviewRecordList[this.delIndex].id,
          interviewTurnId: this.interviewRecordList[this.delIndex].interviewTurnEntities[this.delIndexs].id
        }).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.get_interviewRecords()
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            })
          }
        })
      },
      addinterFeed_index(val, vals) {
        this.interviewRecordList[val].interviewTurnEntities.map(item => {
          if (item.count === vals + 1) {
            this.interFeedFrom.msMan = item.interviewerName
            this.InterviewPeople.interviewerName = item.interviewerName
            this.InterviewPeople.interviewerId = item.interviewerId
            this.interFeedFrom.msTimeData = this.myDate(item.interviewTime)
          }
        })
        this.interFeed_index = {
          val: val,
          vals: vals
        }
        this.interFeedVisible = true
      },
      interFeed(e) {  //  反馈操作
        this.$refs.ruleFormfk.validate((valid) => {
          if (valid) {
            saveInterviewTurn({
              interviewerId: this.InterviewPeople.interviewerId,
              interviewTime: (new Date(this.interFeedFrom.msTimeData).getTime()),
              isVisit: this.interFeedFrom.visited,
              score: this.interFeedFrom.code,
              interviewComment: this.interFeedFrom.feedRecord,
              result: e,
              id: this.interviewRecordList[this.interFeed_index.val].interviewTurnEntities[this.interFeed_index.vals].id,
              interviewRecordId: this.interviewRecordList[this.interFeed_index.val].id,
              count: this.interviewRecordList[this.interFeed_index.val].interviewTurnEntities[this.interFeed_index.vals].count,
              resumeId: this.interviewRecordList[this.interFeed_index.val].resumeId,
              operUserId: this.interviewRecordList[this.interFeed_index.val].handlerId,
              seekerId: this.seekerId,
              resumeFlowId: this.detailsedetailed.resumeFlowId,
              seekerName: this.detailsedetailed.jobSeekerName,
              jobName: this.interviewRecordList[this.interFeed_index.val].jobName,
              interviewerName: this.InterviewPeople.interviewerName
            }).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '反馈成功',
                  type: 'success'
                })
                this.interFeedVisible = false
                this.get_interviewRecords()
                for (var key in this.interFeedFrom) {
                  this.interFeedFrom[key] = ''
                }
                this.InterviewPeople.interviewerName = ''
                this.InterviewPeople.interviewerId = ''
                this.interFeedFrom.visited = 1
              } else {
                this.$message({
                  message: '反馈失败',
                  type: 'error'
                })
              }
            })
          } else {
            return false
          }
        })
      },
      add_callRecord() {  //  添加拨打记录
        if (+this.callRecordRadio === 240001) {
          this.isCall = true
        } else if (+this.callRecordRadio === 240002 && this.callValueForm['240002']) {
          this.isCall = true
        } else if (+this.callRecordRadio === 240003 && this.callValueForm['240003']) {
          this.isCall = true
        } else if (+this.callRecordRadio === 240004 && this.callValueForm['240004']) {
          this.isCall = true
        } else {
          this.isCall = false
          this.$message({
            message: '请选择拨打记录',
            type: 'error'
          })
        }
        if (this.isCall) {
          insertDialRecord({
            resumeId: this.resumeId,
            seekerId: this.seekerId,
            dialResult: this.callRecordRadio,
            dialPersonId: window.sessionStorage.roleId,
            dialPersonName: window.sessionStorage.userName,
            nextDialTime: new Date(this.callValueForm['240003'] || new Date()).getTime(),
            disConnectReason: this.callValueForm['240004'],
            refuseReason: this.callValueForm['240002']
          }).then(res => {
            if (res.code === 200) {
              this.callRecordVisible = false
              this.get_DialRecords()
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '添加失败',
                type: 'error'
              })
            }
          })
        }
      },
      get_DialRecords() {
        dialRecords({   //  请求拨打记录列表
          resumeId: this.resumeId,
          seekerId: this.seekerId
        }).then(res => {
          if (res.code === 200) {
            this.callRecordList = res.result
          }
        })
      },
      get_interviewRecords() {  //  请求面试记录列表
        interviewRecords({
          resumeFlowId: this.detailsedetailed.resumeFlowId,
          resumeId: this.detailsedetailed.resumeId
        }).then(res => {
          this.interviewRecordList = res.result
        })
      },
      // 返回按钮
      routertototal(event, resumeState) {
        // history.go(-1)
        this.$router.push({ path: '/layout/resume', query: { name: resumeState }})
      },
      handleClose() {
        this.togiveUp = false
      },
      allotlis() {
        this.dialogFormVisible4 = true
        this.isTree = false
        this.orgName = ''
        // allotlist().then(res => {
        //   this.options5 = res.sort(function compareFunction(param1, param2) {
        //     return param1.userName.localeCompare(param2.userName, 'zh')
        //   })
        // })
      },
      sendoffer(val) {
        var arr = []
        arr.push(this.detailsedetailed)
        this.$store.commit('set_SendInvited', arr)
        var sendinterData = this.interviewRecordList.map(res => { //  面试中再发布面试通知
          if (res.interviewStatus === '0') {
            return {
              'interviewStatus': res.interviewStatus,
              'jobId': res.jobId,
              'jobName': res.jobName,
              'interviewRecordId': res.id
            }
          }
        })
        if (val === 'view') {
          this.$router.push({ path: 'noticeSendView', query: sendinterData[0] })
        } else {
          this.$router.push({ path: 'noticeSendOffer', query: sendinterData[0] })
        }
      },
      addpeop() {
        var obj = { currOperUserId: this.detailsedetailed.operUserId,
          deptId: '',
          operUserId: this.orgId,
          resumeId: this.detailsedetailed.resumeId,
          resumeState: this.detailsedetailed.resumeState,
          seekerId: this.detailsedetailed.seekerId
        }
        var arr = []
        arr.push(obj)
        var a = JSON.stringify({
          'resumeList': arr
        })
        if (arr.length && this.orgName) {
          allotTo(a).then(res => {
            this.$message.success(`分配${res.message}`)
            this.dialogFormVisible4 = false
          })
        } else {
          this.$message.warning('请选择分配人')
        }
      },
      handleCommand(command) {
        if (+command !== 60009) {
          var obj = {
            esId: this.detailsedetailed.esId,
            seekerId: this.seekerId,
            resumeId: this.resumeId,
            resumeState: command,
            currentResumeState: this.detailsedetailed.resumeState
          }
          var arr = []
          arr.push(obj)
          var a = JSON.stringify({ resumeList: arr })
          move(a).then(res => {
            this.$message({
              message: res.message,
              type: 'success'
            })
            score({ seekerId: this.detailsedetailed.seekerId, resumeId: this.detailsedetailed.resumeId }).then(res => {
              this.handledata = res.result.filter(function(item) {
                return item.action === `210003`
              })
              this.handnum = res.result
            })
            var obj = this.$route.query
            this.resumeId = obj.resumeId
            this.seekerId = obj.seekerId
            details({// 获取简历详情
              resumeId: obj.resumeId,
              seekerId: obj.seekerId
            }).then(res => {
              this.detailsedetailed = res.result
              this.resumePath = res.result.resumePath
              score({ seekerId: this.detailsedetailed.seekerId, resumeId: this.detailsedetailed.resumeId }).then(res => {
                this.handledata = res.result.filter(function(item) {
                  return item.action === `210003`
                })
                this.handnum = res.result
              })
            })
          })
        } else {
          this.isentry = true
        }
      },
      shiftin() {
        if (this.deptId.length && this.joinjob) {
          var a = this.listforjob.filter(item => {
            return item.id === this.joinjob
          })
          var obj1 = {
            seekerId: this.seekerId,
            resumeId: this.resumeId,
            resumeState: 60009,
            jobId: a[0]['id'],
            jobName: a[0]['jobName'],
            hiredDeptId: this.deptId[this.deptId.length - 1],
            currentResumeState: this.detailsedetailed.resumeState
          }
          var arr1 = []
          arr1.push(obj1)
          var b = JSON.stringify({ resumeList: arr1 })
          move(b).then(res => {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$router.push({ path: '/layout/resume' })
          })
        } else {
          this.$message.warning('请选择部门和职位哦')
        }
      },
      handleClick(tab, event) {
        // this.$router.push({ path: 'activeSend', query: { time: +new Date() }})
        score({ seekerId: this.detailsedetailed.seekerId, resumeId: this.detailsedetailed.resumeId }).then(res => {
          this.handledata = res.result.filter(function(item) {
            return item.action === `210003`
          })
          this.handnum = res.result
        })
      },
      download() {
        var url = /\.[^\.]+$/.exec(this.resumePath)
        if (this.fileName) {
          downloaResumeFromother(this.resumePath, this.fileName)
        } else {
          downloaResumeFromother(this.resumePath, this.detailsedetailed.jobSeekerName + url[0])
        }
      },
      submitscore() {
        this.$refs.ruleForm.validate((val) => {
          if (val) {
            evaluate({
              evaluateContent: this.form.desc,
              evaluateScore: this.form.score,
              resumeId: this.detailsedetailed.resumeId,
              seekerId: this.detailsedetailed.seekerId,
              resumeState: this.detailsedetailed.resumeState
            }).then(res => {
              this.form.score = ''
              this.form.desc = ''
              this.$refs.ruleForm.resetFields()
              this.$message.success('简历评价成功')
              score({ seekerId: this.detailsedetailed.seekerId, resumeId: this.detailsedetailed.resumeId }).then(res => {
                this.handledata = res.result
                this.handnum = this.handledata
              })
            })
            this.dialogFormVisible1 = false
          } else {
            return false
          }
        })
      },
      dialogFormVisible1_click() {
        this.form.score = ''
        this.form.desc = ''
        this.$refs.ruleForm.clearValidate()
        this.dialogFormVisible1 = false
      },
      detailditing(event, resumeState, resumeId, seekerId) {
        this.$router.push({ path: 'detailEditing', query: { resumeState: resumeState, resumeId: resumeId, seekerId: seekerId }})
      },
      giveUptoother() {
        var queryArr = [{
          resumeId: this.detailsedetailed.resumeId,
          seekerId: this.detailsedetailed.seekerId
        }]
        queryAbandon({
          resumeList: queryArr
        }).then(res => {
          if (!res.result.resumeList[0].flag) {
            this.togiveUp = true
          } else {
            this.dialogFormVisible3 = true
          }
        })
      },
      giveUpto() {
        var arr = []
        arr.push({
          resumeId: this.detailsedetailed.resumeId,
          seekerId: this.detailsedetailed.seekerId,
          num: this.detailsedetailed.num,
          num_2: this.detailsedetailed.num_2,
          poolType: '',
          esId: this.detailsedetailed.esId,
          talentType: '',
          enterStage: this.detailsedetailed.resumeState,
          comments: '', reason: '' })
        var c = JSON.stringify({ resumeList: arr })
        giveUp(c).then(res => {
          this.togiveUp = false
          this.$message.success({
            message: res.message
          })
          this.$router.push({ path: '/layout/resume' })
        })
      },
      giveUpclick() {
        this.$refs.ruleGiveup.validate((valid) => {
          if (valid) {
            this.form1.resumeId = this.detailsedetailed.resumeId
            this.form1.seekerId = this.detailsedetailed.seekerId
            this.form1.enterStage = this.detailsedetailed.resumeState
            this.form1.num = this.detailsedetailed.num
            this.form1.num_2 = this.detailsedetailed.num_2
            var arr = []
            arr.push(this.form1)
            var c = JSON.stringify({ resumeList: arr })
            giveUp(c).then(res => {
              this.$message.success({
                message: res.message
              })
              this.$router.push({ path: '/layout/resume' })
              this.dialogFormVisible3 = false
            })
          }
        })
      },
      myDate(value) {
        var values = ''
        if (!value) {
          return
        } else {
          values = new Date(value)
        }
        var year = values.getFullYear()
        var month = values.getMonth() + 1
        var date = values.getDate()
        // var day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][values.getDay()]
        var hour = values.getHours() < 10 ? '0' + values.getHours() : values.getHours()
        var minute = values.getMinutes() < 10 ? '0' + values.getMinutes() : values.getMinutes()
        var second = values.getSeconds() < 10 ? '0' + values.getSeconds() : values.getSeconds()
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second + ' '
      }
    }
  }
</script>
<style lang="scss" src="./style2.scss"></style>
