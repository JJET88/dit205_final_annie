/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import ProductDetail from '@/components/ProductDetails';
import { useSession } from 'next-auth/react';
import AccessDeny from '@/components/AccessDeny';

export default function page() {
 const { data: session } = useSession();

 const { id } = useParams();
 
 if (!session) return <AccessDeny />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 relative">
       <ProductDetail id={id}/>
    </div>
  )
}


