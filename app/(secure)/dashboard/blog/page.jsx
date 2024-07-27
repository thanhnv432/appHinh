'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Spinner } from '_components';
import { useUserService } from '_services';

import { Dropdown, Popconfirm, Table, Select, Tag, Typography, Button, Flex, Divider, Modal, Form, Upload, Col, Row, Input } from 'antd';
import {
    DeleteFilled,
    FileAddOutlined,
    UploadOutlined,
    EditOutlined
} from '@ant-design/icons';
import { toast } from 'react-toastify';
const { TextArea } = Input;

import '../blog/blog.css';
export default Blog;

function Blog() {
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

    const dataListBlog = [
        {
            key: 0,
            stt: 1,
            title: "Tiêu đề 1",
            content: "Đây là tiêu đề 1",
            latPosition: 10,
            lonPosition: 20,
            district: '1',
            isActive: true
        },
        {
            key: 1,
            stt: 2,
            title: "Tiêu đề 2",
            content: "Đây là tiêu đề 2",
            latPosition: 10,
            lonPosition: 20,
            district: '2',
            isActive: false
        },
        {
            key: 2,
            stt: 3,
            title: "Tiêu đề 3",
            content: "Đây là tiêu đề 3",
            latPosition: 100,
            lonPosition: 280,
            district: '3',
            isActive: true
        },
        {
            key: 3,
            stt: 4,
            title: "Tiêu đề 4",
            content: "Đây là tiêu đề 4",
            latPosition: 1220,
            lonPosition: 2310,
            district: '4',
            isActive: false
        }
    ]

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
            width: 100,
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            width: 100,
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            width: 400,
        },
        {
            title: 'Toạ độ lat',
            dataIndex: 'latPosition',
            key: 'latPosition',
            width: 150,
        },
        {
            title: 'Toạ độ lon',
            dataIndex: 'lonPosition',
            key: 'lonPosition',
            width: 150,
        },
        {
            title: 'Tên huyện',
            dataIndex: 'district',
            key: 'district',
            render: (data) => (
                <Select
                    defaultValue={'1'}
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Tìm kiếm tên huyện"
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={listDataDistrict}
                    disabled
                />
            ),
            width: 200,
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
            width: 100,
        },
        {
            title: 'Hành động',
            key: 'Action',
            dataIndex: 'action',
            width: 300,
            render: (text, record) =>
                <Flex wrap gap="small">
                    <Button type="primary" ghost onClick={() => editBlog(record)} ><EditOutlined />Edit</Button>
                    <Popconfirm onConfirm={() => {
                        // deleteUser(record.id)
                    }
                    }
                        title="Bạn có chắc chắn xóa bản ghi này?" okText="Có" cancelText="Không">
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
        form
            .validateFields()
            .then(values => {
                console.log('Form Values:', values);
                setIsModalOpen(false);
                toast.success("Thêm mới thành công!")
                setFileList1([]);
                form.resetFields()
            })
            .catch(errorInfo => {
                // Handle validation errors if needed
                console.log('Validation Failed:', errorInfo);
            });
        ;
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setFileList1([]);
        form.resetFields();
    };
    const [uploading, setUploading] = useState(false);
    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            toast.error('Chỉ chấp nhận tệp hình ảnh!');
            return false; // Prevent non-image files from being added
        }

        // Check if the file is already in the list
        const isFileAlreadyAdded = fileList1.some(existingFile => existingFile.name === file.name);

        if (isFileAlreadyAdded) {
            toast.error('File này đã được thêm!');
            return false; // Prevent duplicate files from being added
        }
        setFileList1(prevFileList => [...prevFileList, file]);
        return false;
    }

    const onRemove = (file) => {
        const index = fileList1.indexOf(file);
        const newFileList = fileList1.slice();
        newFileList.splice(index, 1);
        setFileList1(newFileList);
    }

    const editBlog = (item) => {
        showModal();
        console.log(item);
        form.setFieldsValue(item)
    }
    return (
        <>
            <h1>Bài viết</h1>
            <Button
                icon={<FileAddOutlined />}
                onClick={showModal}
                type="primary">
                Thêm bài viết mới
            </Button>
            <Modal
                title="Thêm bài viết mới"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                okText="Xác nhận"
                cancelText="Đóng"
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
                        <Col md={12} xs={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                name='title'
                                label="Tiêu đề"
                                rules={[
                                    {
                                        required: true,
                                        message: "Tiêu đề là bắt buộc",
                                    },
                                ]}
                            >
                                <Input
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="NhậP tiêu đề"
                                />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
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
                        <Col md={12} xs={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                name='latPosition'
                                label="Toạ độ lat"
                                rules={[
                                    {
                                        required: true,
                                        message: "Toạ độ lat là bắt buộc",
                                    },
                                ]}
                            >
                                <Input
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="NhậP toạ độ lat"
                                />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                name='lonPosition'
                                label="Toạ độ lon"
                                rules={[
                                    {
                                        required: true,
                                        message: "Toạ độ lon là bắt buộc",
                                    },
                                ]}
                            >
                                <Input
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="NhậP toạ độ lon"
                                />
                            </Form.Item>
                        </Col>
                        <Col md={24} xs={24}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                name='content'
                                label="Nội dung"
                            >
                                <TextArea
                                    // value={value}
                                    // onChange={(e) => setValue(e.target.value)}
                                    placeholder="NhậP nội dung"
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={24} xs={24}>
                            <Form.Item name='imageUpload' className='item-upload'>
                                <Upload
                                    className="image-upload"
                                    accept="image/*"
                                    fileList={fileList1}
                                    beforeUpload={beforeUpload}
                                    onRemove={onRemove}
                                    // onChange={handleChangeCSV}
                                    listType="picture"
                                    multiple
                                >
                                    {/* {fileList1.length >= 1 ? null : (<Button style={{ width: '100%' }} icon={<UploadOutlined />}>Tải lên hình ảnh</Button>)} */}
                                    <Button style={{ width: '100%' }} icon={<UploadOutlined />}>Tải lên hình ảnh</Button>

                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Divider orientation="left" orientationMargin="0">
                <Typography.Title level={4}>Quản lý bài viết</Typography.Title>
            </Divider>
            <Table
                dataSource={dataListBlog}
                columns={columns}
                pagination={false}
                bordered
            ></Table>
        </>
    );
}
