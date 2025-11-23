/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import ProductEditForm from '@/components/ProductEditForm';
import AccessDeny from '@/components/AccessDeny';
import { useSession } from 'next-auth/react';

export default function page() {
  const { data: session } = useSession();
  
   const { id } = useParams();
   
   if (!session) return <AccessDeny />;
  return (
    <div>
      <ProductEditForm id={id} />
    </div>
  )
}
