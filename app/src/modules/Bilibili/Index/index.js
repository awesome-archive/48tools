/* B站直播抓取 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { Link, withRouter } from 'react-router-dom';
import { Button, Table, Icon, Affix, message } from 'antd';
import { cursorBilibiliLiveRoom, deleteBilibiliLiveRoom } from '../store/index';
import publicStyle from '../../pubmicMethod/public.sass';
import commonStyle from '../../../common.sass';
const child_process = global.require('child_process');
const path = global.require('path');
const process = global.require('process');
const __dirname = path.dirname(process.execPath).replace(/\\/g, '/');

/* 初始化数据 */
const getIndex = (state)=>state.get('bilibili').get('index');

const state = createStructuredSelector({
  liveList: createSelector(         // 直播间信息
    getIndex,
    (data)=>data.has('liveList') ? data.get('liveList') : []
  )
});

/* dispatch */
const dispatch = (dispatch)=>({
  action: bindActionCreators({
    cursorBilibiliLiveRoom,
    deleteBilibiliLiveRoom
  }, dispatch)
});

@withRouter
@connect(state, dispatch)
class BiliBili extends Component{
  constructor(props) {
    super(props);

    this.state = {
      loading: true,     // 加载动画
    };
  }
  // 表格配置
  columus(){
    const columns = [
      {
        title: '直播间名称',
        dataIndex: 'roomname',
        key: 'roomname',
        width: '32%'
      },
      {
        title: '直播间ID',
        dataIndex: 'roomid',
        key: 'roomid',
        width: '32%'
      },
      {
        title: '操作',
        key: 'handle',
        width: '36%',
        render: (text, item) => {
          return (
            <div>
              <Button className={ `${ publicStyle.ml10 } ${ publicStyle.btn }` } type="primary">
                <Icon type="step-forward" />
                <span>录制</span>
              </Button>
              <Button className={ publicStyle.ml10 } type="danger">
                <Icon type="close-square" />
                <span>删除</span>
              </Button>
            </div>
          );
        }
      }
    ];
    return columns;
  }
  async componentWillMount(){
    await this.props.action.cursorBilibiliLiveRoom({
      indexName: 'roomname'
    });
    this.setState({
      loading: false
    });
  }
  render(){
    return(
      <div>
        {/* 功能区 */}
        <Affix>
          <div className={ `${ publicStyle.toolsBox } ${ commonStyle.clearfix }` }>
            <div className={ publicStyle.fl }>
              <Link to="/BiliBili/Option">
                <Button type="primary">
                  <Icon type="setting" />
                  <span>添加B站直播间</span>
                </Button>
              </Link>
            </div>
            <div className={ publicStyle.fr }>
              <Link to="/">
                <Button className={ publicStyle.ml10 } type="danger">
                  <Icon type="poweroff" />
                  <span>返回</span>
                </Button>
              </Link>
            </div>
          </div>
        </Affix>
        {/* 显示列表 */}
        <div className={ publicStyle.tableBox }>
          <Table loading={ this.state.loading }
                 bordered={ true }
                 columns={ this.columus() }
                 rowKey={ (item)=>item.roomid }
                 dataSource={ this.props.liveList }
                 pagination={{
                   pageSize: 20,
                   showQuickJumper: true
                 }} />
        </div>
      </div>
    );
  }
}

export default BiliBili;