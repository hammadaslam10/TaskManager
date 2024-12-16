"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetSingleTaskManagementQuery, useUpdateTaskManagementMutation } from "@/redux/features/taskmanagementApi";
import { Form, Input, DatePicker, Select, message } from "antd";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import loaderAnimation from "@/assets/Loader.json";
import dayjs from "dayjs";

export default function EditTaskPage() {
  const router = useRouter();
  const { id } = useParams();
  

  const { data, isLoading: isLoadingTaskData, error } = useGetSingleTaskManagementQuery({ id });

  if (isLoadingTaskData) {
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

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1 style={{ color: 'red' }}>Error: {error.message}</h1>
        <button 
          onClick={() => router.push('/')} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#1890ff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Task</h1>
      <EditTaskForm initialData={data?.data} taskId={id} />
    </div>
  );
}

function EditTaskForm({ initialData, taskId }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [updateTask, { isLoading }] = useUpdateTaskManagementMutation();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        title: initialData.title,
        description: initialData.description,
        status: initialData.status,
        dueDate: dayjs(initialData.dueDate)
      });
    }
  }, [initialData, form]);

  const handleSubmit = async (values) => {
    try {
      await updateTask({ id: taskId, values }).unwrap();
      message.success("Task updated successfully!");
      router.push("/");
    } catch (error) {
      message.error("Failed to update task.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {isLoading && (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <Lottie 
            animationData={loaderAnimation} 
            loop={true} 
            style={{ width: 200, height: 200, margin: '0 auto' }} 
          />
        </div>
      )}
      {!isLoading && (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="in-progress">In Progress</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Due Date"
            name="dueDate"
            rules={[{ required: true, message: "Due date is required!" }]}
          >
            <DatePicker />
          </Form.Item>

          <button 
            type="submit" 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#52c41a', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer' 
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </Form>
      )}
    </div>
  );
}
