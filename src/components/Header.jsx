import React from 'react';
import { Button } from 'antd';

export default function Header(props) {
  return (
    <header {...props}>
      <a className="logo-wrapper" href="https://antv.alipay.com/zh-cn/index.html" target="_blank">
        <i className="logo" />
        <span>AntV</span>
      </a>
      <div className="button">
        <Button>θΏεζ§η</Button>
      </div>
    </header>
  );
}
