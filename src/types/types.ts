import * as React from "react";

export type StatusType = "Active" | "Inactive" | "Pending";

export type ReviewType = {
    id?: number | string;
    name: string;
    country: string;
    rating: number;
    review: string;
    avatar: string;
    company?: string;
    campaign?: string;
    date?: string;
};


export type UserAvatarType = {
    src: string;
    alt?: string;
};

export type VertCardProps = {
    projectNumber?: number;
    price?: number;
    users?: UserAvatarType[];
};

export type NavItem = {
    label: string;
    href: string;
    icon?: React.ReactNode | string;
};

export type UserHeaderProps = {
    navItems: NavItem[];
    avatarUrl?: string;
    notifications?: string[];
    messages?: string[];
    favorites?: string[];
};

export type IconButtonProps = {
    icon: React.ReactNode;
    label: string;
    notificationCount?: number;
    notifications?: string[];
    notificationsAction?: () => void;
};

export const STATUS = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    PENDING: "Pending",
} as const;

export const ROLE = {
    INFLUENCER: "influencer",
    BRAND: "brand",
} as const;

export type USER_ROLE = typeof ROLE[keyof typeof ROLE];
