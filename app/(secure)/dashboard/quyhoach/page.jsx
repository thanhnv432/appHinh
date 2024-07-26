'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Spinner } from '_components';
import { useUserService } from '_services';

import { App, Dropdown, Popconfirm, Table, Menu, Tag, Typography, Button, Flex, Divider, Modal, Form, Upload, Col, Row , Input} from 'antd';
import {
    EditOutlined,
    DeleteFilled,
    FileAddOutlined,
    UploadOutlined
} from '@ant-design/icons';

export default Quyhoach;

function Quyhoach() {
    const userService = useUserService();
    const users = userService.users;

    useEffect(() => {
        userService.getAll();
    }, []);

    var addSTTForList = (arr) => {
        if (!arr) return [];
        return arr.map((ele, index) => ({
            key: index,
            stt: index + 1,
            ...ele,
        }));
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'FullName',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Status',
            key: 'isActive',
            dataIndex: 'isActive',
            render: (isActived, data) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                //disabled: (userService.userValue.isAdmin && userService.userValue.isAdmin == 1) ? false : true,
                                danger: (isActived && isActived == 1) ? true : false,
                                // label: (<Popconfirm disabled={(userService.userValue.isAdmin && userService.userValue.isAdmin == 1) ? false : true}
                                //     title={<Text>Are you sure to change?</Text>}
                                //     onConfirm={() => {
                                //         if (!isActived || isActived == 0) data.isActive = true
                                //         if (isActived == 1) data.isActive = false
                                //         onUpdateByAdmin(data.id, data)
                                //     }
                                //     }
                                //     okText="Yes"
                                //     cancelText="No"
                                // >
                                //     {(isActived && isActived == 1)
                                //         ? 'Inactive'
                                //         : 'Active'}
                                // </Popconfirm>)
                            }
                        ]
                    }}
                    arrow
                >
                    {(isActived && isActived == 1) ? (
                        <Tag color="blue">Active</Tag>
                    ) : (
                        <Tag color="red">Inactive</Tag>
                    )}
                </Dropdown>
            ),
        },
        {
            title: 'Role',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            render: (isActived, data) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                //disabled: (userService.userValue.isAdmin && userService.userValue.isAdmin == 1) ? false : true,
                                // label: (<Popconfirm disabled={(userService.userValue.isAdmin && userService.userValue.isAdmin == 1) ? false : true}
                                //     title={<Text>Are you sure to change?</Text>}
                                //     onConfirm={() => {
                                //         if (!isActived || isActived == 0) data.isAdmin = true
                                //         if (isActived == 1) data.isAdmin = false
                                //         onUpdateByAdmin(data.id, data)
                                //     }
                                //     }
                                //     okText="Yes"
                                //     cancelText="No"
                                // >
                                //     {(isActived && isActived == 1)
                                //         ? 'USER'
                                //         : 'ADMIN'}
                                // </Popconfirm>)
                            }
                        ]
                    }}
                    arrow
                >
                    {(isActived && isActived == 1) ? (
                        <Tag color="blue">ADMIN</Tag>
                    ) : (
                        <Tag color="green">USER</Tag>
                    )}
                </Dropdown>
            ),



            // render: (isAdmin) => <>{isAdmin ? <p>Admin</p> : <p>User</p>}</>,
        },
        {
            title: 'Action',
            key: 'Action',
            dataIndex: 'action',
            render: (text, record) =>
                <Flex wrap gap="small">
                    <Popconfirm onConfirm={() => {
                        deleteUser(record.id)
                    }
                    }
                        title="Are you sure delete this user?" okText="Yes" cancelText="No">
                        <Button danger disabled={record.isDeleting} ><DeleteFilled />Delete</Button>
                    </Popconfirm>
                </Flex>
        },
    ];
    const [fileList1, setFileList1] = useState([]);
    const handleChangeCSV = ({ fileList: newFileList1 }) => setFileList1(newFileList1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <h1>Quy hoạch</h1>
            <Button
                icon={<FileAddOutlined />}
                onClick={showModal}
                type="primary">
                Thêm GeoJson mới
            </Button>
            <Modal title="Upload GeoJson" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>

            <Form
            //initialValues={user}
            //form={form}
            scrollToFirstError
            //</Modal>layout="vertical" onFinish={onFinish}
            >
                
            <Divider orientation="left" orientationMargin="0">
                <Typography.Title level={4}>Thông tin</Typography.Title>
            </Divider>
                <Row gutter={10}>
                <Col md={12} xs={24}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            name='fullName'
                            label="Tên chủ xe"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Full Name!",
                                },
                            ]}
                        >
                            <Input prefix={<FileAddOutlined />} placeholder="FullName" />
                        </Form.Item>
                    </Col>
                    <Col md={12} xs={24}> 
                    <Form.Item name='csv'>
                        
                                <Upload
                                    className="csv-mc-upload"
                                    accept=".txt, .csv"
                                    fileList={fileList1}
                                    onChange={handleChangeCSV}
                                    //action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    listType="picture"
                                    maxCount={1}
                                >
                                    {fileList1.length >= 1 ? null : (<Button style={{ width: '100%' }} icon={<UploadOutlined />}>Upload CSV GPS</Button>)}
                                    {/* <Button icon={<UploadOutlined />}>Upload CSV</Button> */}
                                </Upload>
                            </Form.Item>

                    </Col>
                
                </Row> 

                </Form>
            </Modal>
                        <Divider orientation="left" orientationMargin="0">
                            <Typography.Title level={4}>Quản lý file GeoJson</Typography.Title>
                        </Divider>
                        <Table
                            dataSource={addSTTForList(users)}
                            columns={columns}
                            pagination={false}
                            bordered
                        ></Table>
                    </>
                    );

                    function TableBody() {
        if (users?.length) {
            return (users.map(user =>
                    <tr key={user.id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.username}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                            <Link href={`/users/edit/${user.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                            <button onClick={() => userService.delete(user.id)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={user.isDeleting}>
                                {user.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>Delete</span>
                                }
                            </button>
                        </td>
                    </tr>
                    ));
        }

                    if (!users) {
            return (
                    <tr>
                        <td colSpan={4}>
                            <Spinner />
                        </td>
                    </tr>
                    );
        }

                    if (users?.length === 0) {
            return (
                    <tr>
                        <td colSpan={4} className="text-center">
                            <div className="p-2">No Users To Display</div>
                        </td>
                    </tr>
                    );
        }
    }
}
