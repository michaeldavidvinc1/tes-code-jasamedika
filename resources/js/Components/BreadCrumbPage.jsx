import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb'

const BreadcrumbPageComp = ({ textSecond, textThird, urlSecond }) => {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    {!textThird && (
                        <>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{textThird}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </>
                    )}
                    {textSecond && <BreadcrumbSeparator />}
                    {textThird && (
                        <>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={urlSecond}>{textSecond}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </>
                    )}
                    {textThird && (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{textThird}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </>
                    )}
                </BreadcrumbList>
            </Breadcrumb>
        </>
    )
}

export default BreadcrumbPageComp
