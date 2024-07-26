'use client';

import { useState } from 'react';

import { NavLink } from '_components';
import { useUserService } from '_services';
import StickyBox from "react-sticky-box";
import { Flex, Layout, Menu, Row, Col, Space, Button, Switch } from 'antd';
import {
    LogoutOutlined
} from '@ant-design/icons';
import Link from 'next/link';
const { Header } = Layout;
export { Nav };

function Nav() {
    const [loggingOut, setLoggingOut] = useState<boolean>(false);
    const userService = useUserService();

    async function logout() {
        setLoggingOut(true);
        await userService.logout();
    }
    const [theme, setTheme] = useState('dark');
    const changeTheme = (value: any) => {
        setTheme(value ? 'dark' : 'light');
    };

    return (
        <StickyBox offsetTop={0} offsetBottom={20}>
            <Header
                theme={theme}
                style={{
                    // display: 'flex',
                    //alignItems: 'center',
                }}
            >

                <Row justify="space-between">
                
                    <div className="demo-logo"> lkogo</div>
                        <Menu
                            theme={theme}
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            items={[
                                {
                                    key: 1,
                                    label: (<Link href="/dashboard" >Home</Link>),
                                },
                                {
                                    key: 2,
                                    label: (<Link href="/dashboard/users" >Quản lý tài khoản</Link>),
                                },
                                {
                                    key: 3,
                                    label: (<Link href="/dashboard/quyhoach" >Quản lý quy hoạch</Link>),
                                },
                                {
                                    key: 4,
                                    label: (<Link href="/dashboard/blog" >Quản lý bài viết</Link>),
                                }
                            ]}
                            style={{
                                flex: 1,
                                minWidth: 0,
                            }}
                        />

                        <Space>
                            <Switch
                                checked={theme === 'dark'}
                                onChange={changeTheme}
                                checkedChildren="Dark"
                                unCheckedChildren="Light"
                            />
                            <Button
                                onClick={logout}
                                loading={loggingOut}
                                icon={<LogoutOutlined />}
                            >
                                Logout
                            </Button>
                        </Space>

                </Row>

            </Header>
        </StickyBox>

    );
}