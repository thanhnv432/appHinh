'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Spinner } from '_components';
import { useUserService } from '_services';

import { Dropdown, Popconfirm, Table, Select, Tag, Typography, Button, Flex, Divider, Modal, Form, Upload, Col, Row } from 'antd';
import {
    DeleteFilled,
    FileAddOutlined,
    UploadOutlined
} from '@ant-design/icons';
import { toast } from 'react-toastify';

import '../quyhoach/quyhoach.css';
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

    const dataMock = [
        {
            value: '1',
            label: 'Xuân Trường',
        },
        {
            value: '2',
            label: 'Hải Hậu',
        },
        {
            value: '3',
            label: 'Giao Thuỷ',
        },
        {
            value: '4',
            label: 'Vụ Bản',
        },
        {
            value: '5',
            label: 'Trực Ninh',
        }
    ]

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Tên huyện',
            dataIndex: 'district',
            key: 'district',
            render: (data) => (
                <Select
                    // defaultValue={{data.id}}
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Tìm kiếm tên huyện"
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={listDataDistrict}
                />
            ),
        },
        {
            title: 'Tên File',
            dataIndex: 'fileName',
            key: 'fileName',
            render: (data) => (
                <div>
                    File 1
                </div>
            ),
        },
        {
            title: 'Trạng thái',
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
            title: 'Hành động',
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
    const [listDataDistrict, setListDataDistrict] = useState(dataMock);
    const handleChangeCSV = ({ fileList: newFileList1 }) => setFileList1(newFileList1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm(); // Tạo instance của form

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        toast.success("Thêm mới thành công!")
        setFileList1([]);
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setFileList1([]);
        form.resetFields();
    };
    const [uploading, setUploading] = useState(false);
    const beforeUpload = (file) => {
        const isJson = file.type === 'application/json';
        console.log('isJson', isJson);
        if (!isJson) {
            toast.error('Chỉ chấp nhận tệp JSON!');
            setFileList1([]);
            return;
        } else {
            setFileList1([...fileList1, file]);
        }
        return false;
    }

    const onRemove = (file) => {
        const index = fileList1.indexOf(file);
        const newFileList = fileList1.slice();
        newFileList.splice(index, 1);
        setFileList1(newFileList);
    }
    return (
        <>
            <h1>Quy hoạch</h1>
            <Button
                icon={<FileAddOutlined />}
                onClick={showModal}
                type="primary">
                Thêm GeoJson mới
            </Button>
            <Modal
                title="Upload GeoJson"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                okText="Xác nhận"
                cancelText="Đóng"
                style={{
                    marginTop: 160
                }}
            >

                <Form
                    //initialValues={user}
                    form={form}
                    scrollToFirstError
                //</Modal>layout="vertical" onFinish={onFinish}
                >

                    <Divider orientation="left" orientationMargin="0">
                        <Typography.Title level={4}>Thông tin</Typography.Title>
                    </Divider>
                    <Row gutter={10}>
                        <Col md={16} xs={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                name='district'
                                label="Huyện"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng chọn tên huyện!",
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Tìm kiếm tên huyện"
                                    optionFilterProp="label"
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={listDataDistrict}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={6} xs={24}>
                            <Form.Item name='csv' className='item-upload'>
                                <Upload
                                    className="json-upload"
                                    accept=".json"
                                    fileList={fileList1}
                                    beforeUpload={beforeUpload}
                                    onRemove={onRemove}
                                    // onChange={handleChangeCSV}
                                    listType="text"
                                    maxCount={1}
                                >
                                    {fileList1.length >= 1 ? null : (<Button style={{ width: '100%' }} icon={<UploadOutlined />}>Upload CSV GPS</Button>)}
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
