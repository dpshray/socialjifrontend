'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import {
    AlertCircle,
    CalendarDays,
    CheckCircle,
    DollarSign,
    Tag,
} from 'lucide-react'

import campaignService from '@/services/campaign.service'
import type { Campaign } from '@/types/campaigns'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Separator} from "@/components/ui/separator";


export default function BrandCampaignDetails() {
    const params = useParams()
    const id = Number(params?.id)
    const [campaign, setCampaign] = useState<any | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id || Number.isNaN(id)) return

        const fetchCampaign = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await campaignService.getCampaignById(id)
                setCampaign(data)
            } catch {
                setError('Failed to fetch campaign details.')
            } finally {
                setLoading(false)
            }
        }
        fetchCampaign()
    }, [id])

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })

    const getBrandInitials = (firstName: string, lastName?: string) =>
        lastName
            ? `${firstName[0]}${lastName}`.toUpperCase()
            : firstName.slice(0, 2).toUpperCase()

    if (loading) {
        return (
            <main
                role="status"
                aria-live="polite"
                className="flex min-h-[400px] flex-col items-center justify-center space-y-4"
            >
                <div
                    className="animate-spin rounded-full border-b-2 border-primary h-8 w-8"
                    aria-hidden="true"
                />
                <p className="text-muted-foreground">Loading campaign details...</p>
            </main>
        )
    }

    if (error) {
        return (
            <main className="flex min-h-[400px] flex-col items-center justify-center">
                <Card className="max-w-md w-full">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <AlertCircle className="h-12 w-12 text-destructive" aria-hidden="true" />
                            <h3 className="text-lg font-semibold">Error Loading Campaign</h3>
                            <p className="text-sm text-muted-foreground">{error}</p>
                            <Button onClick={() => window.location.reload()} aria-label="Reload campaign details">
                                Try Again
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        )
    }

    if (!campaign) {
        return (
            <main className="flex min-h-[400px] flex-col items-center justify-center">
                <Card className="max-w-md w-full">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <AlertCircle className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
                            <h3 className="text-lg font-semibold">Campaign Not Found</h3>
                            <p className="text-sm text-muted-foreground">
                                The campaign you&#39;re looking for doesn&#39;t exist or has been removed.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </main>
        )
    }

    return (
        <main className="container mx-auto max-w-7xl px-4 py-8">
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <article className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <CardTitle className="text-3xl">{campaign.title}</CardTitle>
                                    <div className="flex flex-wrap items-center space-x-4 text-sm text-muted-foreground">
                                        <div className="flex items-center space-x-1">
                                            <CalendarDays className="h-4 w-4" aria-hidden="true" />
                                            <time dateTime={campaign.created_at}>
                                                Created {formatDate(campaign.created_at)}
                                            </time>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <DollarSign className="h-4 w-4" aria-hidden="true" />
                                            <span>${campaign.price}</span>
                                        </div>
                                    </div>
                                </div>
                                <Badge
                                    variant="secondary"
                                    className="bg-green-100 border-green-200 text-green-800 flex items-center"
                                    aria-label="Campaign status: Active"
                                >
                                    <CheckCircle className="mr-1 h-3 w-3" aria-hidden="true" />
                                    Active
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <section aria-labelledby="description-heading">
                                <h3 id="description-heading" className="mb-2 text-lg font-semibold">
                                    Description
                                </h3>
                                <p className="leading-relaxed text-muted-foreground">{campaign.description}</p>
                            </section>

                            {campaign.media?.length > 0 && (
                                <section aria-labelledby="media-heading">
                                    <h3 id="media-heading" className="mb-4 text-lg font-semibold">
                                        Campaign Media
                                    </h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {campaign.media.map((media:any) => (
                                            <Card key={media.id} className="overflow-hidden py-0" tabIndex={0}>
                                                <div className="relative aspect-video w-full">
                                                    <img
                                                        src={media.original_url}
                                                        alt={media.name}
                                                        loading="lazy"
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                                <CardContent className="p-3">
                                                    <p className="truncate text-sm font-medium">{media.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {media.mime_type} • {Math.round(Number(media.size) / 1024)} KB
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Campaign Requirements</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <section>
                                <h4 className="mb-2 flex items-center font-semibold">
                                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" aria-hidden="true" />
                                    Eligibility Criteria
                                </h4>
                                <p className="pl-6 text-muted-foreground">{campaign.eligibility}</p>
                            </section>
                            <Separator />
                            <section>
                                <h4 className="mb-2 flex items-center font-semibold">
                                    <Tag className="mr-2 h-4 w-4 text-blue-600" aria-hidden="true" />
                                    Requirements
                                </h4>
                                <p className="pl-6 text-muted-foreground">{campaign.requirement}</p>
                            </section>
                        </CardContent>
                    </Card>
                </article>

                <aside className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Brand Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-16 w-16">
                                    {campaign.brand.image ? (
                                        <AvatarImage src={campaign.brand.image} alt={`${campaign.brand.nick_name || campaign.brand.first_name}'s avatar`} />
                                    ) : (
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            {getBrandInitials(campaign.brand.first_name, campaign.brand.last_name)}
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">
                                        {campaign.brand.nick_name ||
                                            `${campaign.brand.first_name} ${campaign.brand.last_name || ''}`.trim()}
                                    </h3>
                                    <a
                                        href={`mailto:${campaign.brand.email}`}
                                        className="block truncate text-sm text-muted-foreground underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                                    >
                                        {campaign.brand.email}
                                    </a>
                                    {campaign.brand.about && (
                                        <p className="mt-2 text-sm text-muted-foreground">{campaign.brand.about}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Campaign Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Campaign ID</span>
                                <Badge variant="outline" aria-label={`Campaign ID ${campaign.id}`}>
                                    #{campaign.id}
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Budget</span>
                                <span className="font-semibold text-lg">${campaign.price}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Categories</span>
                                <Badge variant="secondary" aria-label={`Categories: ${campaign.categories}`}>
                                    {campaign.categories}
                                </Badge>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Created</span>
                                    <time dateTime={campaign.created_at}>{formatDate(campaign.created_at)}</time>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Last Updated</span>
                                    <time dateTime={campaign.updated_at}>{formatDate(campaign.updated_at)}</time>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-3">
                        <Button className="w-full" size="lg" type="button" aria-label="Apply for campaign">
                            Apply for Campaign
                        </Button>
                        <Button variant="outline" className="w-full" type="button" aria-label="Contact the brand">
                            Contact Brand
                        </Button>
                    </div>
                </aside>
            </section>
        </main>
    )
}
