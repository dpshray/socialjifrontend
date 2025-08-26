'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface SocialMediaIcon {
    image: string;
    title: string;
    description: string;
    type: string;
}

interface FollowerData {
    follower_count: number;
}

interface SocialMediaConnectProps {
    icons: SocialMediaIcon[];
    isConnected: (platformType: string) => boolean;
    getFollowerData: (platformType: string) => FollowerData | undefined | null;
    loadingType?: string | null;
    onConnect: (type: string) => void;
    onManage?: (type: string) => void;
    connectButtonText?: {
        default: string;
        loading: string;
    };
    manageButtonText?: string;
    className?: string;
}

const SocialMediaConnect: React.FC<SocialMediaConnectProps> = ({
                                                                   icons,
                                                                   isConnected,
                                                                   getFollowerData,
                                                                   loadingType,
                                                                   onConnect,
                                                                   onManage,
                                                                   connectButtonText = { default: 'Connect', loading: 'Connecting...' },
                                                                   manageButtonText = 'Manage',
                                                                   className = '',
                                                               }) => {
    return (
        <div className={`grid grid-cols-1 gap-3 ${className}`}>
            {icons.map(({ image, title, description, type }) => {
                const connected = isConnected(type);
                const followerData = getFollowerData(type);

                return (
                    <div
                        key={type}
                        className="flex items-center space-x-3 p-3 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800"
                    >
                        <Image
                            src={image || '/placeholder.svg'}
                            alt={`${title} logo`}
                            width={24}
                            height={24}
                            className="w-6 h-6 object-contain"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p>
                            {connected && followerData ? (
                                <>
                                    <p className="text-xs text-green-600">Connected</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        {followerData.follower_count.toLocaleString()} followers
                                    </p>
                                </>
                            ) : (
                                <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
                            )}
                        </div>
                        {!connected && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onConnect(type)}
                                disabled={loadingType === type}
                            >
                                {loadingType === type ? connectButtonText.loading : connectButtonText.default}
                            </Button>
                        )}
                        {connected && (
                            <Button variant="secondary" size="sm" onClick={() => onManage?.(type)}>
                                {manageButtonText}
                            </Button>
                        )}
                    </div>
                );
            })}
            <div className="flex items-center space-x-3 p-3 border rounded-lg border-dashed dark:border-gray-600 bg-white dark:bg-gray-800">
                <Button variant="outline" size="sm" className="w-6 h-6 p-0 bg-transparent" disabled>
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </Button>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Add Platform</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Connect more social media</p>
                </div>
            </div>
        </div>
    );
};

export default SocialMediaConnect;
