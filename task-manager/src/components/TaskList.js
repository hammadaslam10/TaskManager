"use client";

import { Table, Button, Spin, Input, Select, message, Popconfirm, Tag } from "antd";
import Link from "next/link";
import { StyledButton } from "@/styles/GlobalStyles";
import { useState } from "react";
import { useDeleteTaskManagementMutation } from "@/redux/features/taskmanagementApi";
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Lottie from "lottie-react";
import loaderAnimation from "@/assets/Loader.json";

export default function HomePageList({ data, isLoading }) {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [filteredInfo, setFilteredInfo] = useState({});

  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskManagementMutation();

  if (isDeleting) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Lottie
          animationData={loaderAnimation}
          loop={true}
          style={{ width: 200, height: 200, margin: '0 auto' }}
        />
      </div>
    );
  }

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setPagination({ current: 1, pageSize: 10 });
    setFilteredInfo({});
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setPagination({ current: 1, pageSize: 10 });
    setFilteredInfo({});
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    setFilteredInfo(filters);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask({ id }).unwrap();
      message.success("Task deleted successfully!");
    } catch (error) {
      message.error("Failed to delete task.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "orange";
      case "in-progress":
        return "blue";
      case "completed":
        return "green";
      default:
        return "gray";
    }
  };

  const getTimeRemaining = (dueDate, status) => {
    if (status === "completed") return null;
    const now = dayjs();
    const due = dayjs(dueDate);
    const daysRemaining = due.diff(now, 'day');
    if (daysRemaining < 0) {
      return <Tag color="red">Overdue</Tag>;
    } else if (daysRemaining === 0) {
      return <Tag color="orange">Due Today</Tag>;
    } else {
      return <Tag color="green">{daysRemaining} days left</Tag>;
    }
  };

  const filteredData = data?.data.filter(
    (item) =>
      (item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase())) &&
      (statusFilter ? item.status === statusFilter : true)
  );

  const totalTasks = data?.data?.length || 0;
  const filteredCount = filteredData?.length || 0;

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>,
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: "Time Remaining",
      dataIndex: "dueDate",
      render: (_, record) => getTimeRemaining(record.dueDate, record.status),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link href={`/tasks/${record._id}/edit`}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
            >
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Are you sure you want to delete this task?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              loading={isDeleting}
              style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" }}
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Task List</h1>
        <Link href="/tasks/create">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
          >
            Create Task
          </Button>
        </Link>
      </div>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search by title or description"
          value={searchText}
          onChange={handleSearch}
          style={{ width: "250px" }}
        />
        <Select
          placeholder="Filter by status"
          value={statusFilter}
          onChange={handleStatusChange}
          style={{ width: "200px" }}
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="in-progress">In Progress</Select.Option>
          <Select.Option value="completed">Completed</Select.Option>
        </Select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>
          Showing {filteredCount} of {totalTasks} tasks
        </strong>
      </div>

      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="_id"
        onChange={handleTableChange}
        pagination={{
          ...pagination,
          total: filteredData?.length,
        }}
      />
    </div>
  );
}
