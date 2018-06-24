const mongoose = require('mongoose')

// 协作的任务
var CollTaskSchema = mongoose.Schema({
    task_name: { //任务名称 (必填)
        type: String,
        required: true
    },
    task_descrpt: String, //描述
    chatgroup_id: String, //环信的群聊id
    sub_task_num: { //子任务的个数，任务保存时进行计算。
        type: Number,
        default: 0
    },
    allday: { //全天任务－如果是，则不显示时间字段
        type: Boolean,
        default: true
    },
    start: Date, //开始
    end: Date, //结束
    progress: { //进度 0～100 （手工维护）
        type: Number,
        default: 0
    },
    isfinished: Boolean, //是否完成
    dof: Date, // date of finished, 完成时的日期
    cp_name: String, //关联到的项目名称－用来方便显示，更新的时候，关联cp一并更新。
    lock_remove: { //是否锁定删除的功能
        type: Boolean,
        default: true
    },
    need_accept: { //任务是否需要负责人来执行接受的动作
        type: Boolean,
        default: false
    },
    did_accepted: { //任务负责人是否接受了创建人对其做的分派, need_accept==true 时，本字段才有实际意义。
        type: Boolean,
        default: false
    },
    importance: {
        type: String,
        default: '低优先级'
    }, //重要度
    urgency: {
        type: String,
        default: '一般'
    }, //紧迫度
    score: { //得分
        type: Number,
        default: 0
    },
    final_judgement: {
        type: String,
        default: ''
    },
    filed:{ //仅在任务看板上起作用
        type: Boolean,
        default: false
    },
    order: {
        type: Number
    },
    wh_open:{
        type: Boolean,
        default: false
    }

})

module.exports = {
  CollTaskSchema: CollTaskSchema
}
