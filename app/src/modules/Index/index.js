/* 软件首页 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import 'antd/lib/row/style/css';
import 'antd/lib/col/style/css';
import style from './style.sass';

class Index extends Component{
  render(){
    return(
      <div className={ style.body }>
        <h1 className={ style.title }>口袋48工具</h1>
        <Row type="flex" align="top" justify="start">
          <Col xl={ 4 } lg={ 6 } md={ 6 } sm={ 8 } xs={ 12 }>
            <dl className={ style.linkGroup }>
              <dt>
                <Link to="/LiveCache" title="直播抓取">
                  <img src={ require('./hty1.jpg') } alt="直播抓取" />
                </Link>
              </dt>
              <dd>
                <Link to="/LiveCache">直播抓取</Link>
              </dd>
            </dl>
          </Col>
          <Col xl={ 4 } lg={ 6 } md={ 6 } sm={ 8 } xs={ 12 }>
            <dl className={ style.linkGroup }>
              <dt>
                <Link to="/" title="录播下载">
                  <img src={ require('./xsy1.jpg') } alt="录播下载" />
                </Link>
              </dt>
              <dd>
                <Link to="/">录播下载</Link>
              </dd>
            </dl>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Index;