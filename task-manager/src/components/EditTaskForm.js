"use client";

import { useUpdateTaskManagementMutation } from "@/redux/features/taskmanagementApi";
import { StyledButton } from "@/styles/GlobalStyles";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import dayjs from "dayjs";
import Lottie from "lottie-react";
import loaderAnimation from "@/assets/Loader.json"; 
export default function EditTaskForm({ initialData, taskId }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskManagementMutation();
  if (isUpdating) {
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
      router.push(`/tasks/${taskId}`);
    } catch (error) {
      message.error("Failed to update task.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Task</h1>
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
        <StyledButton type="submit" as="button" loading={isUpdating}>
          Save Changes
        </StyledButton>
      </Form>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch task data');
    }

    return {
      props: {
        initialData: data.data,
        taskId: id
      }
    };
  } catch (error) {
    console.error('Error fetching task:', error);
    return {
      notFound: true
    };
  }
}
