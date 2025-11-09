import MonumentClient from '@/components/destinations/Monument/MonumentClient';
import Loader from '@/components/skeleton/Loader';
import { getMonumentDetail } from '@/lib/api/destination';
import { MonumentDetails } from '@/types/comman';
import React, { Suspense } from 'react'

export type Props = {
    params: Promise<{ monument : string }>
}

const MonumentDetailComponent = async ({ params }: Props) => {
    const { monument } = await params;
    const monumentData = await getMonumentDetail(monument);
    const parsedData = monumentData?.payload as MonumentDetails;
    return <MonumentClient monument={parsedData} />;
}

const Monument = ({ params }: Props) => {
    return (
        <Suspense fallback={<Loader className='mt-30' />}>
            <MonumentDetailComponent params={params} />
        </Suspense>
    )
}

export default Monument;