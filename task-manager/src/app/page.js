"use client";

import { useGetTaskManagementQuery } from "@/redux/features/taskmanagementApi";
import { Table, Button, Spin } from "antd";
import Link from "next/link";
import { StyledButton } from "@/styles/GlobalStyles";
import HomePageList from "@/components/TaskList";
import Lottie from "lottie-react";
import loaderAnimation from "@/assets/loader.json"; // Ensure the path is correct

export default function HomePage() {
  const { data, isLoading } = useGetTaskManagementQuery();

  if (isLoading) {
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Management</h1>
      <HomePageList data={data} isLoading={isLoading} />
    </div>
  );
}
