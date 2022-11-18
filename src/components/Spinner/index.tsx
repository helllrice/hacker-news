import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
import './index.module.scss'

const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 50,
            position: "absolute",
            top: '50%',
            left: '50%',
            zIndex: 99,
            color: '#004dac'
        }}

    />
);

export const Spinner = ({loading, children}: {loading: boolean, children: JSX.Element | JSX.Element[] | null}) => <div className='spinner-wrapper'>
    <Spin
        className='spinner'
        spinning={loading}
        indicator={antIcon}
        size={"large"}
    >
        {children}
    </Spin>
</div>